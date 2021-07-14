import { Router } from "express";
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/CreateTransactionController";
import { ListTransactionLogController } from "../modules/transactions/useCases/listTransactionLog/ListTransactionLogController";
import { GetBalanceController } from "../modules/transactions/useCases/getBalance/GetBalanceController";
import { ExportTransactionLogController } from "../modules/transactions/useCases/exportTransactionLog/ExportTransactionLogController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { SendTransactionController } from "../modules/transactions/useCases/sendTransaction/SendTransactionController";
import { ListFriendTransactionsController } from "../modules/transactions/useCases/listFriendTransactions/ListFriendTransactionsController";
import { ListTransactionsController } from "../modules/transactions/useCases/listTransactions/ListTransactionsController";

const transactionsRoutes = Router();

const createTransactionController = new CreateTransactionController();
const getBalanceController = new GetBalanceController();
const listTransactionLogController = new ListTransactionLogController();
const exportTransactionLogController = new ExportTransactionLogController();
const sendTransactionController = new SendTransactionController();
const listFriendTransactionsController = new ListFriendTransactionsController();
const listTransactionController = new ListTransactionsController();

transactionsRoutes.get(
  "/",
  ensureAuthenticated,
  listTransactionController.handle,
);

transactionsRoutes.post(
  "/",
  ensureAuthenticated,
  createTransactionController.handle,
);

transactionsRoutes.get(
  "/friends-transactions",
  ensureAuthenticated,
  listFriendTransactionsController.handle,
);

transactionsRoutes.post(
  "/send/",
  ensureAuthenticated,
  sendTransactionController.handle,
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
