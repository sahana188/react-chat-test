import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Header></Header>
        <div class="container">
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <p className="lead">let's chat</p>
              <div className="mt-4">
                <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New</Link>
                            <br/>
                <Link className="btn px-5 btn-success" to="/signin">SignIn</Link>
              </div>
            </div>
          </div>
          </section>
          </div>
        <Footer></Footer>
      </div>
    )
  }
}
