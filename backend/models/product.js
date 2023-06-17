const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productScema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 10,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productScema);
