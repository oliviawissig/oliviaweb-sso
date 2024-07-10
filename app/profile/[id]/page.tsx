"use client";
import React, { useState } from "react";
import ProfileData from "./ProfileData";
import NavBar from "@/app/NavBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserProfilePage = () => {
  const auth = getAuth();
  const [userId, setUserId] = useState(auth.currentUser?.uid);

  onAuthStateChanged(auth, (tempuser) => {
    console.log("TEMP USER ", tempuser)
    if (tempuser?.uid) {
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

  console.log("USER ID", userId);

  return (
    <div>
      <NavBar userId={userId!}/>
      <ProfileData uid={userId!} />
    </div>
  );
};

export default UserProfilePage;
