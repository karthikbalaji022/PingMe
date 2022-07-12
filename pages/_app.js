import '../styles/globals.css';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase/firebaseapp'
import Login from '../firebase/Login'

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
