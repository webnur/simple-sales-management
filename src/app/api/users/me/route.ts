import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    await dbConnect();

    try {
const userId= getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password -username");
        if(!user){
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        return NextResponse.json({ user,message:"User fetched successfully",success:true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}