import { request, Router } from "express";
import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// Create category
categoriesRoutes.post("/", (request, response) => {
  const {name, description} = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if(categoryAlreadyExists) {
    return response.status(400).json({ error: "Category Already Exist!" })
  }

  categoriesRepository.create({ name,  description });

  return response.status(201).send();

});

// List Category
categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

export { categoriesRoutes };
