import { SessionCollection } from "./src/db/models/session.js";

const newSession = await SessionCollection.create({
  userId: "65a1b2c3d4e5f6a7b8c9d0e1",
  accessToken: "someAccessToken",
  refreshToken: "someRefreshToken",
  accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 хвилин
  refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 днів
});

console.log(newSession);
