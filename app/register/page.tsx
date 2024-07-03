"use client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";

import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const addUserToFirestore = async (user: User) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: user.email,
        id: user.uid,
        username: username,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      if (!res) console.error("empty user", 5);
      else addUserToFirestore(res?.user!);

      setEmail("");
      setPassword("");
      setUsername("");
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-screen h-screen -mt-36 flex flex-col">
      <div id="log-in-form" className="flex flex-col w-1/3 m-auto">
        <h1 className="roboto-regular text-lg pb-5">Sign Up / Register:</h1>

        <TextField
          required
          className="pb-5"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          required
          className="pb-5"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          required
          className="pb-5"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="m-auto">
          <Button onClick={() => handleSignUp()} variant="contained">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
