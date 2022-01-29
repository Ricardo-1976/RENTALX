import { DataTypeDefaults } from "typeorm/driver/types/DataTypeDefaults";
import AbstractDriver from "./AbstractDriver";
import IConnectionOptions from "../IConnectionOptions";
import { Entity } from "../models/Entity";
import IGenerationOptions from "../IGenerationOptions";
export default class OracleDriver extends AbstractDriver {
    defaultValues: DataTypeDefaults;
    readonly standardPort = 1521;
    readonly standardUser = "SYS";
    readonly standardSchema = "";
    private Oracle;
    private Connection;
    constructor();
    GetAllTables(schemas: string[], dbNames: string[]): Promise<Entity[]>;
    GetCoulmnsFromEntity(entities: Entity[]): Promise<Entity[]>;
    GetIndexesFromEntity(entities: Entity[]): Promise<Entity[]>;
    GetRelations(entities: Entity[], schemas: string[], dbNames: string[], generationOptions: IGenerationOptions): Promise<Entity[]>;
    DisconnectFromServer(): Promise<void>;
    ConnectToServer(connectionOptions: IConnectionOptions): Promise<void>;
    CreateDB(dbName: string): Promise<void>;
    UseDB(): Promise<void>;
    DropDB(dbName: string): Promise<void>;
    CheckIfDBExists(dbName: string): Promise<boolean>;
    private static ReturnDefaultValueFunction;
}
