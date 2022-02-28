import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationContraller";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationContraller = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/",ensureAuthenticated, ensureAdmin, createSpecificationContraller.handle);

export { specificationsRoutes };
