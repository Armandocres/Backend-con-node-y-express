const express = require("express");
const categoriesService = require("./../services/categories.service");
const validateHandler = require("./../middlewares/validatorHandler");
const {
  createCategorieSchema,
  updateCategorieSchema,
  getCategorieSchema
} = require("./../schemas/categorie.schema");

const router = express.Router();
const service = new categoriesService();

router.get("/", (req, res) => {
  const categories = service.find();

  res.json(categories);
});

router.get(
  "/:id",
  validateHandler(getCategorieSchema, "params"),
  (req, res, next) => {
    try {
      const { id } = req.params;

      const categorie = service.findOne(id);

      res.json(categorie);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", validateHandler(createCategorieSchema, "body"), (req, res) => {
  const body = req.body;

  const newCategorie = service.create(body);

  res.status(201).json({
    newCategorie
  });
});

router.patch(
  "/:id",
  validateHandler(getCategorieSchema, "params"),
  validateHandler(updateCategorieSchema, "body"),
  (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;

      const updateCategorie = service.update(id, body);

      res.json(updateCategorie);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateHandler(getCategorieSchema, "params"),
  (req, res) => {
    try {
      const body = req.body;
      const { id } = req.params;

      const updateCategorie = service.update(id, body);

      res.json(updateCategorie);
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  }
);

router.delete(
  "/:id",
  validateHandler(getCategorieSchema, "params"),
  (req, res) => {
    try {
      const { id } = req.params;

      const updateCategorie = service.delete(id);

      res.json(updateCategorie);
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  }
);

module.exports = router;
