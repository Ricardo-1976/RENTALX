import { response, Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationContraller";

const specificationsRoutes = Router();

const createSpecificationContraller = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationContraller.handle);

export { specificationsRoutes };
