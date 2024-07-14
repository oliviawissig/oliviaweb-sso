'use client';
import { auth } from "./firebase/config.js";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import OWProgress from "./components/OWProgress";

const NavBar = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  return (
    <nav className="w-screen p-10 flex justify-around">
      <Link href="/">OliviaWeb SSO</Link>
      {loading ? <OWProgress /> : <div className="flex flex-row">
        {user?.uid ? (
          <>
            <Button
              className="mx-5"
              onClick={() => {
                router.push("/profile/" + user?.uid);
              }}
              variant="outlined"
              sx={{
                color: 'var(--brand-color)',
                borderColor: 'var(--brand-color)',
                "&:hover": {
                  backgroundColor: "rgba(150, 113, 174, 0.1)",
                  borderColor: "var(--brand-color)"
                }
              }}
            >
              Profile
            </Button>
            <Button
              onClick={() => {
                router.push('');
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
      </div>}
    </nav>
  );
};

export default NavBar;
