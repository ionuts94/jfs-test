import React from 'react';
import firebase from '../../firebase';
import './header.css';

const Header = () => {
    const singOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((err) => {
            console.log(err)
          });

    }

    return(
        <div className='header-container'>
            <h1>JUNIOR FULL STACK DEVELOPER TEST - LEARNERS </h1>
            <button className='signOutBtn' onClick={ singOut }>SIGN OUT</button>
        </div>
    );
}

export default Header;