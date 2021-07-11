"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
// import "express-async-errors";
// import "./database";
// import "./shared/container";
// import { router } from "./routes";
// import { AppError } from "./errors/AppError";
var app = express_1.default();
app.use(express_1.default.json());
app.get("/", function (request, response) {
    return response.json({ message: "OK" });
});
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// app.use(router);
// app.use(
//   (err: Error, request: Request, response: Response, next: NextFunction) => {
//     if (err instanceof AppError) {
//       return response.status(err.statuscode).json({
//         message: err.message,
//       });
//     }
//     return response.status(500).json({
//       status: "error",
//       message: `Internal server error = ${err.message}`,
//     });
//   },
// );
app.listen(3333, function () {
    console.log("Server is running!");
});
