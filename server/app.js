const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.listen(process.env.PORT, () =>
  console.log(`Started Server: http://localhost:${process.env.PORT}`)
);
