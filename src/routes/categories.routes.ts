import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

// Create category
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

// List Category
categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

// Import file SVC
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
