import Product from "@/libs/modules/product";
import connectMongo from "@/libs/MongoConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();

    const data = await Product.find();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error,
        msg: "something went wrong",
      },
      { status: 400 }
    );
  }
}
