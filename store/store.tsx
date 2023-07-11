import { TaskType } from "@/utils/requiredUtils";

import { makeAutoObservable } from "mobx";

class TaskStore {
	tasks: TaskType[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	resetTask() {
		const task = { title: "", description: "", status: "" };
		return task;
	}

	getLocalData() {
		if (typeof window !== "undefined") {
			const jsonData = localStorage.getItem("jsonData");

			return jsonData ? JSON.parse(jsonData) : "";
		}
	}

	async fetchTasks() {
		try {
			return this.getLocalData();
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	}

	async createTask(task: TaskType) {
		try {
			if (typeof window !== "undefined") {
				let tasks = JSON.parse(localStorage.getItem("jsonData") || "[]");
				this.tasks.push(task);
				tasks.push(task);
				localStorage.setItem("jsonData", JSON.stringify(tasks));
			}
			window.location.reload();
		} catch (error) {
			console.error("Error failed task submission:", error);
		}
	}

	async updateTask(task: TaskType) {
		const { taskId } = task;
		try {
			const taskIndex = this.getLocalData()?.findIndex(
				(t: TaskType) => t.taskId === taskId
			);
			if (taskIndex !== -1) {
				this.getLocalData()[taskIndex] = task;
				if (typeof window !== "undefined") {
					let tasks = JSON.parse(localStorage.getItem("jsonData") || "[]");
					const taskIndexLocalStorage = tasks.findIndex(
						(t: TaskType) => t.taskId === taskId
					);
					if (taskIndexLocalStorage !== -1) {
						tasks[taskIndexLocalStorage] = task;
						localStorage.setItem("jsonData", JSON.stringify(tasks));
					}
				}
			}
			window.location.reload();
		} catch (error) {
			console.error("Error failed task updation:", error);
		}
	}

	async deleteTask(id: number | string) {
		try {
			const tasks = this.getLocalData();
			const taskIndex = tasks.findIndex((task: TaskType) => task.taskId === id);
			if (taskIndex !== -1) {
				tasks.splice(taskIndex, 1);
				if (typeof window !== "undefined") {
					localStorage.setItem("jsonData", JSON.stringify(tasks));
				}
			}
			window.location.reload();
		} catch (error) {
			console.error("Error failed task deletion:", error);
		}
	}
}

export { TaskStore };
