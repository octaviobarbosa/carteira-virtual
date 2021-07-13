import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { transactionsRoutes } from "./transactions.routes";
import { categoriesRoutes } from "./categories.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/transactions", transactionsRoutes);
router.use("/categories", categoriesRoutes);
router.use(authenticateRoutes);

export { router };
