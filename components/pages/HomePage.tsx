"use client";

import { initFirebase } from "@/app/firebase";
import { welcomeApis } from "@/utils/apis/welcome";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../AuthProvider";

const HomePage = () => {
  const { token, user } = useAuth();
  const [data, setData] = useState<any>(null);

  const fetchWelcome = async () => {
    const res = await welcomeApis.getWelcome(token!);
    setData(res);
  };
  useEffect(() => {
    fetchWelcome();
  }, []);

  return <div>{user?.email}</div>;
};

export default HomePage;
