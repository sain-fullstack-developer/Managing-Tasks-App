import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

import { MyData, fileName } from "@/utils/requiredUtils";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	const id = params.id;

	try {
		const data = await fs.readFileSync(fileName);
		const jsonData = JSON.parse(data.toString());
		let taskData: MyData[] | undefined;
		if (jsonData) {
			taskData = [];
			for (const data of jsonData) {
				if (data.taskId === id) {
					taskData.push(data);
				}
			}
		} else {
			taskData = undefined;
		}
		const taskId = taskData ? taskData[0]?.taskId : "";
		if (id === taskId) {
			return NextResponse.json(
				{
					message: `API Task Data with ${taskId} Fetched Successfully!`,
					data: taskData,
				},
				{ status: 200 }
			);
		}
	} catch (error) {
		console.error(`API Data Fetching failed! ${error}`);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	const id = params.id;
	const { title, description, status }: MyData = await request.json();

	if (!title || !description || !status) {
		return new NextResponse(
			JSON.stringify({ name: "Please fill all required fields" }),
			{ status: 400 }
		);
	}

	const data = await fs.readFileSync(fileName);
	const jsonData = JSON.parse(data.toString());

	let taskData: MyData[] | undefined;
	if (jsonData) {
		taskData = [];
		for (const data of jsonData) {
			if (data.taskId === id) {
				taskData.push(data);
			}
		}
	} else {
		taskData = undefined;
	}

	if (taskData && taskData.length === 0) {
		return new NextResponse(JSON.stringify({ name: "Task not found" }), {
			status: 404,
		});
	}
	if (taskData) {
		taskData[0].title = title;
		taskData[0].description = description;
		taskData[0].status = status;
		await fs.writeFileSync(fileName, JSON.stringify(jsonData));
		return NextResponse.json(taskData, { status: 200 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	const id = params.id;

	const data = await fs.readFileSync(fileName);
	const jsonData = JSON.parse(data.toString());
	let taskData: MyData[] | undefined;

	if (jsonData) {
		taskData = [];
		for (const data of jsonData) {
			data.taskId !== id ? taskData.push(data) : undefined;
		}
		await fs.writeFileSync(fileName, JSON.stringify(taskData));
		return NextResponse.json(
			{
				message: `Task deleted successfully!}`,
				jsonData,
			},
			{ status: 200 }
		);
	}
}
