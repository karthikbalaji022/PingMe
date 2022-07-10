import { Avatar } from "@mui/material"
import styled from "styled-components"
import { getLastSeen,getPhotoUrl } from "../../util/util.firebase";
import { useEffect, useState } from "react";

export default function HeadMessage({mail}){
    const [lastSeen,setLastSeen] = useState(null);
    console.log(mail);
    const [pic,setPic]=useState(null);

    useEffect(()=>{
        async function temp(){
            const seen=await getLastSeen(mail);
            if(seen&&seen.lastseen)
            {
                setLastSeen(seen?.lastseen);
            }else{
                setLastSeen(null);

            }
            const url=await getPhotoUrl(mail);
            setPic(url);
        }
        temp();
    },[mail]);
    return(
        <styles.headContainer>
                <styles.Avatar src={pic||"https://source.unsplash.com/random"}/>
            <styles.headLeft>
                <p >{mail?.split('@')[0]}</p>
                <p >Last seen: {lastSeen}</p>
            </styles.headLeft>
        </styles.headContainer>
    )
}

const styles={
    headContainer:styled.div`
    padding:10px;
    width:100%;
    height:64px;
    background-color:  rgba(140, 236, 236);
    display: flex;
    align-items: center;
    gap:30px;
    position: sticky;
    top:0;
`,
    headLeft:styled.div`
    /* height:100%; */
    display: flex;
    flex-direction: column;
    p{
        margin: 0;
        text-transform: capitalize;
    }
    p:nth-child(1){
        font-weight: 500;
        font-size: 20;
    }
    p:nth-child(2){
        font-size: 13px;
    }
    `,
    Avatar:styled(Avatar)`
      
    `
}