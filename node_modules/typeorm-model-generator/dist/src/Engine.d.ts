import AbstractDriver from "./drivers/AbstractDriver";
import IConnectionOptions from "./IConnectionOptions";
import IGenerationOptions from "./IGenerationOptions";
import { Entity } from "./models/Entity";
export declare function createDriver(driverName: string): AbstractDriver;
export declare function createModelFromDatabase(driver: AbstractDriver, connectionOptions: IConnectionOptions, generationOptions: IGenerationOptions): Promise<void>;
export declare function dataCollectionPhase(driver: AbstractDriver, connectionOptions: IConnectionOptions, generationOptions: IGenerationOptions): Promise<Entity[]>;
