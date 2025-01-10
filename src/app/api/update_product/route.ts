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
    console.log("payload", Number(sales));

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

    if (product.afterSalesQuantity - (Number(sales) ?? 0) < 0) {
      return NextResponse.json<ErrorResponse>(
        {
          error: null,
          msg: `Product "${product.name}" is out of stock!`,
        },
        { status: 409 }
      );
    }

    const updatedSales = product.sales + (Number(sales) ?? 0);
    const updatedAfterSalesQuantity =
      product.afterSalesQuantity - (Number(sales) ?? 0);
    const updatedTotalQuantity = product.quantity + (Number(quantity) ?? 0);
    const updatedAfterSalesQuantity2 =
      product.afterSalesQuantity + (Number(quantity) ?? 0);

    if (name !== undefined) product.name = name;
    if (quantity !== undefined) {
      product.quantity = updatedTotalQuantity;
      product.afterSalesQuantity =
        updatedAfterSalesQuantity2 + updatedAfterSalesQuantity;
    }
    if (sales !== undefined) {
      product.sales = updatedSales;
      product.afterSalesQuantity =
        updatedAfterSalesQuantity + updatedAfterSalesQuantity2;
    }
    // if (afterSalesQuantity !== undefined)
    //   product.afterSalesQuantity = updatedAfterSalesQuantity;

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
