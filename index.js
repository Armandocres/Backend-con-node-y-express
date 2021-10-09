const express = require("express");
const routerAPi = require("./routes/index");
const cors = require("cors");

const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ["ruta"];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  }
};

app.use(cors(options));

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
