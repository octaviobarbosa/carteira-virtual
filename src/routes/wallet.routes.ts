import { Router } from "express";
import { CreateWalletController } from "../modules/wallet/useCases/createWallet/CreateWalletController";
import { GetBalanceController } from "../modules/wallet/useCases/getBalance/GetBalanceController";

const walletRoutes = Router();

const createWalletController = new CreateWalletController();
const getBalanceController = new GetBalanceController();

walletRoutes.post("/", createWalletController.handle);
walletRoutes.get("/balance/:id", getBalanceController.handle);

export { walletRoutes };
