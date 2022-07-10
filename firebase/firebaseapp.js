import {getApps, initializeApp} from 'firebase/app'
import { GoogleAuthProvider,getAuth, signInWithPopup} from "firebase/auth";
import Database from 'firebase/database'
import {getFirestore} from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBWCR_x3tVvxujDNBo5O4eX5kEkMu6Zqas",
    authDomain: "pingme-3cfd6.firebaseapp.com",
    projectId: "pingme-3cfd6",
    storageBucket: "pingme-3cfd6.appspot.com",
    messagingSenderId: "725363580244",
    appId: "1:725363580244:web:6830670762ef22573f7cc1",
    measurementId: "G-ZWZETX2S8J"
  };
  
 
  const apps=initializeApp(config);
  let db=getFirestore(apps);
  const auth=getAuth(apps);
  const provider = new GoogleAuthProvider();
  console.log("firebase initialized");




  export {apps,db,auth,provider,config};