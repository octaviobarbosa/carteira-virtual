import { Router } from "express";
import { userRoutes } from "./user.routes";
import { walletRoutes } from "./wallet.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/wallet", walletRoutes);

export { router };
