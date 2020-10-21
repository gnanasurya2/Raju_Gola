import * as Firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBAHGr1lS1FHtYfvXiawK9iSHkkfDbm8w",
  authDomain: "raju-gola.firebaseapp.com",
  databaseURL: "https://raju-gola.firebaseio.com",
  projectId: "raju-gola",
  storageBucket: "raju-gola.appspot.com",
  messagingSenderId: "316858198192",
  appId: "1:316858198192:web:0e3f49e35a34fc11213375",
  measurementId: "G-K3NJ3MK54Q",
};

const firebase = Firebase.initializeApp(firebaseConfig);

export default firebase;
