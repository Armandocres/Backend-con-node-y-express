const express = require("express");
const routerAPi = require("./routes/index");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

routerAPi(app);

app.listen(port, () => {
  console.log("My port: " + port);
});
