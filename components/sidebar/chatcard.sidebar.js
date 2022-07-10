import { useState,useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import styled from 'styled-components';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../firebase/firebaseapp';
import { getPhotoUrl } from '../../util/util.firebase';

export default function Chatcard({mail,onClick,selected,id}){
    const [user]=useAuthState(auth);
    const [pic,setPic]=useState(null);
    let name;
    if(user.email==mail.receiver)
    name=mail.sender;
    else
    name=mail.receiver;
    useEffect(()=>{
        async function temp(){
            const url=await getPhotoUrl(name);
            setPic(url);
        }
        temp();
    },[name]);

    return(
        <styles.cardContainer onClick={e=>onClick(e)} style={selected?{backgroundColor:"rgba(0,0,0,.3)",color:"white"}:{}}>
        <IconButton style={{width:"100%",height:"max-content",borderRadius:"0",fontSize:"19px",display:"flex",justifyContent:"flex-start",color:selected?"white":"black"}}>
            <styles.Avatar src={pic||"https://source.unsplash.com/random"}/>
            {name?.split('@')[0]}
        </IconButton>
        </styles.cardContainer>
    )
}

const styles={
    cardContainer:styled.div`
        width:100%;
        height: 50px;
        display: flex;
        align-items: center;
        margin:20px 0;
        padding:10px;
 
    `,
    Avatar:styled(Avatar)`
    margin:0 20px 0 5px;
    `
}