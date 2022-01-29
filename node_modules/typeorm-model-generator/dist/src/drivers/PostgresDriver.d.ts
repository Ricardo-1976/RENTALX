import { DataTypeDefaults } from "typeorm/driver/types/DataTypeDefaults";
import AbstractDriver from "./AbstractDriver";
import IConnectionOptions from "../IConnectionOptions";
import { Entity } from "../models/Entity";
import { Column } from "../models/Column";
import IGenerationOptions from "../IGenerationOptions";
export default class PostgresDriver extends AbstractDriver {
    defaultValues: DataTypeDefaults;
    readonly standardPort = 5432;
    readonly standardUser = "postgres";
    readonly standardSchema = "public";
    private PG;
    private Connection;
    constructor();
    GetAllTables(schemas: string[], dbNames: string[]): Promise<Entity[]>;
    GetCoulmnsFromEntity(entities: Entity[], schemas: string[]): Promise<Entity[]>;
    MatchColumnTypes(dataType: string, udtName: string, enumValues: string | null): {
        tsType: Column["tscType"];
        sqlType: string;
        isArray: boolean;
        enumValues: string[];
    };
    GetIndexesFromEntity(entities: Entity[], schemas: string[]): Promise<Entity[]>;
    GetRelations(entities: Entity[], schemas: string[], dbNames: string[], generationOptions: IGenerationOptions): Promise<Entity[]>;
    DisconnectFromServer(): Promise<void>;
    ConnectToServer(connectionOptons: IConnectionOptions): Promise<void>;
    CreateDB(dbName: string): Promise<void>;
    DropDB(dbName: string): Promise<void>;
    CheckIfDBExists(dbName: string): Promise<boolean>;
    private static ReturnDefaultValueFunction;
}
