import { db } from "@/app/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { Item } from "../route";
import { NextApiRequest, NextApiResponse } from "next";

export type OWUser = {
  id: string;
  email: string;
  username: string;
};

export async function GET(request: NextApiRequest, { params }: { params: { id: string } }) {
    
  try {
    const q = query(
      collection(db, "users"),
      where("id", "==", params.id)
    );

    //set list to empty user list
    let users:Item[] = []

    const response = await getDocs(q).then((querySnapshot) => {
        // querySnapshot.docs.map((doc) => doc.data());
        querySnapshot.docs.map((doc) => {
          let userData = {
              email: '',
              id: '',
              username: ''
          };
          userData.email = doc.data().email;
          userData.id = doc.data().id;
          userData.username = doc.data().username;
          users.push(userData);
        });
      });

    console.log(users);

    return NextResponse.json(users);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
