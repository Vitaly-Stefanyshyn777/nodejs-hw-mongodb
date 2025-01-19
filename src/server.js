// import pino from "pino-http";
// import express from "express";
// import cors from "cors";
// import { getEnvVar } from "./utils/getEnvVar.js";
// import { getAllContacts, getContactById } from "./services/contacts.js";

// const PORT = Number(getEnvVar("PORT", "3000"));

// export const setupServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.use(cors());

//   app.use(
//     pino({
//       transport: {
//         target: "pino-pretty",
//       },
//     })
//   );

//   app.get("/contacts", async (req, res) => {
//     const contacts = await getAllContacts();

//     res.status(200).json({
//       status: 200,
//       message: "Successfully found contacts!",
//       data: contacts,
//     });
//   });

//   app.get("/contacts/:contactId", async (req, res, next) => {
//     const { contactId } = req.params;
//     const contact = await getContactById(contactId);

//     if (!contact) {
//       res.status(404).json({
//         status: 404,
//         message: "Contact not found",
//       });
//       return;
//     }

//     res.status(200).json({
//       status: 200,
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   });

//   app.get("/", (req, res) => {
//     res.json({
//       message: "Hello world!",
//     });
//   });

//   app.use("*", (req, res, next) => {
//     res.status(404).json({
//       message: "Not found",
//     });
//   });

//   app.use((err, req, res, next) => {
//     res.status(500).json({
//       message: "Something went wrong",
//       error: err.message,
//     });
//   });

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };

// import express from "express";
// import cors from "cors";
// import pino from "pino-http";

// const setupServer = async () => {
//   const app = express();

//   app.use(express.json());
//   app.use(cors());
//   app.use(
//     pino({
//         transport: {
//             target: 'pino-pretty',
//         }

//     })
//   );
// };

// import express from "express";
// import cors from "cors";
// import pino from "pino-http";
// import dotenv from "dotenv";

// dotenv.config();

// export const setupServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.use(cors());
//   app.use(
//     pino({
//       transport: {
//         target: "pino-pretty",
//       },
//     })
//   );

//   app.use("*", (req, res) => {
//     res.status(404).json({
//       message: "Not found",
//     });
//   });

//   const PORT = process.env.PORT || 3000;

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };

import express from "express";
import cors from "cors";
import {
  getContactsController,
  getContactByIdController,
} from "./controllers/contacts.js";

const app = express();

app.use(express.json());
app.use(cors());

// Реєстрація роутів
app.get("/contacts", getContactsController);
app.get("/contacts/:contactId", getContactByIdController);

// Обробка неіснуючих маршрутів
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
