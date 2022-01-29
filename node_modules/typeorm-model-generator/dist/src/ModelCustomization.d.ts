import { DataTypeDefaults } from "typeorm/driver/types/DataTypeDefaults";
import { Entity } from "./models/Entity";
import IGenerationOptions from "./IGenerationOptions";
export default function modelCustomizationPhase(dbModel: Entity[], generationOptions: IGenerationOptions, defaultValues: DataTypeDefaults): Entity[];
