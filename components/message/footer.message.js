import styled from "styled-components"
import { Send } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/firebaseapp"
export default function Footer({setMsg}){
    const inp=useRef();
    const [user]=useAuthState(auth);
    function handleSend(){
        const msg=inp.current.value;
        const obj={
            sender:user.email,
            msg:msg,
            time:new Date().getHours()+":"+new Date().getMinutes()
        }
        console.log(obj);
        inp.current.value="";
        setMsg(prev=>{
            console.log(prev)
            return [...prev,obj]
        });
    }
    return(
            
        <styles.foot>
                <styles.send sx={{position:"absolute",width: '30px', height: '30px',right:'0',top:"50%",transform:"translateY(-50%)"}} onClick={handleSend}/>
            <styles.input ref={inp} placeholder="Type your message here"/>
        </styles.foot>
    )
}
const styles={
    foot:styled.div`
    width:66.5vw;
    height:50px;
    position: fixed;
    bottom: 0;
    @media (max-width:708px) {
        display: none;
    }
    `,
    input:styled.input`
    width: 67vw;
    padding-right: 10%;
    height: 100%;
    outline: 0;
    border: 0;
    box-shadow: 0 0 5px 1px rgba(0,0,0,.2);   
    word-break: break-all;
    `,
    send:styled(Send)`
        color:  rgba(140, 236, 236);
        cursor: pointer;
    `
}