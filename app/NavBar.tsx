'use client';
import { auth } from "./firebase/config.js";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  return (
    <nav className="w-screen p-10 flex justify-around">
      <Link href="/">OliviaWeb SSO</Link>
      {loading ? <CircularProgress color="secondary" /> : <div className="flex flex-row">
        {user?.uid ? (
          <>
            <Button
              className="mx-5"
              onClick={() => {
                router.push("/profile/" + user?.uid);
              }}
              variant="outlined"
              color="secondary"
            >
              Profile
            </Button>
            <Button
              onClick={() => {
                router.push('');
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
      </div>}
    </nav>
  );
};

export default NavBar;
