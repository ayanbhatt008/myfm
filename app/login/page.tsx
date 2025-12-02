"use client"
import {supabase} from "@/lib/supabase"
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";



export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    useEffect(()=> {
        supabase.auth.getUser()
            .then(({data: { user}, error}) => {
                if (error)
                    console.error(error.message);
                else
                    router.push("/dashboard");
            })
    }, [])

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();

        setLoading(true);
        setError("");


        // if they are logging in it will use the login func rather than sign up

        const {error } = isLogin ? await supabase.auth.signInWithPassword({email, password}) : await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: username,
                }
            }

        });

        if (error)
            setError(error.message);

        setLoading(false);


        if (!error)
            router.push("/dashboard")
    }

    return (
        <div className = "flex flex-col items-center p-6">
            <h1 className ="text-xl font-semibold mb-4">
                {isLogin ? "Login" : "Sign Up"}
            </h1>

            <form onSubmit={handleSubmit} className={"flex flex-col gap-4 w-80"}>

                {
                    (!isLogin) && (
                        <input
                            className={"border p-2 rounded"}
                            placeholder={"USERNAME"}
                            value = {username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    )
                }
                <input
                    className={"border p-2 rounded"}
                    type={"email"}
                    placeholder={"EMAIL"}
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className={"border p-2 rounded"}
                    type={"password"}
                    placeholder={"PASSWORD"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <p className={"text-red-500 text-sm"}>{error}</p>
                )}

                <button
                    type = "submit"
                    className="bg-black text-white p-2 rounded"
                    disabled ={loading}
                >
                    {loading
                        ? "Loading .."
                        : isLogin ? "Log in" : "Sign Up"
                    }
                </button>
            </form>

            <button className={"mt-4 text-sm underline"} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
            </button>
        </div>
    )





}
