"use client";
import React from "react";
// import { useObserver } from "mobx-react-lite";
import { TaskStore, useStore } from "./store";

function Home() {
	const [message, setMessage] = React.useState("");
	const store = new TaskStore();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await store.addTask(store.newTask);
		setMessage(response.data.message);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex min-h-screen flex-col items-center justify-between bg-blue-900">
			<input
				onChange={(evt) => {
					store.newTask.title = evt.target.value;
				}}
				title=""
				placeholder="cdcdc"
				type="text"
				className="text-black"
			/>
			<input
				onChange={(evt) => {
					store.newTask.description = evt.target.value;
				}}
				title=""
				placeholder="cdcdc"
				className="text-black"
				type="text"
			/>
			<input
				onChange={(evt) => {
					store.newTask.status = evt.target.value;
				}}
				title=""
				placeholder="cdcdc"
				className="text-black"
				type="text"
			/>
			<button type="submit">Submit</button>
			{message && (
				<p className="bg-gray-100 p-4 rounded-lg px-8 text-green-500 font-bold fixed top-16">
					{message}
				</p>
			)}
		</form>
	);
}

export default Home;
