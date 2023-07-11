"use client";
import React, { useEffect, useMemo } from "react";
import { TaskStore } from "../store/store";
import TaskListItem from "@/components/TaskListItem";
import TaskDetailsModal from "@/components/TaskDetailsModal";
import { TaskType } from "@/utils/requiredUtils";

const Home = () => {
	const [openModel, setOpenModel] = React.useState(false);
	const [modelData, setModelData] = React.useState<TaskType | null>();
	const [update, setUpdate] = React.useState<Boolean>(false);
	const [addTask, setAddTask] = React.useState<Boolean>(false);
	const [results, setResults] = React.useState<TaskType[] | undefined>([]);

	const store = useMemo(() => new TaskStore(), []);

	useEffect(() => {
		async function TasksList() {
			const response = await store.fetchTasks();
			console.log(response);
			return setResults(response);
		}
		TasksList();
	}, [store]);

	let ToDosCounts = 0;
	let ProgressCounts = 0;
	let CompletedCounts = 0;
	if (results) {
		for (const task of results) {
			if (task.status === "todo") {
				ToDosCounts++;
			}
			if (task.status === "inprogress") {
				ProgressCounts++;
			}
			if (task.status === "completed") {
				CompletedCounts++;
			}
		}
	} else {
		ToDosCounts = 0;
	}

	const ToDosCount = ToDosCounts;
	const ProgressCount = ProgressCounts;
	const CompletedCount = CompletedCounts;
	const TotalCount = results?.length;

	return (
		<main className="bg-blue-900 min-h-screen text-white p-8 relative">
			<section className="mb-8">
				<h1 className="text-center text-4xl uppercase tracking-widest">
					Tasks Management System
				</h1>
			</section>
			<section className="mb-4 p-4 border-onePixel rounded-lg border-white relative">
				<h2>
					<ul className="grid grid-cols-2 gap-y-3 sm:grid-cols-3 md:flex md:justify-evenly uppercase tracking-wider font-bold ">
						<li className="cursor-pointer hover:scale-105 transition-all">
							Total Tasks <span className="text-slate-400">{TotalCount}</span>
						</li>
						<li className="cursor-pointer hover:scale-105 transition-all">
							ToDos <span className="text-red-600">{ToDosCount}</span>
						</li>
						<li className="cursor-pointer hover:scale-105 transition-all">
							In Progress{" "}
							<span className="text-yellow-500">{ProgressCount}</span>
						</li>
						<li className="cursor-pointer hover:scale-105 transition-all">
							Completed <span className="text-green-500">{CompletedCount}</span>
						</li>
						<li
							onClick={() => {
								setOpenModel(true);
								setModelData(null);
								setUpdate(false);
								setAddTask(true);
							}}
							className="hover:bg-slate-500 hover:scale-105 transition-all bg-slate-400 text-black font-semibold p-2 rounded-full text-sm cursor-pointer">
							Add New Task
						</li>
					</ul>
				</h2>
			</section>
			<section className="mb-4 p-4 border-onePixel rounded-lg border-white">
				{results &&
					results?.map((task, index) => {
						const taskId = task?.taskId ? task?.taskId : "";
						return (
							<div key={index}>
								<TaskListItem
									handleClickView={() => {
										setOpenModel(true);
										setModelData(task);
										setUpdate(false);
									}}
									handleClickEdit={() => {
										setOpenModel(true);
										setUpdate(true);
										setModelData(task);
									}}
									handleClickDelete={() => {
										store.deleteTask(taskId);
										window.location.href = "/";
									}}
									data={task}
								/>{" "}
							</div>
						);
					})}
			</section>

			{openModel && (
				<TaskDetailsModal
					closeModal={() => setOpenModel(false)}
					data={modelData}
					update={update}
					addTask={addTask}
				/>
			)}
		</main>
	);
};

export default Home;
