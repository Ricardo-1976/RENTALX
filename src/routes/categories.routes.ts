import { request, Router } from "express";
import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../serveses/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// Create category
categoriesRoutes.post("/", (request, response) => {
  const {name, description} = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });
  
  return response.status(201).send();

});

// List Category
categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

export { categoriesRoutes };
