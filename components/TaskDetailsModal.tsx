"use client";
import React from "react";
import { TaskStore } from "../store/store";
import Button from "./Button";
import { TaskType, createUniqueRandomId } from "@/utils/requiredUtils";

const TaskDetailsModal = ({
	data,
	closeModal,
	update,
	addTask,
}: {
	data: TaskType | undefined | null;
	closeModal: () => void;
	update: Boolean;
	addTask: Boolean;
}) => {
	const [titleValue, setTitleValue] = React.useState(data?.title || "");
	const [descriptionValue, setDescriptionValue] = React.useState(
		data?.description || ""
	);
	const [statusValue, setStatusValue] = React.useState(data?.status || "");

	const store = new TaskStore();

	return (
		<div className="fixed w-full h-screen inset-0 grid place-items-center bg-white bg-opacity-25 backdrop-blur-sm">
			<div className="rounded-lg min-h-[500px] w-2/3 bg-blue-900">
				<div className="flex justify-between mb-2 border-b-onePixel border-white pb-3 p-4">
					<Button
						type="button"
						className="text-xs border-2 border-white rounded-lg p-2 hover:bg-green-400 hover:text-black hover:border-transparent">
						{update && !statusValue
							? data?.status.toUpperCase()
							: update && statusValue
							? statusValue.toUpperCase()
							: statusValue
							? statusValue.toUpperCase()
							: "STATUS"}
					</Button>
					<div
						tabIndex={5}
						onClick={() => {
							closeModal();
							addTask ? (window.location.href = "/") : "";
						}}
						className="text-2xl cursor-pointer">
						&times;
					</div>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const postData = {
							taskId: createUniqueRandomId(),
							title: titleValue,
							description: descriptionValue,
							status: statusValue,
						};

						const updateData = {
							taskId: data?.taskId,
							title: titleValue,
							description: descriptionValue,
							status: statusValue,
						};

						if (update) {
							store.updateTask(updateData);
						} else {
							store.createTask(postData);
						}
						closeModal();
					}}>
					<div className="mb-2 p-4">
						<h2 className="uppercase tracking-widest text-center text-2xl mb-4">
							{update
								? "Update Task"
								: addTask
								? "Add New Task"
								: "Task Details"}
						</h2>
						<label
							htmlFor="titleText"
							className="uppercase tracking-wider text-xl">
							Title
						</label>
						<input
							tabIndex={1}
							title="title"
							id="titleText"
							placeholder="Enter Task Title"
							value={!update && !addTask ? data?.title : titleValue}
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
								setTitleValue(evt.target.value)
							}
							type="text"
							className="bg-slate-400 placeholder:text-gray-500 placeholder:font-normal placeholder:tracking-wider outline-none font-semibold text-black w-full rounded-lg p-4 flex justify-between cursor-pointer relative mt-4"
							required
						/>
					</div>
					<div className="p-4">
						<label
							htmlFor="description"
							className="uppercase tracking-wider text-xl">
							Description
						</label>
						<input
							tabIndex={2}
							title="description"
							id="description"
							placeholder="Enter Task Description"
							value={!update && !addTask ? data?.description : descriptionValue}
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
								setDescriptionValue(evt.target.value)
							}
							type="text"
							className="bg-slate-400 placeholder:text-gray-500 placeholder:font-normal placeholder:tracking-wider outline-none font-semibold text-black w-full rounded-lg p-4 flex justify-between cursor-pointer relative mt-4"
							required
						/>
					</div>
					<div className="p-4">
						<label
							htmlFor="task-state"
							className="uppercase tracking-wider text-xl">
							Status
						</label>
						<select
							tabIndex={3}
							onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
								setStatusValue(event.currentTarget.value);
							}}
							value={!update && !addTask ? data?.status : statusValue}
							id="task-state"
							title="task-status"
							className={`${
								!update ? "disabled" : ""
							} uppercase bg-slate-400 placeholder:text-gray-500 placeholder:font-normal placeholder:tracking-wider outline-none font-semibold text-black rounded-lg p-4 flex justify-between cursor-pointer relative mt-4`}
							disabled={!update && !addTask}
							required>
							<option value="Select Option">Select Option</option>
							<option value="todo">todo</option>
							<option value="inprogress">inprogress</option>
							<option value="completed">completed</option>
						</select>
					</div>
					{(update || addTask) && (
						<div className="text-center mb-4">
							<Button
								tabIndex={4}
								type="submit"
								className="hover:bg-slate-500 bg-slate-400 text-black font-semibold border-none text-sm tracking-widest rounded-lg p-4 m-auto">
								{update ? "UPDATE" : addTask ? "ADD TASK" : ""}
							</Button>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default TaskDetailsModal;
