"use client";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";

const NavBar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="w-screen p-10 flex justify-around">
      <Link href="/">OliviaWeb SSO</Link>
      <div className="flex flex-row">
        {user ? (
          <Button onClick={() => {
            signOut(auth);
            sessionStorage.removeItem('user');
          }} variant="text" color="error">Log Out</Button>
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
