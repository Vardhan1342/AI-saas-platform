"use client"
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
const LandingNavbar = () => {
  const {isSignedIn} = useAuth();
  return (
    <>
      <nav className="p-4 mx-3 relative">
      
        <div className="flex  w-full h-full">
          <div className="mx-auto mt-52 flex flex-col space-y-6">
          <Link href="/" className="flex justify-center items-center gap-3 -translate-x-5">
            <div className=" relative w-10 h-10">
              <Image fill src="/logo.png" alt="logo" />
            </div>
            <h1 className="text-white font-bold font-serif text-3xl">Genius</h1>
          </Link>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="rounded-lg ">
                <Button  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-200">
                    Get Started
                </Button>
            </Link>
          </div>
          
        </div>
        
      </nav>
    </>
  );
};

export default LandingNavbar;
