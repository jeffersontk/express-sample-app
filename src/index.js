import express from "express";
import cors from "cors";
import * as fs from "fs";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Choo Choo! Welcome to your Express app 🚅");
});

app.get("/products", (req, res) => {
  const { category, lastId } = req.query;

  const fileName = `${category}.json`;

  fs.readFile(`./data/${fileName}`, "utf-8", (err, data) => {
    if (err) {
      console.log(`erro ao ler arquivo ${fileName}: ${err.message}`);
      res.sendStatus(500);
      return;
    }

    const jsonData = JSON.parse(data);
    const { products } = jsonData;
    let startIndex = 0;

    if (lastId) {
      const lastProductIndex = products.findIndex(
        (product) => product.id === lastId
      );
      startIndex = lastProductIndex + 10;
    }

    const paginatedProducts = products.slice(startIndex, startIndex + 10);

    res.json({ products: paginatedProducts });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
