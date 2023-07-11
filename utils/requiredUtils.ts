// functions
export function createUniqueRandomId(): string {
	const randomNumber = Math.random() * 100000000;
	const randomString = String(randomNumber);
	const uniqueId = randomString.replace(".", "").replace("0", "");
	return uniqueId;
}

// types

export interface TaskType {
	taskId?: number | string;
	title: string;
	description: string;
	status: string;
}
