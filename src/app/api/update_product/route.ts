import Product from "@/libs/modules/product";
import connectMongo from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

interface ProductUpdatePayload {
  id: string;
  name?: string;
  quantity?: number;
  sales?: number;
  afterSalesQuantity?: number;
}

interface ErrorResponse {
  error: unknown;
  msg: string;
}

interface SuccessResponse {
  msg: string;
  product?: typeof Product;
}

export async function PATCH(
  req: NextRequest
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  try {
    await connectMongo();

    const payload: ProductUpdatePayload = await req.json();
    const { id, name, quantity, sales, afterSalesQuantity } = payload;

    if (!id) {
      return NextResponse.json<ErrorResponse>(
        {
          error: null,
          msg: "Product ID is required",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json<ErrorResponse>(
        {
          error: null,
          msg: "Product not found",
        },
        { status: 404 }
      );
    }

    if (product.afterSalesQuantity <= product.sales) {
      return NextResponse.json<ErrorResponse>(
        {
          error: null,
          msg: "Your product is stock out!",
        },
        { status: 404 }
      );
    }

    const updateSales = product.sales + (Number(sales) ?? 0);
    const updateQuantity = product.afterSalesQuantity - (Number(sales) ?? 0);

    console.log("update sales", updateSales);
    console.log("update quantity", updateQuantity);

    if (name !== undefined) product.name = name;
    if (quantity !== undefined) product.quantity = quantity;
    if (sales !== undefined) product.sales = updateSales;
    if (afterSalesQuantity !== undefined)
      product.afterSalesQuantity = updateQuantity;

    await product.save();

    return NextResponse.json<SuccessResponse>({
      msg: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json<ErrorResponse>(
      {
        error,
        msg: "Something went wrong while updating the product",
      },
      { status: 500 }
    );
  }
}
