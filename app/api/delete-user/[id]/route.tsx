import { db } from "@/app/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //1. delete user from openweb db
  fetch(`https://www.spot.im/api/sso/v1/user/${params.id}`, {
    method: "DELETE",
    headers: {
      "x-spotim-sso-access-token": `${process.env.NEXT_PUBLIC_OPENWEB_SSO_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((response) => console.log("DELETE RESPONSE: ", response))
    .catch((err) => {
      console.error(err);
      return NextResponse.json(false);
    });

  //2. delete user from firebase DB
  await deleteDoc(doc(db, "users", params.id));

  return NextResponse.json(true);
}
