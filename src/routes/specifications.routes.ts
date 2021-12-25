import { response, Router } from "express";
import { createSpecificationContraller } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationContraller.handle(request, response);
});

export { specificationsRoutes };
