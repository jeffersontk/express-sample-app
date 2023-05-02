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
      console.error(`Erro ao ler arquivo ${fileName}: ${err.message}`);
      return res.sendStatus(500);
    }

    const jsonData = JSON.parse(data);
    const { products } = jsonData;
    /* let startIndex = 0;

    if (lastId) {
      const lastProduct = products.find((product) => product.id === lastId);

      if (!lastProduct) {
        return res.sendStatus(404);
      }

      startIndex = products.indexOf(lastProduct) + 1;
    } */

    //const paginatedProducts = products.slice(startIndex, startIndex + 10);

    res.json({ products: products });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
