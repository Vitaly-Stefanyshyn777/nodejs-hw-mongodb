// import { setupServer } from "./server.js";
// import { initMongoConnection } from "./db/initMongoConnection.js";

// const bootstrap = async () => {
//   await initMongoConnection();
//   setupServer();
// };

// bootstrap();
import express from "express";

const app = express();

// Створіть обробник для кореневого маршруту '/'
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Запустіть сервер
app.listen(3021, () => {
  console.log("Server is running on port 3021");
});
