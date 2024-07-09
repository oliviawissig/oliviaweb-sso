import { db } from "@/app/firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { Item } from "../users/route";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const q = query(collection(db, "users"), where("email", "==", body.email));
  let user:Item = { id: "", username: "", email: "" };

  const response = await getDocs(q).then((querySnapshot) => {
    // querySnapshot.docs.map((doc) => doc.data());
    querySnapshot.docs.map((doc) => {
      user.email = doc.data().email;
      user.id = doc.data().id;
      user.username = doc.data().username;
    });
  });

  if(user.id !== "")
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  try {
    const docRef = await addDoc(collection(db, "users"), {
      email: body.email,
      username: body.username,
      id: body.id
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return NextResponse.json({
    email: body.email,
    username: body.username,
  });
}
