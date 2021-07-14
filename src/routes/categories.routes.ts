import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCategoryController } from "../modules/categories/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../modules/categories/useCases/listCategories/ListCategoriesController";
import { UpdateCategoryController } from "../modules/categories/useCases/updateCategory/UpdateCategoryController";
import { DeleteCategoryController } from "../modules/categories/useCases/deleteCategory/DeleteCategoryController";
import { GetCategoryController } from "../modules/categories/useCases/getCategory/GetCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const getCategoryController = new GetCategoryController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  createCategoryController.handle,
);

categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);
categoriesRoutes.get("/:id", ensureAuthenticated, getCategoryController.handle);
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
