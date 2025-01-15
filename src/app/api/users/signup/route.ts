import bcryptjs from 'bcryptjs';

import User from "@/libs/modules/user.model";
import connectMongo from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    await connectMongo();

   try{
    const body = await request.json();
    const {email,password} = body;

    const user = await User.findOne({email});

    if(user){
        return NextResponse.json({error:"User already exists",success:false},{status:400});
    }

const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(password,salt);

const newUser = new User({
    email,
    password:hashedPassword
});

const savedUser = await newUser.save();
    return NextResponse.json({message:"User Registerd successfully",savedUser,success:true},{status:200});
   }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
catch(error){
    return NextResponse.json({error:"Something went wrong",success:false},{status:500});
}
}

