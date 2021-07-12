import { Router } from "express";
import { userRoutes } from "./user.routes";
import { walletRoutes } from "./wallet.routes";
import { categoryRoutes } from "./category.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/wallet", walletRoutes);
router.use("/category", categoryRoutes);

export { router };
