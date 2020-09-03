import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCsGOAjmX_tNca5oaQkPHlp9G1DB5c-oJ4",
    authDomain: "instagram-clone-b04fc.firebaseapp.com",
    databaseURL: "https://instagram-clone-b04fc.firebaseio.com",
    projectId: "instagram-clone-b04fc",
    storageBucket: "instagram-clone-b04fc.appspot.com",
    messagingSenderId: "1088630574365",
    appId: "1:1088630574365:web:02e589c656918fb03565f4",
    measurementId: "G-VSXHWEXP7F"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}