const { validationResult } = require("express-validator");
const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id)
    .exec()
    .then((cate) => {
      if (!cate) {
        return res.status(400).json({ error: "Category not found" });
      }
      req.category = cate;
      next();
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  category
    .save()
    .then((cate) => {
      if (!cate) {
        return res.status(400).json({ error: "not able to save the category" });
      }
      res.json({ cate });
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find()
    .exec()
    .then((cates) => {
      if (!cates) {
        return res.status(400).json({ error: "No Categories" });
      }
      res.json(cates);
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.updateCategory = (req, res) => {
  const category = req.category;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  category.name = req.body.name;

  category
    .save()
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return res.status(400).json({ error: "Can not update category" });
      }
      res.json(updatedCategory);
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category
    .deleteOne()
    .then((cate) => {
      if (!cate) {
        return res.status(400).json({ error: "Can not remove category" });
      }
      res.json({ message: "Category removed" });
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};
