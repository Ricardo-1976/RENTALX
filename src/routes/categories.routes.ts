import { request, Router } from "express";

import { Category } from "../modules/cars/model/Category";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// Create category
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

// List Category
categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };
