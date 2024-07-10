"use client";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    const res = await SignInWithEmailAndPassword(email, password);

    if (!res) {
      setLoading(false);
      setError("Cannot sign in with those credentials");
    } else {
      console.log({ res });
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
      router.push("/");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col -mt-36">
      <div id="log-in-form" className="flex flex-col w-1/3 m-auto">
        <h1 className="roboto-regular text-lg pb-5">Sign In:</h1>
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
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <Alert severity="error">Error signing in! {error}</Alert>}

          <div className="m-auto">
            <Button onClick={() => handleSignIn()} variant="contained">
              {loading ? (
                <CircularProgress disableShrink color="inherit" size={30} />
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default SignInPage;
