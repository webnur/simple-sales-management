import Product from "@/libs/modules/product";
import connectMongo from "@/libs/MongoConnect";
import { NextResponse } from "next/server";

// Named export for POST method
export async function POST(req: Request) {
  try {
    await connectMongo();

    const body = await req.json(); // Parse the incoming request body
    const { name, quantity, sales, afterSalesQuantity } = body;

    // Validate request body
    if (!name || !quantity || !sales || !afterSalesQuantity) {
      return NextResponse.json(
        { msg: "All fields are required" },
        { status: 400 }
      );
    }

    // Save the product to the database
    const newProduct = await Product.create({
      name,
      quantity,
      sales,
      afterSalesQuantity,
    });

    return NextResponse.json(
      { msg: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { msg: "Failed to create product", error: error },
      { status: 500 }
    );
  }
}
