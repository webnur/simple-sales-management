import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {

    await dbConnect();

    try {
        const body = await request.json();
        const { email, password } = body;
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        if (!user.isVerified) {
            return NextResponse.json({ error: "Email not verified" }, { status: 400 });
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token =await jwt.sign(tokenData, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        });
        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
        }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true
        });


        return response;

    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}