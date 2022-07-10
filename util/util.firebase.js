import { doc, setDoc,getDoc } from "firebase/firestore"; 
import {  } from "react";
import {db,auth} from '../firebase/firebaseapp'
import {v4 as uuid} from 'uuid';
import { set } from "firebase/database";

async function getChats(){
    const chats=doc(db,"users","chats");
    const chatSnap=await getDoc(chats);
    const chatArr=chatSnap.data()
    if(chatArr&&chatArr.arr)
    return [...chatArr?.arr];
    return [];
}

async function isPresent(sender,receptient) {
    let chatRef1=await getChats();
    const chatArr=chatRef1.filter(item=>
      {
        return item.receiver==receptient && item.sender==sender;
      })
      return chatArr;
}
async function addNewChat(sender,receiver){
 
    const isThere=await getChats();
    let arr=[];
    if(isThere.length>0){
      arr=isThere;
    }
    let check=await isPresent(sender,receiver);
    if(check.length<=0){
      let id=await uuid();
    arr.push({
      sender:sender,
      receiver:receiver,
    chats:[],
    id:id
    });
  }
    setDoc(doc(db,"users","chats"),{
      arr
    },{merge:true})
}
async function updateLastSeen(sender){
  const doc1=doc(db,"users",sender);
  const data=await getDoc(doc1);
  if(data.exists())
  {
    setDoc(doc1,{
      lastseen:new Date().getHours()+":"+new Date().getMinutes()
    },
    {merge:true}
  )
  }

}
async function getCurChats(sender){
  const arr=await getChats();
  const curChat=arr.filter(item=>item.sender==sender||item.receiver==sender);
  return curChat;
}

async function getOneChat(sender,id){
  const arr=await getCurChats(sender);
  const cur=arr.filter(item=>item.id==id);
  return cur;
}

async function getLastSeen(mail){
const user=await doc(db,"users",mail);
const userSnap=await getDoc(user);
const userDetail=userSnap.data()
return userDetail;
}
async function getPhotoUrl(mail){
  let user=await getLastSeen(mail);
  let pic=user?.photourl;
  return pic;
}

async function updateCurChat(sender,receiver,msg,id){
  const chatsRef=doc(db,"users","chats");
  const chats=await getDoc(chatsRef);
  const data=chats.data().arr;
  const arr=data?.map((item)=>{
    if(item.id===id)
    {
      return{
        ...item,
        chats:msg
      }
    }else{
      return item;
    }
  })

  setDoc(chatsRef,{
      arr
  },{merge:true});
  updateLastSeen(sender);



}
export {getChats,isPresent,addNewChat,getCurChats,getOneChat,getLastSeen,getPhotoUrl,updateCurChat};