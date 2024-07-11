import { Item } from "@/app/api/users/route";
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { startTTH } from '@open-web/react-sdk';
import handleBEDCallback from '@/app/SSOhandler'
import { collection, doc, getDoc, query, updateDoc, where } from "firebase/firestore";
import { CldUploadWidget } from "next-cloudinary";
import { Button, CircularProgress } from "@mui/material";
import { logout as OWLogout } from '@open-web/react-sdk';
import { db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

interface PropfileDataProps {
  uid: string;
}

interface CloudinaryResult {
  url: string;
}

interface ImageUrlProps {
  url: string;
}

const ProfileData = ({ uid }: PropfileDataProps) => {
  const [user, setUser] = useState<Item>({ id: "", username: "", email: "", image_url: "" });
  const [loading, setLoading] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  const updateImgUrl = async ({ url }: ImageUrlProps) => {
    setBtnLoading(true);
    // update doc in firestore
    const q = query(
      collection(db, "users"),
      where("id", "==", uid)
    );
    const userRef = doc(db, "users", uid!);
    await updateDoc(userRef, {
      image_url: url,
    });

    const docSnap = await getDoc(userRef);
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
    OWLogout();
    await startTTH({ userId: uid, performBEDHandshakeCallback: async (codeA: string) => {
      return handleBEDCallback(codeA, uid);
    }});
    setBtnLoading(false);
    router.push('/');
  };

  useEffect(() => {
    const foo = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${uid}`,
        {
          cache: "no-store",
        }
      );

      if (response.ok) {
        const tempUser = await response.json();
        setUser(tempUser);
        console.log(user);
      }
      setLoading(false);
    };
    foo();
  }, []);

  if (loading) {
    return (
      <div className="w-1/2 m-auto">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="roboto-bold text-xl pb-5">User: {user.username}</h1>
      <p>Email: {user.email}</p>
      <p></p>
      <p>User ID (primary key): {uid}</p>
      <p></p>
      <p>Avatar:</p>
      <Image src={user.image_url!} alt={"User Avatar"} width="64" height="64"/>
      <p></p>
      <CldUploadWidget
        uploadPreset="zax4qscb"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result, options) => {
          console.log(result);
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          updateImgUrl({ url: info.url });
        }}
      >
        {({ open }) => (
          <Button disabled={btnLoading ? true : false} onClick={() => open()} variant="outlined">
            {btnLoading ? <CircularProgress color={"inherit"}/> : "Upload Image"}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ProfileData;
