const Product = require("../models/product");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec()
    .then((prod) => {
      if (!prod) {
        return res.status(400).json({ error: "No product found" });
      }
      req.product = prod;
      next();
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.createProduct = (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  // res.send({body: req.body, file:req.file});

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    // stock: req.body.stock,
    // sold: req.body.sold,
    photo: {
      data: req.file.originalname,
      contentType: "image/png",
    },
  });
  console.log(product);
  product
    .save()
    .then((prod) => {
      if (!prod) {
        return res.status(400).json({ error: "Product not saved" });
      }
      return res.json(product);
    })
    .catch((error) =>
      res.status(400).json({ error: "Something went wrong!!" })
    );
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateProduct = (req, res) => {
  let product = req.product;

  product = _.extend(product);

  product
    .save()
    .then((prod) => {
      if (!prod) {
        return res.status(400).json({ error: "Product not updated" });
      }
      return res.json(product);
    })
    .catch((error) =>
      res.status(400).json({ error: "Something went wrong!!" })
    );
};

exports.removeProduct = (req, res) => {
  const product = req.product;

  product
    .deleteOne()
    .then((prod) => {
      if (!prod) {
        return res.status(400).json({ error: "Can not remove product" });
      }
      res.json({ message: "Product removed" });
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 3;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec()
    .then((prods) => {
      if (!prods) {
        return res.status(400).json({ error: "No products" });
      }
      res.json(prods);
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "No Category Found",
      });
    }
    res.json(cate);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: {
          $inc: { stock: -prod.count, sold: +prod.count },
        },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, prods) => {
    if (err) {
      res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
