import Image from "next/image";
import GoogleIcon from "@/assets/images/google.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Metadata } from "next";
import SignUpForm from "./signup-form";

export const metadata: Metadata = {
    title: "Sign Up",
};

export default function SignUpPage() {
    return (
        <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 text-transparent bg-clip-text">
                Sign Up
            </h2>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full shadow-[0_0_2px_rgba(255,255,255,0.1)] my-4" />

            <SignUpForm />
            
            <p className="text-center text-gray-300 mt-6 text-sm">
                Already have an account?{" "}
                <Link href="/dang-nhap" className="text-purple-400 hover:underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
  }
  