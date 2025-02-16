import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
} from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = Router();

const postRoute = (path, schema, controller) =>
  router.post(path, validateBody(schema), ctrlWrapper(controller));

postRoute("/register", registerUserSchema, registerUserController);
postRoute("/login", loginUserSchema, loginUserController);
router.post("/logout", ctrlWrapper(logoutUserController));
router.post("/refresh", ctrlWrapper(refreshUserSessionController));

export default router;
