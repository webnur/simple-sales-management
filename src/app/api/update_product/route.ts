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

    if (sales !== undefined) {
      const updatedAfterSalesQuantity =
        (parseInt(product.afterSalesQuantity) || 0) + sales;

      product.sales = (product.sales || 0) + sales;
      product.afterSalesQuantity = updatedAfterSalesQuantity;
      // product.quantity = updatedQuantity;
    }

    if (name !== undefined) {
      product.name = name;
    }

    if (quantity !== undefined && sales === undefined) {
      product.quantity = quantity;
    }

    if (afterSalesQuantity !== undefined && sales === undefined) {
      product.afterSalesQuantity = afterSalesQuantity;
    }

    await product.save();

    return NextResponse.json<SuccessResponse>({
      msg: "Product updated successfully",
      product,
    });
  } catch (error) {
    return NextResponse.json<ErrorResponse>(
      {
        error,
        msg: "something went wrong",
      },
      { status: 400 }
    );
  }
}
