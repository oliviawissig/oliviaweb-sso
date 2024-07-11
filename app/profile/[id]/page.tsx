"use client";
import React from "react";
import ProfileData from "./ProfileData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@mui/material";
import { collection, doc, getDoc, query, setDoc, where } from "firebase/firestore";

interface CloudinaryResult {
  public_id: string;
}

interface Props {
  public_id: string;
}

const UserProfilePage = () => {
  const [user, loading] = useAuthState(auth);

  const updateImgUrl = async ({ public_id }: Props) => {
    //update doc in firestore
    const q = query(
      collection(db, "users"),
      where("id", "==", user?.uid)
    );

    const userRef = doc(db, "users", user?.uid!);
    console.log(userRef);
    await setDoc(userRef, {
      image_url: public_id,
    });

    const docSnap = await getDoc(userRef);
    const userData = docSnap.data();
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      return;
    }

    const response = await fetch(
      `https://www.spot.im/api/sso/v1/update-user?primary_key=${
        docSnap.data().id
      }&user_name=${docSnap.data().username}&image_url=${
        docSnap.data().image_url
      }`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
  };

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
      <CldUploadWidget
        uploadPreset="zax4qscb"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result, options) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          updateImgUrl({ public_id: info.public_id });
        }}
      >
        {({ open }) => (
          <Button onClick={() => open()} variant="outlined">
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UserProfilePage;
