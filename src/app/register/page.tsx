"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Register() {
	const [nickname, setNickname] = useState("");
	const router = useRouter();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3000/register", {
				nickname,
			});
			toast.success("Registration successful");
			router.push("/login");
		} catch (error) {
			toast.error("Registration failed");
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-3xl font-bold mb-8">Register</h1>
			<form onSubmit={handleRegister} className="space-y-4">
				<Input
					type="text"
					placeholder="Nickname"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					required
				/>
				<Button type="submit">Register</Button>
			</form>
		</div>
	);
}
