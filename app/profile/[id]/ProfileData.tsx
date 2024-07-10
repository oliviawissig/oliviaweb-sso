import { Item } from "@/app/api/users/route";
import { db } from "@/app/firebase/config";
import { User } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Image from 'next/image'

interface Props {
  uid: string;
}

const ProfileData = ({ uid }: Props) => {
  const [user, setUser] = useState<Item>({ id: "", username: "", email: "", image_url: "" });
  const [loading, setLoading] = useState(false);

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
      <p>User ID: {uid}</p>
      <p></p>
      <p>Avatar:</p>
      <Image src={user.image_url!} alt={"User Avatar"} width="64" height="64"/>
      <p></p>
    </div>
  );
};

export default ProfileData;
