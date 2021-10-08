const express = require("express");
const faker = require("faker");

const router = express.Router();

router.get("/", (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    });
  }
  res.json(products);
});

router.get("/filter", (req, res) => {
  res.send("Soy un filter");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (id === "999") {
    res.status(404).json({
      message: "Not found"
    });
  }

  res.status(200).json({
    id,
    name: "Product 1",
    price: 1000
  });
});

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

module.exports = router;