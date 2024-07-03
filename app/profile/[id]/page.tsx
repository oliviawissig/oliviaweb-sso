'use client';
import React from "react";
import ProfileData from "./ProfileData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";


const UserProfilePage = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <ProfileData uid={user?.uid!}/>
    </div>
  );
};

export default UserProfilePage;
