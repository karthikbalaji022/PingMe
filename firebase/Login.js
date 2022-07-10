import { useRouter } from "next/router";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import {doc,setDoc,serverTimestamp,getDoc,get} from 'firebase/firestore'
import {useCollection} from 'react-firebase-hooks/firestore'

import {db,auth,provider} from './firebaseapp'

function Login() {
  const router = useRouter();
    function handleLogin() {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user =await result.user;
          const userRef=doc(db,"users",user.email);
          const curUser=await getDoc(userRef);
          const date=new Date();
          const time=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
          if(!curUser.exists())
          {
            try{
               const data= setDoc(doc(db,"users",user.email),{
              firstname:user.displayName.split(' ')[0],
              lastname:user.displayName.split(' ')[1],
              email:user.email,
              lastseen:time,
              photourl:user.photoURL,
            },{merge:true})
            console.log("data added email");
            router.push("/");
            }catch(e)
            {
              console.log(e);
            }
          }else{
            try{
            setDoc(doc(db,"users",user.email),{
              lastseen:time
            },{merge:true})
            router.push("/");
          }catch(e){
            console.log(e);
          }
          }
        })
        .catch((error) => {
          console.log({error});
        });
    }
  return (
    <>
      <div>Login</div>
      <button type="button" onClick={handleLogin}>
        Signin with Google
      </button>
    </>
  );
}
export default Login;
