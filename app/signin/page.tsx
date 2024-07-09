"use client";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
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
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Alert className="mb-5" severity="error">
            Error signing in! {error}
          </Alert>
        )}

        <div className="m-auto">
          <Button onClick={() => handleSignIn()} variant="contained">
            {loading ? (
              <CircularProgress disableShrink color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
