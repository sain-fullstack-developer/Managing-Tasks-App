import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export interface MyData {
	taskId: number;
	title: string;
	description: string;
	status: string;
}

export async function GET(request: NextRequest) {
	const fileName = `task-data.json`;
	const data = await fs.readFileSync(fileName);
	const jsonData = JSON.parse(data.toString());

	return NextResponse.json(jsonData, { status: 200 });
}

export async function POST(request: NextRequest) {
	const { title, description, status }: MyData = await request.json();

	if (!title || !description || !status) {
		return new NextResponse(
			JSON.stringify({ name: "Please fill all required fields" }),
			{ status: 400 }
		);
	}

	const fileName = `task-data.json`;
	const data = await fs.readFileSync(fileName);
	const jsonData = JSON.parse(data.toString());

	function createUniqueRandomId() {
		const randomNumber = Math.random() * 100000000;
		const randomString = String(randomNumber);
		const uniqueId = randomString.replace(".", "").replace("0", "");
		return uniqueId;
	}

	jsonData.push({
		taskId: createUniqueRandomId(),
		title,
		description,
		status,
	});
	await fs.writeFileSync(fileName, JSON.stringify(jsonData));

	return NextResponse.json(
		{
			message: `Task Submitted Successfully and Saved!`,
			jsonData,
		},
		{ status: 200 }
	);
}
