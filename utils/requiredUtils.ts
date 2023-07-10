// functions
export function createUniqueRandomId() {
	const randomNumber = Math.random() * 100000000;
	const randomString = String(randomNumber);
	const uniqueId = randomString.replace(".", "").replace("0", "");
	return uniqueId;
}

// constants
export const fileName = `task-data.json`;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// types

export interface MyData {
	taskId: number;
	title: string;
	description: string;
	status: string;
}
