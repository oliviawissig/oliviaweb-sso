import { auth } from "./firebase/config.js";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
}

const NavBar = ({ userId }:Props) => {
  const router = useRouter();

  return (
    <nav className="w-screen p-10 flex justify-around">
      <Link href="/">OliviaWeb SSO</Link>
      <div className="flex flex-row">
        {userId ? (
          <>
            <Button
              className="mx-5"
              onClick={() => {
                router.push("/profile/" + userId);
              }}
              variant="outlined"
              color="secondary"
            >
              Profile
            </Button>
            <Button
              onClick={() => {
                signOut(auth);
                sessionStorage.removeItem("user");
              }}
              variant="text"
              color="error"
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/register">Register</Link>&emsp;||&emsp;
            <Link href="/signin">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
