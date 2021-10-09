const express = require("express");
const ProductsService = require("./../services/product.service");
const validateHandler = require("./../middlewares/validatorHandler");
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require("./../schemas/product.schema");

const router = express.Router();
const service = new ProductsService();

router.get("/", async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get("/filter", (req, res) => {
  res.send("Soy un filter");
});

router.get(
  "/:id",
  validateHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validateHandler(createProductSchema, "body"),
  async (req, res) => {
    const body = req.body;

    const newProduct = await service.create(body);

    res.status(201).json({
      newProduct
    });
  }
);

router.patch(
  "/:id",
  validateHandler(getProductSchema, "params"),
  validateHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;

      const updateProduct = await service.update(id, body);

      res.json(updateProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateHandler(getProductSchema, "params"),
  validateHandler(updateProductSchema, "body"),
  async (req, res) => {
    try {
      const body = req.body;
      const { id } = req.params;

      const updateProduct = await service.update(id, body);

      res.status(204).json(updateProduct);
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  }
);

router.delete(
  "/:id",
  validateHandler(getProductSchema, "params"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deleteProduct = await service.delete(id);

      res.status(202).json(deleteProduct);
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  }
);

module.exports = router;
