import axios from "axios";
import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

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
			const response = await axios.get("http://localhost:3000/api/tasks");
			this.tasks = response.data;
			return this.tasks;
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	}

	async createTask(task: TaskType) {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/tasks",
				task
			);
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
			const response = await axios.put(
				`http://localhost:3000/api/tasks/${taskId}`,
				task
			);

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
			const response = await axios.delete(
				`http://localhost:3000/api/tasks/${id}`
			);
			this.tasks = this.tasks.filter((task) => task.taskId !== id);
		} catch (error) {
			console.error("Error failed task deletion:", error);
		}
	}
}

const StoreContext = createContext<TaskStore>(new TaskStore());

const StoreProvider = ({ store, children }: any) => {
	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

const useStore = () => {
	return useContext(StoreContext);
};

export { TaskStore, StoreProvider, useStore };
