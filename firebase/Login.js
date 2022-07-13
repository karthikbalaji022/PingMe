import { useRouter } from "next/router";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import {doc,setDoc,serverTimestamp,getDoc,get} from 'firebase/firestore'
import {useCollection} from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
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
    <styles.logincontainer>
      <h1>Ping Me!</h1>
      <h3>Login</h3>
      <button type="button" onClick={handleLogin}>
        Signin with Google
      </button>
    </styles.logincontainer>
  );
}
const styles={
  logincontainer: styled.div`
  width:100%;
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  >button{
   background-color :black ;
   color:white;
   border-radius: 5px;
   width:150px;
   height:40px;
   font-size: 16px;
   cursor: pointer;
   transition:all 300ms ease-in-out;
   &:hover{
    background-color : rgb(140, 236, 236);
    color: black;
   }
  }
  `
}

export default Login;
