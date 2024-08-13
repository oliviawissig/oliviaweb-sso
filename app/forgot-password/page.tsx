"use client";
import { Alert, Box } from "@mui/material";
import OWTextField from "../components/OWTextField";
import { useState } from "react";
import OWButton from "../components/OWButton";
import { ArrowForward } from "@mui/icons-material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div
      id="log-in-form"
      className="flex flex-col w-1/2 m-auto mt-16 max-[600px]:w-11/12"
    >
      <h1 className="roboto-regular text-lg pb-5">Forgot Password?</h1>
      <p className="text-sm">
        Enter your email below to get a password reset link.
      </p>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex flex-col"
        rowGap={3}
      >
        <OWTextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <Alert severity="error">Error sending email, {error}</Alert>}

        <div className="m-auto">
          <OWButton
            startIcon={<ArrowForward />}
            onClick={() => {
              sendPasswordResetEmail(auth, email)
                .then(() => {
                  // Password reset email sent!
                  router.push("/signin?reset=true");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setError(errorMessage);
                });
            }}
          >
            Submit
          </OWButton>
        </div>
      </Box>
    </div>
  );
}
