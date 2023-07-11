import React from "react";
import Button from "./Button";
import { TaskType } from "@/utils/requiredUtils";

const TaskListItem = ({
	data,
	handleClickView,
	handleClickEdit,
	handleClickDelete,
}: {
	data: TaskType | undefined | null;
	handleClickView: () => void;
	handleClickEdit: () => void;
	handleClickDelete: () => void;
}) => {
	return (
		<>
			<div className="bg-slate-400 font-semibold text-black rounded-lg p-4 grid md:grid-cols-3 grid-col-1 place-items-center sm:place-items-baseline sm:grid-cols-2 gap-y-4 md:gap-y-0 relative mb-4">
				<p className="mt-2 text-lg">{data?.title}</p>
				<div className="flex sm:justify-center sm:m-auto mt-1">
					<Button
						type="button"
						className="text-sm bg-gray-500 px-2 rounded-lg mr-4 hover:bg-green-600 hover:scale-105 transition-all"
						handleClick={handleClickView}>
						View
					</Button>
					<Button
						type="button"
						handleClick={handleClickEdit}
						className="text-sm bg-gray-500 px-2 rounded-lg mr-4 hover:bg-yellow-400 hover:scale-105 transition-all">
						Edit
					</Button>
					<Button
						handleClick={handleClickDelete}
						type="button"
						className="text-sm bg-gray-500 px-2 rounded-lg hover:bg-red-500 hover:scale-105 transition-all">
						Delete
					</Button>
				</div>
				<p
					className={`${
						data?.status.toLowerCase() === "inprogress"
							? "bg-yellow-400"
							: data?.status.toLowerCase() === "completed"
							? "bg-green-600"
							: data?.status.toLowerCase() == "todo"
							? "bg-red-500"
							: "bg-slate-200"
					} cursor-pointer hover:scale-105 transition-all p-2 w-9 rounded-full text-md tracking-widest flex justify-center sm:justify-normal sm:first-letter:first-line: text-black font-semibold uppercase md:m-auto m-0`}>
					{data?.status ? data?.status : "NOStatus"}
				</p>
			</div>
		</>
	);
};

export default TaskListItem;
