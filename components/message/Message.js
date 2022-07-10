import styled from "styled-components";
import MessageHead from './head.message';
import MessageFooter from './footer.message';
import { useState } from "react";
import { useEffect } from "react";
import {updateCurChat} from '../../util/util.firebase'
import Card from "./card.message";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseapp";
import { useRef } from "react";


export default function Message({chats}){
   const [msg,setMsg]=useState(chats[0]?.chats||[]);
   const [user]=useAuthState(auth);
   const last=useRef();
   useEffect(()=>{
    setMsg(chats[0]?.chats||[])
   },[chats]);
   console.log(chats);
   useEffect(()=>{
    last.current.scrollIntoView({
        behavior:"smooth",
        block: "nearest",
        inline: "start"
      });
    async function temp(){
        await updateCurChat(chats[0].sender,chats[0].receiver,msg,chats[0].id);
    }
    temp();
   },[msg]);
    return(
        <styles.container>
            <MessageHead mail={chats[0].receiver==user.email?chats[0].sender:chats[0].receiver} />
            {msg&&msg.map((item)=>{
                return <Card key={item.id} item={item} left={item.sender===user.email}/>
            })}
            <div ref={last}/>
            <MessageFooter setMsg={setMsg}/>
        </styles.container>
    )
}

const styles={
    container:styled.div`
    width: minmax(100%,100%) ;
    max-height:100vh;
    background-color: whitesmoke;
    padding-bottom: 5%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    position: relative;
`,
}