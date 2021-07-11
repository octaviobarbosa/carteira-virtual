import { Router } from "express";
import { testRoutes } from "./test.routes";
// import { categoriesRoutes } from "./categories.routes";
// import { specificationsRoutes } from "./specification.routes";
// import { usersRoutes } from "./users.routes";
// import { authenticateRoutes } from "./authenticade.routes";

const router = Router();

router.use("/test", testRoutes);
// router.use("/categories", categoriesRoutes);
// router.use("/specifications", specificationsRoutes);
// router.use("/users", usersRoutes);
// router.use(authenticateRoutes);

export { router };
