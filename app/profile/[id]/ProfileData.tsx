import { db } from "@/app/firebase/config";
import { User } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Props {
  uid: string;
}

const ProfileData = ({ uid }: Props) => {
  let [email, setEmail] = useState("");
  let [username, setUsername] = useState("");

  useEffect(() => {
    const foo = async () => {
      const q = query(
        collection(db, "users"),
        where("id", "==", uid || "0wfnDqme3GayPPcrrmCkkEaKC1l1")
      );
      const querySnapshot = await getDocs(q);

      const posts = querySnapshot.docs.map((doc) => doc.data());

      console.log(posts);

      setEmail(posts[0].email);
      setUsername(posts[0].username);
    };
    foo();
  }, [email, username]);

  return (
    <div className="w-1/2 m-auto">
      <h1 className="roboto-bold text-xl pb-5">User: {username}</h1>

      {email && (
        <>
          <p>Email:</p>
          <p>{email}</p>
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
