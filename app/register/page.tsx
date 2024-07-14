"use client";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { startTTH } from "@open-web/react-sdk";
import handleBEDCallback from "../components/SSOhandler";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [overallLoading, setLoading] = useState(false);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    const res = await createUserWithEmailAndPassword(email, password);
    if (!res) {
      setLoading(false);
      setError("Cannot create a user with those credentials");
    } else {
      let userData = {
        email: email,
        username: username,
        id: res.user.uid,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          body: JSON.stringify(userData),
          cache: "no-store",
        }
      );

      console.log(response);
      setLoading(false);
      if (response.ok) {
        //clear form
        sessionStorage.setItem("userId", res.user.uid);
        setEmail("");
        setUsername("");
        setPassword("");

        router.push("/");
      } else {
        setError(response.statusText);
      }
    }
  };

  return (
    <div className="w-screen h-screen -mt-36 flex flex-col">
      <div id="log-in-form" className="flex flex-col w-1/3 m-auto max-[600px]:w-11/12">
        <h1 className="roboto-regular text-lg pb-5">Sign Up / Register:</h1>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="flex flex-col"
          rowGap={3}
        >
          <TextField
            required
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            required
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            required
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Alert severity="error">
              Error creating user! {error}
            </Alert>
          )}

          <div className="m-auto">
            <Button onClick={() => handleSignUp()} variant="contained">
              {overallLoading ? (
                <CircularProgress disableShrink color="inherit" size={30} />
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default RegisterPage;
