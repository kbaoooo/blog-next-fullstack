'use client';

import { signUpSchema, SignUpType } from "@/lib/validations";
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

export default function SignUpForm() {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<SignUpType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const signUp = (value: SignUpType) =>{
        return new Promise<{ error?: string }>((resolve) => {
            setTimeout(() => {
                console.log("Signing up with:", value);
            }, 1000);
            // Resolve with no error for now
            resolve({ error: undefined });
        });
    }

    async function onSubmit(values: SignUpType) {
        setError(undefined);
        startTransition(async () => {
          const { error } = await signUp(values);
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

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <label className="block text-gray-300 mb-1 text-sm">Confirm your password</label>
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
 
                <LoadingButton
                    isLoading={isPending}
                    type="submit"
                    className="w-full py-2 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
                >
                    Sign Up
                </LoadingButton>
            </form>
        </Form>
    );
}