"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider, TaskStore } from "./store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const store = new TaskStore();

	console.log(store.listTasks);
	return (
		<html lang="en">
			<body className={inter.className}>
				<StoreProvider value={TaskStore}>{children}</StoreProvider>
			</body>
		</html>
	);
}
