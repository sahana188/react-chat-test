import React, { Component,useState } from "react";
import Header from "./common/Header";
import { auth } from "../services/firebase";
import '../styles.css';
import { db } from "../services/firebase";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export default class Chat extends Component {
  constructor(props) {  
    super(props);
    this.state={
      show: true,
      hide:false
    }
    
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.text,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }

  }

  timeFormat(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }
  
  addEmoji = e => {
    let emoji = e.native;
    this.setState({
      text: this.state.content + emoji
    });
  };

  

  render() {
    return (
      <div>
        <Header />
        <div className="chat-area" ref={this.myRef}>
          {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
              {chat.content}
              <br />
              <span className="chat-time float-right">{this.timeFormat(chat.timestamp)}</span>
            </p>
          })}
        </div>
            <form onSubmit={this.handleSubmit} className="mx-3">
  
          <textarea className="form-control" name="content" onChange={this.handleChange} value={this.state.text}></textarea>
          <div className="d-css">
              {
                  this.state.show?  <span className="em-class">
                  <Picker onSelect={this.addEmoji} />
              </span> : null
            }
            <button type="button" onClick={() => { this.setState({ show: !this.state.show }) }}>Select Emoji</button>
          </div>
          {/* <button type="button" onClick={()=>{this.setState({show:this.state.hide}) }}> Hide</button> */}

          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
          <br/>
          <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
        </form>
        <div className="py-5 mx-3">
          User : <strong className="text-info">{this.state.user.email.replace(/@[^@]+$/, '')}</strong>
        </div>
      </div>
    );
  }
}
