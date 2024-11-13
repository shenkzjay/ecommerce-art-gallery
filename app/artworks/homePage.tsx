"use client";

// import SignIn from "../signin/page";

// import AuthContext from "../utils/AuthProvider";

// import { useContext } from "react";

import { App } from "./App";

export function HomePage() {
  // const context = useContext(AuthContext);

  // if (!context) return;

  // const { auth, userData } = context;

  // if (!userData) {
  //   return <SignIn />;
  // }

  return (
    <div>
      <App />
    </div>
  );
}
