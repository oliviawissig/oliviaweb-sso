"use client";
import React from "react";
import ProfileData from "./ProfileData";
import NavBar from "@/app/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const UserProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  console.log("USER ID", user?.uid);

  if (loading) {
    return (
      <div className="loading-component">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <ProfileData uid={user!.uid} />
    </div>
  );
};

export default UserProfilePage;
