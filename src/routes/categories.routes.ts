import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCategoryController } from "../modules/categories/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../modules/categories/useCases/listCategories/ListCategoriesController";
import { UpdateCategoryController } from "../modules/categories/useCases/updateCategory/UpdateCategoryController";
import { DeleteCategoryController } from "../modules/categories/useCases/deleteCategory/DeleteCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  createCategoryController.handle,
);

categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);
categoriesRoutes.put(
  "/:id",
  ensureAuthenticated,
  updateCategoryController.handle,
);
categoriesRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteCategoryController.handle,
);

export { categoriesRoutes };
