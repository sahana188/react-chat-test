import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Appiness chat box</Link>
       
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <button className="btn btn-primary mr-3" onClick={() => auth().signOut()}>Logout</button>
            </div>
            : <div className="navbar-nav">
                      </div>
                  }
        </div>
      </nav>
    </header>
  );
}

export default Header;