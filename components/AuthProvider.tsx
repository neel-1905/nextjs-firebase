"use client";

import { initFirebase } from "@/app/firebase";
import { getAuth, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./Loader";

// Create a context for authentication
const AuthContext = createContext<
  | {
      user: User | null | undefined;
      loading: boolean;
      token: string | null;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathName = usePathname();

  const redirect = (
    isLoading: boolean,
    firebaseUser: User | null | undefined
  ) => {
    // if (!isLoading) {
    //   if (firebaseUser) {
    //     router.push("/");
    //   } else {
    //     router.push("/login");
    //   }
    // }
    if (!loading && !firebaseUser) {
      router.push("/login");
    }
  };

  useEffect(() => {
    redirect(loading, user);
  }, [loading, user, pathName]);

  // Fetch the token when the user changes
  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
      } else {
        setToken(null);
      }
    };

    fetchToken();
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl">
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
