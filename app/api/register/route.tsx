import { db } from "@/app/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

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
    image_url: getRandomAvatar(),
  });

  return NextResponse.json({
    email: body.email,
    username: body.username,
  });
}
