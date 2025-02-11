// import { HttpError } from 'http-errors';

// export const errorHandler = (err, req, res, next) => {
//   if (err instanceof HttpError) {
//     res.status(err.status).json({
//       status: err.status,
//       message: err.message,
//       data: err,
//     });
//     return;
//   }

//   res.status(500).json({
//     status: 500,
//     message: 'Something went wrong',
//     data: err.message,
//   });
// };

// import { HttpError } from "http-errors";
// import pino from "pino";

// const logger = pino();

// export const errorHandler = (err, req, res, next) => {
//   logger.error(err);

//   if (err instanceof HttpError) {
//     res.status(err.status).json({
//       status: err.status,
//       message: err.message,
//       data: err,
//     });
//     return;
//   }

//   res.status(500).json({
//     status: 500,
//     message: "Something went wrong",
//     data: err.message,
//   });
// };

import { HttpError } from "http-errors";
import pino from "pino";
import { Error as MongooseError } from "mongoose"; // Додаємо імпорт помилок Mongoose

const logger = pino();

export const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof MongooseError.CastError) {
    return res.status(400).json({
      status: 400,
      message: "Invalid ID format",
      data: err.message,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
  }

  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    data: err.message,
  });
};
