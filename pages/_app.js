import '../styles/globals.css';
import {FirebaseError, getApps, initializeApp} from 'firebase/app'
import { collection } from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth,db} from '../firebase/firebaseapp'
import Login from '../firebase/login'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user,loading]=useAuthState(auth)
  if(loading)
  return<>Loading...</>
  if(!user){
    return <Login/>
 }
  
  return <Component {...pageProps} />
}

export default MyApp
