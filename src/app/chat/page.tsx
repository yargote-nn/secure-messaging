"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { type Socket, io } from "socket.io-client";

interface Message {
	id: number;
	sender_id: number;
	receiver_id: number;
	content: string;
	timestamp: string;
}

export default function Chat() {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [liveMessages, setLiveMessages] = useState<string[]>([]);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login");
			return;
		}

		const fetchMessages = async () => {
			try {
				const response = await axios.get("http://localhost:3000/messages", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setMessages(response.data.messages);
			} catch (error) {
				toast.error("Failed to fetch messages");
			}
		};

		fetchMessages();

		const newSocket = io("http://localhost:3000", {
			auth: { token },
		});

		newSocket.on("connect", () => {
			console.log("Connected to WebSocket");
		});

		newSocket.on("message", (msg: string) => {
			setLiveMessages((prevMessages) => [...prevMessages, msg]);
		});

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, [router]);

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (socket && message) {
			socket.emit("message", message);
			setMessage("");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		router.push("/login");
	};

	return (
		<div className="flex flex-col h-screen p-4 bg-gray-100">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold text-gray-800">Secure Chat</h1>
				<Button onClick={handleLogout} variant="outline">
					Logout
				</Button>
			</div>
			<div className="flex-grow flex space-x-4">
				<Card className="w-1/2 overflow-hidden">
					<CardContent className="p-0">
						<h2 className="text-lg font-semibold p-4 bg-gray-200">
							Message History
						</h2>
						<ScrollArea className="h-[calc(100vh-200px)]">
							<div className="p-4 space-y-4">
								{messages.map((msg) => (
									<Card key={msg.id} className="bg-white shadow">
										<CardContent className="p-3">
											<p className="text-sm text-gray-500">
												From: User {msg.sender_id}
											</p>
											<p className="mt-1">{msg.content}</p>
											<p className="text-xs text-gray-400 mt-2">
												{new Date(msg.timestamp).toLocaleString()}
											</p>
										</CardContent>
									</Card>
								))}
							</div>
						</ScrollArea>
					</CardContent>
				</Card>
				<Card className="w-1/2 overflow-hidden">
					<CardContent className="p-0">
						<h2 className="text-lg font-semibold p-4 bg-gray-200">Live Chat</h2>
						<ScrollArea className="h-[calc(100vh-280px)]">
							<div className="p-4 space-y-2">
								{liveMessages.map((msg, index) => (
									<Card key={index + msg} className="bg-blue-100">
										<CardContent className="p-2">
											<p>{msg}</p>
										</CardContent>
									</Card>
								))}
							</div>
						</ScrollArea>
						<form onSubmit={sendMessage} className="p-4 bg-gray-200">
							<div className="flex space-x-2">
								<Input
									type="text"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									placeholder="Type a message..."
									className="flex-grow"
								/>
								<Button type="submit">Send</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
