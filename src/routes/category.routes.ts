import { Router } from "express";
import { CreateCategoryController } from "../modules/category/useCases/createCategory/CreateCategoryController";

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoryRoutes.post("/", createCategoryController.handle);

export { categoryRoutes };
