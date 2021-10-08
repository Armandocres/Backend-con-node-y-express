const express = require("express");
const categoriesService = require("./../services/categories.service");

const router = express.Router();
const service = new categoriesService();

router.get("/", (req, res) => {
  const categories = service.find();

  res.json(categories);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const categorie = service.findOne(id);

  res.json(categorie);
});

router.post("/", (req, res) => {
  const body = req.body;

  const newCategorie = service.create(body);

  res.status(201).json({
    newCategorie
  });
});

router.patch("/:id", (req, res) => {
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
});

router.put("/:id", (req, res) => {
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
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const updateCategorie = service.delete(id);

    res.json(updateCategorie);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

module.exports = router;
