// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyA8NmGRMR1UzqG8Px3hFF8cnpCSfRhAd9Q",
    authDomain: "reels-81a5e.firebaseapp.com",
    projectId: "reels-81a5e",
    storageBucket: "reels-81a5e.appspot.com",
    messagingSenderId: "436625816307",
    appId: "1:436625816307:web:93496fb20b145417f11586"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=firebase.auth();
const firestore=firebase.firestore();
export const database={
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp,
}
export const storage=firebase.storage();