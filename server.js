import express from "express";
import { join } from "path";

const app = express();
const PORT = 3000;

app.use(express.static("./dist"));

app.get("*", (_, res) => {
  res.sendFile(join(import.meta.dirname, "./dist/index.html"));

  res.status(200);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
