"use client";
import React, { useEffect } from "react";
import ProfileData from "./ProfileData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const UserProfilePage = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div>
      {loading ? <div>Loading...</div> : <ProfileData uid={user?.uid!} />}
    </div>
  );
};

export default UserProfilePage;
