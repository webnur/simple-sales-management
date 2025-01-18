/* eslint-disable @typescript-eslint/no-unused-expressions */
import Product from "@/libs/modules/product";
import connectMongo from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  error: unknown;
  msg: string;
}

interface SuccessResponse {
  msg: string;
  product?: Record<string, unknown>;
}

export async function PATCH(
  req: NextRequest
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  try {
    await connectMongo();

    const payload = await req.json();
    const { id } = payload;

    if (!id) {
      return NextResponse.json(
        { error: null, msg: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    product.quantity=0,
    product.sales=0,
    product.afterSalesQuantity=0,
    await product.save();

    return NextResponse.json<SuccessResponse>({
        msg: "Product updated successfully",
        product,
      });
    // Directly reset fields using an update query
    // const result = await Product.updateOne(
    //   { _id: id },
    //   { $set: { quantity:0,sales:0 , afterSalesQuantity: 0 } }
    // );

    // if (result.modifiedCount === 0) {
    //   return NextResponse.json(
    //     { error: null, msg: "Product not found or no changes made" },
    //     { status: 404 }
    //   );
    // }

   
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error("Error updating product:", error);

    if (error.message === "ValidationError") {
      return NextResponse.json(
        {
          error: error.errors,
          msg: "Product validation failed. Please check required fields.",
        },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: errorMessage,
        msg: "Something went wrong while updating the product",
      },
      { status: 500 }
    );
  }
}
