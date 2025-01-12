import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    await dbConnect();

    try {
        const response = NextResponse.json({ message: "Logged out successfully", success: true }, { status: 200 });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}