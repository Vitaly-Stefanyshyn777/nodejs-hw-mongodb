import { THIRTY_DAY } from "../constants/index.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshUsersSession,
} from "../services/auth.js";

const setCookies = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res
    .status(201)
    .json({
      status: 201,
      message: "Successfully registered a user!",
      data: user,
    });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setCookies(res, session);
  res.json({
    status: 200,
    message: "Successfully logged in an user!",
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) await logoutUser(req.cookies.sessionId);
  res.clearCookie("sessionId").clearCookie("refreshToken").status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setCookies(res, session);
  res.json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: { accessToken: session.accessToken },
  });
};
