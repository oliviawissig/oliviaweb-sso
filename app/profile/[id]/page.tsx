"use client";
import React from "react";
import ProfileData from "./ProfileData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const UserProfilePage = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="loading-component">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-1/2 m-auto">
      <ProfileData uid={user!.uid} />
    </div>
  );
};

export default UserProfilePage;
