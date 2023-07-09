"use client";
import React from "react";
import { TaskStore, TaskType } from "../store/store";

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
	const [message, setMessage] = React.useState("");
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
					<button
						type="button"
						className="text-xs border-onePixel border-white rounded-lg p-2 hover:bg-green-400 hover:text-black hover:border-transparent">
						Mark as Completed
					</button>
					<div
						onClick={() => {
							closeModal();
							addTask && window.location.reload();
						}}
						className="text-2xl cursor-pointer">
						&times;
					</div>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const postData = {
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
							console.log("fields");
						}
						setMessage("testing");
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
						<label className="uppercase tracking-wider text-xl">Title</label>
						<input
							placeholder="title"
							value={titleValue}
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
								setTitleValue(evt.target.value)
							}
							type="text"
							className="bg-slate-400 font-semibold text-black w-full rounded-lg p-4 flex justify-between cursor-pointer relative mt-4"
						/>
					</div>
					<div className="p-4">
						<label className="uppercase tracking-wider text-xl">
							Description
						</label>
						<input
							placeholder="description"
							value={descriptionValue}
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
								setDescriptionValue(evt.target.value)
							}
							type="text"
							className="bg-slate-400 font-semibold text-black w-full rounded-lg p-4 flex justify-between cursor-pointer relative mt-4"
						/>
					</div>
					<div className="p-4">
						<label className="uppercase tracking-wider text-xl mb-4">
							Status
						</label>
						<input
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
								setStatusValue(evt.target.value)
							}
							value={statusValue}
							type="text"
							placeholder="Status"
							className="uppercase bg-slate-400 font-semibold text-black rounded-lg p-4 flex justify-between cursor-pointer relative"
						/>
					</div>
					{(update || addTask) && (
						<div className="text-center mb-4">
							<button
								type="submit"
								className="bg-slate-400 text-black font-semibold border-none text-sm tracking-widest rounded-lg p-4 m-auto">
								{update ? "UPDATE" : addTask ? "ADD TASK" : ""}
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default TaskDetailsModal;
