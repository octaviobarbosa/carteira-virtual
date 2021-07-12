import { Router } from "express";
import { CreateTransactionController } from "../modules/transactions/useCases/createTransaction/CreateTransactionController";
import { GetBalanceController } from "../modules/transactions/useCases/getBalance/GetBalanceController";

const transactionsRoutes = Router();

const createTransactionController = new CreateTransactionController();
const getBalanceController = new GetBalanceController();

transactionsRoutes.post("/", createTransactionController.handle);
transactionsRoutes.get("/balance/:id", getBalanceController.handle);

export { transactionsRoutes };
