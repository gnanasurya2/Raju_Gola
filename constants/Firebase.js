import * as Firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsDAYgMM7o4i__zo29tgCGOotWh1c0V5s",
  authDomain: "chat-ecfd3.firebaseapp.com",
  databaseURL: "https://chat-ecfd3.firebaseio.com",
  projectId: "chat-ecfd3",
  storageBucket: "chat-ecfd3.appspot.com",
  messagingSenderId: "259436925573",
  appId: "1:259436925573:web:4adbe77391125fc8",
};

const firebase = Firebase.initializeApp(firebaseConfig);

export default firebase;
