import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBoc7ID2PgH15dO-fMGvK2eAnDa0eKuqVU",
  authDomain: "devweb-a1e5e.firebaseapp.com",
  databaseURL: "https://devweb-a1e5e-default-rtdb.firebaseio.com",
  projectId: "devweb-a1e5e",
  storageBucket: "devweb-a1e5e.appspot.com",
  messagingSenderId: "926382113705",
  appId: "1:926382113705:web:2e52eb6cb25b143d48bab8",
  measurementId: "G-QCRMP5F5H1"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export default firebase




