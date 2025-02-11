// import createHttpError from "http-errors";

// export const validateBody = (schema) => async (req, res, next) => {
//   try {
//     await schema.validateAsync(req.body, { abortEarly: false });
//     next();
//   } catch (error) {
//     const err = createHttpError(400, "Bad Request body", {
//       errors: error.details,
//     });
//     next(err);
//   }
// };

import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.details.map((detail) => ({
      field: detail.context.label,
      message: detail.message,
    }));

    const err = createHttpError(400, "Validation error", { errors });
    next(err);
  }
};
