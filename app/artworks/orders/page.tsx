"use client";

import { useContext, useEffect } from "react";
import ProductOrder from "./[id]/page";
import AuthContext from "@/app/utils/AuthProvider";
import SignIn from "@/app/signin/page";

export default function Page() {
  const context = useContext(AuthContext);

  if (!context) {
    console.log("no user found");
    return;
  }

  const { userData, auth } = context;

  console.log({ userData });

  if (!userData && !auth) {
    return <SignIn />;
  } else {
    return <ProductOrder />;
  }
}
