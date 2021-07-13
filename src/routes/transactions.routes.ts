import { Router } from "express";
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/CreateTransactionController";
import { ListTransactionLogController } from "../modules/transactions/useCases/listTransactionLog/ListTransactionLogController";
import { GetBalanceController } from "../modules/transactions/useCases/getBalance/GetBalanceController";
import { ExportTransactionLogController } from "../modules/transactions/useCases/exportTransactionLog/ExportTransactionLogController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const transactionsRoutes = Router();

const createTransactionController = new CreateTransactionController();
const getBalanceController = new GetBalanceController();
const listTransactionLogController = new ListTransactionLogController();
const exportTransactionLogController = new ExportTransactionLogController();

transactionsRoutes.post(
  "/",
  ensureAuthenticated,
  createTransactionController.handle,
);
transactionsRoutes.get(
  "/balance/",
  ensureAuthenticated,
  getBalanceController.handle,
);

transactionsRoutes.get(
  "/logs/",
  ensureAuthenticated,
  listTransactionLogController.handle,
);
transactionsRoutes.get(
  "/logs/csv",
  ensureAuthenticated,
  exportTransactionLogController.handle,
);

export { transactionsRoutes };
