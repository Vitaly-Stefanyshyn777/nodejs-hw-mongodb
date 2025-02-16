import createHttpError from "http-errors";
import { SessionCollection, UsersCollection } from "../models/index.js";

export const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.get("Authorization")?.split(" ") || [];

    if (!token || bearer !== "Bearer")
      return next(createHttpError(401, "Invalid auth header"));

    const session = await SessionCollection.findOne({ accessToken: token });
    if (!session || new Date() > session.accessTokenValidUntil) {
      return next(
        createHttpError(
          401,
          session ? "Access token expired" : "Session not found"
        )
      );
    }

    req.user = await UsersCollection.findById(session.userId);
    req.user ? next() : next(createHttpError(401));
  } catch {
    next(createHttpError(401));
  }
};
