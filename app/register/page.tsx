"use client";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { deleteUser } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { OWUser } from "../api/users/[id]/route";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [overallLoading, setLoading] = useState(false);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    const q = query(collection(db, "users"), where("email", "==", email));
    let user: OWUser = {
      id: "",
      username: "",
      email: "",
      image_url: "",
      display_name: "",
    };

    const response = await getDocs(q).then((querySnapshot) => {
      // querySnapshot.docs.map((doc) => doc.data());
      querySnapshot.docs.map((doc) => {
        user.email = doc.data().email;
        user.id = doc.data().id;
        user.username = doc.data().username;
        user.image_url = doc.data().image_url;
        user.display_name = doc.data().display_name;
      });
    });

    if (user.id !== "") {
      setError("User with email already exists");
      setLoading(false);
      return;
    }

    const q2 = query(
      collection(db, "users"),
      where("username", "==", username)
    );
    user = {
      id: "",
      username: "",
      email: "",
      image_url: "",
      display_name: "",
    };

    const response2 = await getDocs(q2).then((querySnapshot) => {
      // querySnapshot.docs.map((doc) => doc.data());
      querySnapshot.docs.map((doc) => {
        user.email = doc.data().email;
        user.id = doc.data().id;
        user.username = doc.data().username;
        user.image_url = doc.data().image_url;
        user.display_name = doc.data().display_name;
      });
    });

    if (user.id !== "") {
      setError("User with username already exists");
      setLoading(false);
      return;
    }

    const res = await createUserWithEmailAndPassword(email, password);
    if (!res) {
      setLoading(false);
      setError("Cannot create a user with those credentials");
    } else {
      const userData = {
        email: email,
        username: username,
        id: res.user.uid,
        display_name: displayName,
      };

      const response3 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          body: JSON.stringify(userData),
          cache: "no-store",
        }
      );

      setLoading(false);
      if (response3.ok) {
        //clear form
        sessionStorage.setItem("userId", res.user.uid);
        setEmail("");
        setUsername("");
        setPassword("");
        setDisplayName("");
        router.push("/");
      } else {
        setError(response3.statusText);
      }
    }
  };

  return (
    <div
      id="log-in-form"
      className="flex flex-col w-1/2 m-auto mt-16 max-[600px]:w-11/12"
    >
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
          label="Display Name"
          variant="outlined"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <TextField
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Alert severity="error">Error creating user! {error}</Alert>}

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
  );
};

export default RegisterPage;
