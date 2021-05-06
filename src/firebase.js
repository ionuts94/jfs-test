import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA8sCyeCJiVsyFwxRb56LyWX4uspzO6mfs",
    authDomain: "jfs-test.firebaseapp.com",
    projectId: "jfs-test",
    storageBucket: "jfs-test.appspot.com",
    messagingSenderId: "839065496239",
    appId: "1:839065496239:web:36150ec19f80d63b8bc25a",
    measurementId: "G-NPW37YKZN8"
};

firebase.initializeApp(firebaseConfig);

export default firebase;