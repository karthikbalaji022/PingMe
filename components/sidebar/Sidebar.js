import { useState,useRef, useEffect } from "react";
import styled from "styled-components";
import { ChatSharp, Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import {db,auth} from '../../firebase/firebaseapp'
import { doc, setDoc,getDoc, } from "firebase/firestore"; 
import {useRouter} from 'next/router'
import { getChats,addNewChat,getCurChats } from "../../util/util.firebase";

import HeadSide from "./head.sidebar";
import Chatcard from './chatcard.sidebar'

export default function Sidebar({user,cur,pic}) {
  const emailRef=useRef();
    const [chatUser,setChatUser]=useState([]);
    const [loading,setLoading]=useState(false);
    const [newchat,setNewchat]=useState(false);
    const [search,setSearch]=useState(null);
  const router=useRouter();
    useEffect(()=>{
      const data=getCurChats(user.email).then(res=>{
        if(res)
        setChatUser([...res]);
      });},[]);
    
    const handleCardClick=function(e){
      router.push(`/chats/${this.id}`);
    }
    const handleClick=(event)=>{ 
      setNewchat(prev=>!prev);
    };
    const handleSubmit=async (e)=>{
      const mail=emailRef.current.value;
        setLoading(true);
        setNewchat(false);
        await addNewChat(user.email,mail);
        await getCurChats(user.email).then(res=>{
          setChatUser([...res]);
          setLoading(false);
          router.push('/');
        }).catch(err=>{console.log({err})});
    };
    function handleSearch(e){
      const search=e.target.value;
      setSearch(search);
    }
    if(loading)
    return<>Loading...</>

  return (
    <styles.container >
      <HeadSide user={user} />
      <styles.sideMainCointainer>
        <styles.searchContainer>
          <Search />
          <styles.input placeholder="Search chat" onChange={handleSearch}/>
        </styles.searchContainer>
        <styles.SidebarButton onClick={handleClick}>Start a new chat</styles.SidebarButton>
        {newchat&&(
            <form>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <p>Enter email!</p>
                <button onClick={handleClick} style={{}}>close</button>
                </div>
                <input type="email" ref={emailRef} placeholder="email..." required/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        )}
      </styles.sideMainCointainer>
      <styles.usersCardContainer>
        {chatUser&&chatUser.filter((item)=>{
          if(search)
          {
            return item.receiver.includes(search);
          }else{
            return true;
          }
        }).map((item,ind)=>{
          return <Chatcard pic={pic} selected={item.id==cur} mail={item} key={ind} id={item.id} onClick={handleCardClick.bind(item)}/>
        })

        }
      </styles.usersCardContainer>
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    width: 100%;
    height: 100vh;
    border-right: 1px solid rgba(140, 236, 236);
    
  `,
  sideMainCointainer: styled.div`
    width: 100%;
    max-height: 100%;
    padding: 0 10px;
  `,
  searchContainer: styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
  `,
  input: styled.input`
    display: flex;
    flex: 1;
    outline: 0;
    border: 0;
    border-bottom: 1px solid rgb(0, 0, 0, 0.5);
  `,
  SidebarButton: styled(Button)`
    color: black;
    display: flex;
    width: 100%;
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  `,
  temp:styled.div`
  width:400px;
  height:400px;
  background-color:red;
  `,
  usersCardContainer:styled.div`
  display:flex;
  flex-direction:column;
  max-width:100%;
  max-height:78vh;
  overflow-y:auto;
  padding:30px 0;
  `,
  userCardBox:styled.div`
  width:100%;
  height:50px;
  margin:20px 0;
  background-color: red;
  `
}