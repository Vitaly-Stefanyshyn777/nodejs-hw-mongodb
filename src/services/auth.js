import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { UsersCollection } from "../models/user.js";
import { SessionCollection } from "../models/session.js";
import { FIFTEEN_MINUTES, THIRTY_DAY } from "../constants/index.js";

const createSession = () => ({
  accessToken: randomBytes(30).toString("base64"),
  refreshToken: randomBytes(30).toString("base64"),
  accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
  refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
});

export const registerUser = async (payload) => {
  if (await UsersCollection.findOne({ email: payload.email })) {
    throw createHttpError(409, "Email in use");
  }
  return UsersCollection.create({
    ...payload,
    password: await bcrypt.hash(payload.password, 10),
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, "User not found");

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, "Unauthorized");

  await SessionCollection.deleteOne({ userId: user._id });
  return SessionCollection.create({ userId: user._id, ...createSession() });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) throw createHttpError(401, "Session not found");

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, "Session token expired");
  }

  await SessionCollection.deleteOne({ _id: sessionId });
  return SessionCollection.create({
    userId: session.userId,
    ...createSession(),
  });
};

export const logoutUser = async (sessionId) =>
  SessionCollection.deleteOne({ _id: sessionId });
