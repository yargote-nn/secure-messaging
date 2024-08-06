"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Login() {
	const [nickname, setNickname] = useState("");
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3000/login", {
				nickname,
			});
			localStorage.setItem("token", response.data.token);
			toast.success("Login successful");
			router.push("/chat");
		} catch (error) {
			toast.error("Login failed");
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-3xl font-bold mb-8">Login</h1>
			<form onSubmit={handleLogin} className="space-y-4">
				<Input
					type="text"
					placeholder="Nickname"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					required
				/>
				<Button type="submit">Login</Button>
			</form>
		</div>
	);
}
