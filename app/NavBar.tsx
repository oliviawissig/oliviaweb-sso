"use client";
import {auth} from './firebase/config.js';
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [userId, setUserId] = useState('');
  const router = useRouter();

  onAuthStateChanged(auth, (tempuser) => {
    console.log("TEMP USER ", tempuser)
    if (tempuser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUserId(tempuser.uid);
      console.log("LOGGED IN!!");
      // ...
    } else {
      // User is signed out
      console.log("LOGGED OUT!!");
      // ...
    }
  });

  return (
    <nav className="w-screen p-10 flex justify-around">
      <Link href="/">OliviaWeb SSO</Link>
      <div className="flex flex-row">
        {userId ? (
          <>
            <Button className="mx-5"
              onClick={() => {
                router.push('/profile/' + userId)
              }}
              variant="outlined" color="secondary"
            >
              Profile
            </Button>
            <Button
              onClick={() => {
                signOut(auth);
                sessionStorage.removeItem("user");
              }}
              variant="text"
              color="error"
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/register">Register</Link>&emsp;||&emsp;
            <Link href="/signin">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;