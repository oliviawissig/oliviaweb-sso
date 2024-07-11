import { db } from "@/app/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { Item } from "../users/route";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const q = query(collection(db, "users"), where("email", "==", body.email));
  let user: Item = { id: "", username: "", email: "", image_url: "" };

  const response = await getDocs(q).then((querySnapshot) => {
    // querySnapshot.docs.map((doc) => doc.data());
    querySnapshot.docs.map((doc) => {
      user.email = doc.data().email;
      user.id = doc.data().id;
      user.username = doc.data().username;
      user.image_url = doc.data().image_url;
    });
  });

  if (user.id !== "")
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  function getRandomAvatar() {
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(5);
    const randomInt = Math.floor(
      Math.random() * (maxFloored - minCeiled) + minCeiled
    );
    // The maximum is exclusive and the minimum is inclusive
    return `https://oliviaweb.oliviawissig.com/avatars/icon${randomInt}.jpg`;
  }

  console.log("SET DOC START");
  console.log(body.id);
  console.log(body.email);
  console.log(body.username);
  console.log(getRandomAvatar());
  await setDoc(doc(db, "users", body.id), {
    email: body.email,
    username: body.username,
    id: body.id,
    image_url: getRandomAvatar(),
  });
  console.log("SET DOC END");

  return NextResponse.json({
    email: body.email,
    username: body.username,
  });
}
