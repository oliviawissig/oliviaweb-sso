"use client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await SignInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', "true");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col -mt-36">
      <div id="log-in-form" className="flex flex-col w-1/3 m-auto">
        <h1 className="roboto-regular text-lg pb-5">Sign In:</h1>

        <TextField
          className="pb-5"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          className="pb-5"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="m-auto">
          <Button onClick={() => handleSignIn()} variant="contained">Sign In</Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
