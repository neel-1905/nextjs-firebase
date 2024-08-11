"use client";

import React from "react";
import { useAuth } from "../AuthProvider";

const Account = () => {
  const { user } = useAuth();
  return (
    <div>This is {user?.displayName?.split(" ")[0] + "'s"} account page</div>
  );
};

export default Account;
