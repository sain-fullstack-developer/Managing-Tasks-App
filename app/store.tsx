import axios from "axios";
import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

interface TaskType {
	title: string;
	description: string;
	status: string;
}

class TaskStore {
	listTasks: Array<TaskType> = [];
	newTask: TaskType = {
		title: " ",
		description: " ",
		status: " ",
	};

	constructor() {
		makeAutoObservable(this);
	}

	addTask(task: TaskType) {
		this.listTasks.push(task);
		const response = axios.post("http://localhost:3000/api/tasks", task);
		return response.then((res) => res);
	}

	// async getList() {
	// 	const response = await axios.post("http://localhost:3000/api/tasks");
	// 	this.listTasks = response.data;

	// 	return this.listTasks;
	// }
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
