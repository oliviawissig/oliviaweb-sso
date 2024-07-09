import { db } from "@/app/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { Item } from "../route";

export type OWUser = {
  id: string;
  email: string;
  username: string;
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    
  try {
    const q = query(
      collection(db, "users"),
      where("id", "==", params.id)
    );
    //set list to empty user list
    let users:Item[] = []

    const response = await getDocs(q).then((querySnapshot) => {
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
    return NextResponse.json(users[0]);
  } catch {
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}
