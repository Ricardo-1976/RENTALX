import { CreateSpecificationController } from "./CreateSpecificationContraller";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

const specificationsRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
)

const createSpecificationContraller = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationContraller }
