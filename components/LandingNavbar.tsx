"use client"
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
const LandingNavbar = () => {
  const {isSignedIn} = useAuth();
  return (
    <>
      <nav className="p-4 mx-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex justify-center items-center gap-3">
            <div className=" relative w-10 h-10">
              <Image fill src="/logo.png" alt="logo" />
            </div>
            <h1 className="text-white font-bold font-serif text-3xl">Genius</h1>
          </Link>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="rounded-lg">
                <Button variant="outline" >
                    Get Started
                </Button>
            </Link>
        </div>
        
      </nav>
    </>
  );
};

export default LandingNavbar;
