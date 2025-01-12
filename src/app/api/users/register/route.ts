import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailler";


export async function POST(request: NextRequest) {
   await dbConnect();

   try{
    const body = await request.json();
    const {username,email,password} = body;

    const user = await User.findOne({email});

    if(user){
        return NextResponse.json({error:"User already exists",success:false},{status:400});
    }

const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(password,salt);

const newUser = new User({
    username,
    email,
    password:hashedPassword
});

const savedUser = await newUser.save();


await sendEmail({
    email: savedUser.email,
    subject:"VERIFY",
    userId: savedUser._id
});

    return NextResponse.json({message:"User Registerd successfully",savedUser,success:true},{status:200});
   }
catch(error:any){
    return NextResponse.json({error:"Something went wrong",success:false},{status:500});
}
}

