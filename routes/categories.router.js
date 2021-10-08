const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: "created",
    data: body
  });
});

router.patch("/:id", (req, res) => {
  const body = req.body;
  const { id } = req.params;

  res.status(204).json({
    message: "updated patch",
    data: body,
    id
  });
});

router.put("/:id", (req, res) => {
  const body = req.body;
  const { id } = req.params;

  res.status(204).json({
    message: "updated",
    data: body,
    id
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.status(202).json({
    message: "deleted",
    id
  });
});

router.get("/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params;

  res.status(200).json({
    categoryId,
    productId
  });
});

module.exports = router;
