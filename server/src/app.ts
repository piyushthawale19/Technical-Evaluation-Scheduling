import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { apiRoutes } from "./routes/index.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";

export function buildApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(morgan("dev"));

  app.get("/", (_request, response) =>
    response.send("TutorFlow API is running!"),
  );
  app.get("/health", (_request, response) =>
    response.json({ ok: true, service: "tutorflow-server" }),
  );
  app.use("/api", apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
