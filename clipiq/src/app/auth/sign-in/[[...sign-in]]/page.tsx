import React from "react";
import { SignIn } from "@clerk/nextjs";

const Signin = () => {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: "bg-slate-500 hover:bg-slate-400 text-sm",
        },
      }}
    />
  );
};

export default Signin;
