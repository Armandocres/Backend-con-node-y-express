const express = require("express");
const usersService = require("./../services/users.service");
const validateHandler = require("./../middlewares/validatorHandler");
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema
} = require("./../schemas/user.schema");

const router = express.Router();
const service = new usersService();

router.get("/", (req, res) => {
  const users = service.find();

  res.json(users);
});

router.get(
  "/:id",
  validateHandler(getUserSchema, "params"),
  (req, res, next) => {
    try {
      const { id } = req.params;

      const user = service.findOne(id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", validateHandler(createUserSchema, "body"), (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: "created",
    data: body
  });
});

router.patch(
  "/:id",
  validateHandler(getUserSchema, "params"),
  validateHandler(updateUserSchema, "body"),
  (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;

      const userUpdate = service.update(id, body);

      res.json(userUpdate);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validateHandler(getUserSchema, "params"),
  validateHandler(updateUserSchema, "body"),
  (req, res) => {
    try {
      const body = req.body;
      const { id } = req.params;

      const userUpdate = service.update(id, body);

      res.json(userUpdate);
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  }
);

router.delete("/:id", validateHandler(getUserSchema, "params"), (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = service.delete(id);

    res.status(202).json(deleteProduct);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

module.exports = router;
