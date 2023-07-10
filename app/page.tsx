"use client";
import React, { useEffect, useMemo } from "react";
import { TaskStore, TaskType } from "../store/store";
import TaskListItem from "@/components/TaskListItem";
import TaskDetailsModal from "@/components/TaskDetailsModal";

function Home() {
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

	const TotalCount = store?.tasks?.length;
	const ToDosCount = store?.tasks?.filter((task) => task.status === "todo");
	const ProgressCount = store?.tasks?.filter(
		(task) => task.status === "inprogress"
	);
	const CompletedCount = store?.tasks?.filter(
		(task) => task.status === "completed"
	);

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
						<li className="cursor-pointer">
							Total Tasks <span className="text-slate-400">{TotalCount}</span>
						</li>
						<li className="cursor-pointer">
							ToDos <span className="text-red-600">{ToDosCount.length}</span>
						</li>
						<li className="cursor-pointer">
							In Progress{" "}
							<span className="text-yellow-500">{ProgressCount.length}</span>
						</li>
						<li className="cursor-pointer">
							Completed{" "}
							<span className="text-green-500">{CompletedCount.length}</span>
						</li>
						<li
							onClick={() => {
								setOpenModel(true);
								setModelData(null);
								setUpdate(false);
								setAddTask(true);
							}}
							className="hover:bg-slate-500 bg-slate-400 text-black font-semibold p-2 rounded-full text-sm cursor-pointer">
							Add New Task
						</li>
					</ul>
				</h2>
			</section>
			<section className="mb-4 p-4 border-onePixel rounded-lg border-white">
				{results?.map((task, index) => {
					console.log(task);
					return (
						<>
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
										store.deleteTask(task?.taskId);
										window.location.href = "/";
									}}
									data={task}
								/>{" "}
							</div>
						</>
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
}

export default Home;
