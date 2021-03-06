import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from "../helpers/auth";

export default class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <div className="container">
                <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up to
          <Link className="title ml-2" to="/">Chat Box</Link>
                    </h1>
                    <p className="lead">Fill the Form</p>
                    <div className="form-group">
                        <input type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}></input>
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                           ></input>
                    </div>
                    <div className="form-group">
                        {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                        <button className="btn btn-primary px-5" type="submit">Sign up</button>
                    </div>
                 
                    <hr></hr>
                    <p>Already have an account? <Link to="/signin">SignIn</Link></p>
                </form>
            </div>
        )
    }
}
  