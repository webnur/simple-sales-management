import Product from "@/libs/modules/product";
import connectMongo from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  error: unknown;
  msg: string;
}

interface SuccessResponse {
  msg: string;
  product?: typeof Product;
}


interface ProductUpdatePayload {
  id: string;
  quantity?: number;
  sales?: number;
}

export async function PATCH(
  req: NextRequest
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  try {
    await connectMongo();

    const payload: ProductUpdatePayload = await req.json();
    const { id, quantity, sales } = payload;

    console.log("Received quantity:", quantity);
    console.log("Received sales:", sales);

    if (!id) {
      return NextResponse.json<ErrorResponse>(
        { error: null, msg: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json<ErrorResponse>(
        { error: null, msg: "Product not found" },
        { status: 404 }
      );
    }

    const salesNumber = Number(sales) || 0;
    const quantityNumber = Number(quantity) || 0;

    if (salesNumber < 0 || quantityNumber < 0) {
      return NextResponse.json<ErrorResponse>(
        { error: null, msg: "Sales and quantity must be non-negative numbers" },
        { status: 400 }
      );
    }

    // Check if sales can be subtracted from afterSalesQuantity
    if (salesNumber > 0 && product.afterSalesQuantity - salesNumber < 0) {
      return NextResponse.json<ErrorResponse>(
        { error: null, msg: `Product "${product.name}" is out of stock!` },
        { status: 409 }
      );
    }

    // Update sales and afterSalesQuantity
    if (salesNumber > 0) {
      product.sales += salesNumber;
      product.afterSalesQuantity -= salesNumber;
    }

    // Update quantity and afterSalesQuantity
    if (quantityNumber > 0) {
      product.quantity += quantityNumber;
      product.afterSalesQuantity += quantityNumber;
    }

    await product.save();

    return NextResponse.json<SuccessResponse>({
      msg: "Product updated successfully",
      product,
    });
  }catch (error) {
    console.error("Error updating product:", error);
  
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
  
    return NextResponse.json<ErrorResponse>(
      {
        error: errorMessage,
        msg: "Something went wrong while updating the product",
      },
      { status: 500 }
    );
  }
  
}


