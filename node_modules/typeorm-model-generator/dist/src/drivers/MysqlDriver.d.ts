import { DataTypeDefaults } from "typeorm/driver/types/DataTypeDefaults";
import AbstractDriver from "./AbstractDriver";
import IConnectionOptions from "../IConnectionOptions";
import { Entity } from "../models/Entity";
import IGenerationOptions from "../IGenerationOptions";
export default class MysqlDriver extends AbstractDriver {
    defaultValues: DataTypeDefaults;
    readonly EngineName: string;
    readonly standardPort = 3306;
    readonly standardUser = "root";
    readonly standardSchema = "";
    private MYSQL;
    private Connection;
    constructor();
    GetAllTables(schemas: string[], dbNames: string[]): Promise<Entity[]>;
    GetCoulmnsFromEntity(entities: Entity[], schemas: string[], dbNames: string[]): Promise<Entity[]>;
    GetIndexesFromEntity(entities: Entity[], schemas: string[], dbNames: string[]): Promise<Entity[]>;
    GetRelations(entities: Entity[], schemas: string[], dbNames: string[], generationOptions: IGenerationOptions): Promise<Entity[]>;
    DisconnectFromServer(): Promise<void>;
    ConnectToServer(connectionOptons: IConnectionOptions): Promise<void>;
    CreateDB(dbName: string): Promise<void>;
    UseDB(dbName: string): Promise<void>;
    DropDB(dbName: string): Promise<void>;
    CheckIfDBExists(dbName: string): Promise<boolean>;
    ExecQuery<T>(sql: string): Promise<T[]>;
    private static ReturnDefaultValueFunction;
}
