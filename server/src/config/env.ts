export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/tutorflow",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? "dev-access-secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret",
  accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY ?? "15m",
  refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY ?? "7d",
};
