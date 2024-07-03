"use client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';

import "./register.css";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSignUp = async () => {
    try {
        const res = await createUserWithEmailAndPassword(email, password)
        console.log({res})
        addUserToFirestore(res?.user);
        setEmail('');
        setPassword('');
        setUsername('');
        router.push('/');
    }catch(e){
        console.error(e);
    }
  }

  return (
    <div className="w-screen h-screen -mt-36 flex flex-col">
      <div id="log-in-form" className="flex flex-col w-1/3 m-auto">
        <h1 className="roboto-regular text-lg pb-5">Sign Up / Register:</h1>

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
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          className="pb-5"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="m-auto">
          <Button onClick={() => handleSignUp()} variant="contained">Register</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
