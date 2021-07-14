import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";

import "./database";

import "./shared/container";

import { router } from "./routes";
import { AppError } from "./errors/AppError";

const app = express();

// app.use(cors());
app.use(
  cors({
    // origin: 'http://localhost:8080',
    // credentials: true,
    exposedHeaders: ["Content-Disposition"],
  }),
);
app.use(express.json());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statuscode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error = ${err.message}`,
    });
  },
);

app.listen(3333, () => {
  console.log("Server is running!");
});
