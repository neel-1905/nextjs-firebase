"use client";

import { initFirebase } from "@/app/firebase";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <header>
      <nav className="max-w-5xl mx-auto py-4">
        <div className="flex w-full items-center justify-end gap-6">
          <ul className="flex items-center gap-3">
            <li>
              <Link href={`/account`}>Account</Link>
            </li>
          </ul>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full border border-white">
              <Image
                src={currentUser?.photoURL || ""}
                height={32}
                width={32}
                alt={currentUser?.displayName || ""}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleSignOut}
              className="py-1 px-3 bg-gray-700 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
