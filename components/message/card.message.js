import styled from "styled-components"
export default function Card({item,left}){
    
    return(
        <style.msgContainer style={left?{alignItems:"flex-end"}:{}}>
            <style.carBox style={left?{marginRight:"10px"}:{marginLeft:"10px"}}>
            <p style={{wordWrap:"break-word",maxWidth:"100%",overflow:"hidden"}}>{item.msg}</p>
            </style.carBox>
            <p style={{opacity:".5",margin:"0 10px 10px 10px"}}>{item.time}</p>
        </style.msgContainer>
    )
}

const style={
    msgContainer:styled.div`
    width:100%;
    min-height:fit-content;
    padding:20px 0;
    display: flex;
    flex-direction: column;
    `,
    carBox:styled.div`
    height:fit-content;
    width:40%;
    background-color: cyan;
    padding: 10px;
    border-radius: 15px;

    `
}