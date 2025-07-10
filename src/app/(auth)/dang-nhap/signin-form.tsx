'use client';

import { signInSchema, SignInType } from "@/lib/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/custom/password-input";
import LoadingButton from "@/components/custom/loading-button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function SignInForm() {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<SignInType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false, 
        },
    });

    const signIn = (value: SignInType) =>{
        return new Promise<{ error?: string }>((resolve) => {
            setTimeout(() => {
                console.log("Signing in with:", value);
            }, 1000);
            // Resolve with no error for now
            resolve({ error: undefined });
        });
    }

    async function onSubmit(values: SignInType) {
        setError(undefined);
        startTransition(async () => {
          const { error } = await signIn(values);
          if (error) setError(error);
        });
    }

    return (
        <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                {error && <p className="text-center text-destructive">{error}</p>}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-gray-300 mb-1 text-sm">Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="you@example.com"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <label className="block text-gray-300 mb-1 text-sm">Password</label>
                            <FormControl>
                                <PasswordInput
                                    className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder={"********"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between items-center text-sm text-gray-300">
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm text-gray-300 cursor-pointer !mt-0">
                                    Remember me
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    <Link href="#" className="hover:underline text-purple-400">
                        Forgot password?
                    </Link>
                </div>
                <LoadingButton
                    isLoading={isPending}
                    type="submit"
                    className="w-full py-2 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
                >
                    Sign In
                </LoadingButton>
            </form>
        </Form>
    );
}