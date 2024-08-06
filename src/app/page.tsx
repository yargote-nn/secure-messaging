import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-4xl font-bold mb-8">Secure Messaging App</h1>
			<div className="space-x-4">
				<Link href="/register">
					<Button>Register</Button>
				</Link>
				<Link href="/login">
					<Button>Login</Button>
				</Link>
			</div>
		</main>
	);
}
