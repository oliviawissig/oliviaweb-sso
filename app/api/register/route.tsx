import { db } from "@/app/firebase/config";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { OWUser } from "../users/[id]/route";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const q = query(collection(db, "users"), where("email", "==", body.email));
  let user: OWUser = { id: "", username: "", email: "", image_url: "", display_name: "" };

  const response = await getDocs(q).then((querySnapshot) => {
    // querySnapshot.docs.map((doc) => doc.data());
    querySnapshot.docs.map((doc) => {
      user.email = doc.data().email;
      user.id = doc.data().id;
      user.username = doc.data().username;
      user.image_url = doc.data().image_url;
      user.display_name = doc.data().display_name;
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

  await setDoc(doc(db, "users", body.id), {
    email: body.email,
    username: body.username,
    id: body.id,
    display_name: body.display_name,
    image_url: getRandomAvatar()
  });

  return NextResponse.json({
    email: body.email,
    username: body.username,
  });
}
