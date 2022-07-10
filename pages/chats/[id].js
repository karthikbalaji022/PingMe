import { useState,useEffect } from "react";
import styled from "styled-components";
import { getOneChat,getPhotoUrl } from "../../util/util.firebase";
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase/firebaseapp'
import Sidebar from "../../components/sidebar/Sidebar";
import Message from "../../components/message/Message";
export default function Id({id}){
    const [chats,setChats]=useState([]);
    const [user,loading]=useAuthState(auth);
    useEffect(()=>{
        async function temp(){
            console.log(chats+" in useeffect");
        const data=await getOneChat(user.email,id);
        setChats(data);
        }
        temp()
    },[id]);
    console.log(chats," in id");
    if(loading || chats.length==0)
        return <>Loading...</>
    return(
        <>
             <style.main>
                <Sidebar user={user} cur={chats[0]?.id} pic={"https://source.unsplash.com/random"}/>
                <Message chats={chats}/>
            </style.main>
        </>
    );
}
const style={
    main:styled.main`
    width:100%;
    height:100vh;
    /* background-color: rgba(0,0,0,1); */
    display: grid;
    grid-template-columns: 1fr 2fr;
    @media (max-width:700px) {
      grid-template-columns: 1fr;
    }
    `,
  }
export async function getServerSideProps(context){
    const {params:{id:id}}=context;
    console.log(context.query," query");
    return{
        props:{
            id:id
        }
    }
}