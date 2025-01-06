import { model, models, Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  sales: {
    type: Number,
    required: true,
    default: 0,
  },
  afterSalesQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
