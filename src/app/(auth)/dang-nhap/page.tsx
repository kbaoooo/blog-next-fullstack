import Image from "next/image";
import GoogleIcon from "@/assets/images/google.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import SignInForm from "./signin-form";

export const metadata: Metadata = {
    title: "Sign In",
};

export default function SignInPage() {
    return (
        <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 text-transparent bg-clip-text">
                Sign in
            </h2>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full shadow-[0_0_2px_rgba(255,255,255,0.1)] my-4" />

            <SignInForm />

            <div className="flex gap-5 justify-center items-center my-3">
                <div className="h-[1px] w-full bg-slate-300/50" />
                <p>Or</p>
                <div className="h-[1px] w-full bg-slate-300/50" />
            </div>

            <Button className="w-full flex gap-3 items-center justify-center py-2 text-white font-semibold rounded-lg transition duration-300 shadow-lg">
                <Image src={GoogleIcon} alt="Google Logo" width={20} height={20} />
                <p>Tiếp tục với Google</p>
            </Button>
            
            <p className="text-center text-gray-300 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link href="/dang-ky" className="text-purple-400 hover:underline">
                Sign up
            </Link>
            </p>
        </div>
    );
  }
  