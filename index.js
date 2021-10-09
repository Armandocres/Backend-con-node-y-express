const express = require("express");
const routerAPi = require("./routes/index");

const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require("./middlewares/error.handler");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

routerAPi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("My port: " + port);
});
