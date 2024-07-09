import { Item } from "@/app/api/users/route";
import { db } from "@/app/firebase/config";
import { User } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Props {
  uid: string;
}

const ProfileData = ({ uid }: Props) => {
  const [user, setUser] = useState<Item>({ id: "", username: "", email: "" });

  useEffect(() => {
    const foo = async () => {
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
    };
    foo();
  }, []);

  return (
    <div className="w-1/2 m-auto">
      <h1 className="roboto-bold text-xl pb-5">User: {user.username}</h1>
      {user.email && (
        <>
          <p>Email:</p>
          <p>{user.email}</p>
          <p></p>
        </>
      )}
      {uid && (
        <>
          <p>User ID:</p>
          <p>{uid}</p>
          <p></p>
        </>
      )}
    </div>
  );
};

export default ProfileData;
