import { BASE_URL } from "@/utils/requiredUtils";
import axios from "axios";
import { makeAutoObservable } from "mobx";

export interface TaskType {
	taskId?: number;
	title: string;
	description: string;
	status: string;
}

class TaskStore {
	tasks: TaskType[] = [];

	constructor() {
		makeAutoObservable(this);
		this.fetchTasks();
	}

	resetTask() {
		const task = { title: "", description: "", status: "" };
		return task;
	}

	async fetchTasks() {
		try {
			if (!BASE_URL) {
				throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not set");
			}
			const response = await axios.get(BASE_URL);
			this.tasks = response.data;
			return this.tasks;
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	}

	async createTask(task: TaskType) {
		try {
			if (!BASE_URL) {
				throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not set");
			}
			const response = await axios.post(BASE_URL, task);
			if (response.status) {
				("Task Submitted Successfully!");
			}

			window.location.reload();
		} catch (error) {
			console.error("Error failed task submission:", error);
		}
	}

	async updateTask(task: TaskType) {
		const { taskId } = task;

		try {
			const response = await axios.put(`${BASE_URL}/${taskId}`, task);

			if (response.status) {
				("Task Updated and Submitted Successfully!");
			}
			window.location.reload();
		} catch (error) {
			console.error("Error failed task updation:", error);
		}
	}

	async deleteTask(id: number | undefined) {
		try {
			const response = await axios.delete(`${BASE_URL}/${id}`);
			this.tasks = this.tasks.filter((task) => task.taskId !== id);
		} catch (error) {
			console.error("Error failed task deletion:", error);
		}
	}
}

export { TaskStore };
