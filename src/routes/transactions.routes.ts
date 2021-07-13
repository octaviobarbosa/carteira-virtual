import { Router } from "express";
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/CreateTransactionController";
import { ListTransactionLogController } from "../modules/transactions/useCases/listTransactionLog/ListTransactionLogController";
import { GetBalanceController } from "../modules/transactions/useCases/getBalance/GetBalanceController";
import { ExportTransactionLogController } from "../modules/transactions/useCases/exportTransactionLog/ExportTransactionLogController";

const transactionsRoutes = Router();

const createTransactionController = new CreateTransactionController();
const getBalanceController = new GetBalanceController();
const listTransactionLogController = new ListTransactionLogController();
const exportTransactionLogController = new ExportTransactionLogController();

transactionsRoutes.post("/", createTransactionController.handle);
transactionsRoutes.get("/balance/:id", getBalanceController.handle);

transactionsRoutes.get("/logs/", listTransactionLogController.handle);
transactionsRoutes.get("/logs/csv", exportTransactionLogController.handle);

export { transactionsRoutes };
