import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { MyData, createUniqueRandomId, fileName } from "@/utils/requiredUtils";

export async function GET(request: NextRequest) {
	try {
		const data = await fs.readFileSync(fileName);
		const jsonData = JSON.parse(data.toString());
		return NextResponse.json(jsonData, { status: 200 });
	} catch (error) {
		console.log(error);
	}
}

export async function POST(request: NextRequest) {
	const { title, description, status }: MyData = await request.json();
	try {
		if (!title || !description || !status) {
			return new NextResponse(
				JSON.stringify({ name: "Please fill all required fields" }),
				{ status: 400 }
			);
		}
		const data = await fs.readFileSync(fileName);
		const jsonData = JSON.parse(data.toString());

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
	} catch (error) {
		console.log(error);
	}
}
