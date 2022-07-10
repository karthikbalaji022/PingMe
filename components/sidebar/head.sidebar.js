import styled from "styled-components";
import Image from "next/image";

import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SmsIcon from "@mui/icons-material/Sms";

import { useRouter } from "next/router";

import { signOut, getAuth } from "firebase/auth";
import { auth } from "../../firebase/firebaseapp";

function HeadSide({ user }) {
  const router = useRouter();
  function handleLogout() {
    signOut(auth)
      .then((res) => {
        router.push("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <styles.head>
      <styles.avatar>
        <img src={user?.photoURL} />
      </styles.avatar>
      <p>Welcome {user?.displayName}</p>
      <styles.iconContainer>
        <IconButton>
          <styles.logout type="button" onClick={handleLogout}>
            Logout!
          </styles.logout>
        </IconButton>
        <IconButton>
          <SmsIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </styles.iconContainer>
    </styles.head>
  );
}

export default HeadSide;
const styles = {
  head: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px;
    position: sticky;
    top: 1;
    z-index: 100;
    background-color: rgb(140, 236, 236);
  `,
  avatar: styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
    }
  `,
  iconContainer: styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: fit-content;
    padding: 0 10px;
    height: 100%;
  `,
  logout: styled.button`
    outline: none;
    border: 0;
    background-color: transparent;
    border-bottom: 1px solid black;
  `,
};
