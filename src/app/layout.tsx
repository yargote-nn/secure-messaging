import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Secure Messaging App",
	description: "A secure messaging application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
