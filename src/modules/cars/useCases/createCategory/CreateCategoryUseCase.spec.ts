CategoriesRepositoryInMemory;

import  { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemoryego();
  });

  it("hould be able to create a new category", () => {
    const createCategory = new CreateCategoryUseCase();
  });
});


