import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
const config = {
    apiKey: "AIzaSyAc-tp3wSmCEQkR20LL5TO5S0ZTvw51p6g",
    authDomain: "chat-box-ca9ad.firebaseapp.com",
    databaseURL: "https://chat-box-ca9ad-default-rtdb.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
