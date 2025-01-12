import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    await dbConnect();

    try {
        const body = await request.json();
        const { token } = body;

        const user = await User.findOne({ verifyToken: token, verifyExpire: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Your Token has been expired" }, { status: 400 });
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyExpire = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified", success: true }, { status: 200 });


    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}