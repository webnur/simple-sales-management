import Product from "@/libs/modules/product";
import connectMongo from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  error: unknown;
  msg: string;
}

interface SuccessResponse {
  msg: string;
}

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Extract the `id` from query parameters
    const id = req.nextUrl.searchParams.get("id");

    // Validate the input
    if (!id) {
      return NextResponse.json(
        { error: null, msg: "Product ID is required in the query string" },
        { status: 400 }
      );
    }

    // Check if the product exists
    const productExists = await Product.findById(id);
    if (!productExists) {
      return NextResponse.json(
        { error: null, msg: "Product not found" },
        { status: 404 }
      );
    }

    // Delete the product
    await Product.deleteOne({ _id: id });

    return NextResponse.json<SuccessResponse>({
      msg: "Product deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting product:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: errorMessage,
        msg: "Something went wrong while deleting the product",
      },
      { status: 500 }
    );
  }
}
