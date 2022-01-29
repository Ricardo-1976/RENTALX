"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeormDriver = require("typeorm/driver/sqlite/SqliteDriver");
const TomgUtils = require("../Utils");
const AbstractDriver_1 = require("./AbstractDriver");
class SqliteDriver extends AbstractDriver_1.default {
    constructor() {
        super();
        this.defaultValues = new TypeormDriver.SqliteDriver({
            options: { database: "true" },
        }).dataTypeDefaults;
        this.standardPort = 0;
        this.standardUser = "";
        this.standardSchema = "";
        this.tablesWithGeneratedPrimaryKey = new Array();
        try {
            // eslint-disable-next-line import/no-extraneous-dependencies, global-require, import/no-unresolved
            this.sqliteLib = require("sqlite3");
            this.sqlite = this.sqliteLib.verbose();
        }
        catch (error) {
            TomgUtils.LogError("", false, error);
            throw error;
        }
    }
    async GetAllTables(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    schemas, 
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    dbNames) {
        const ret = [];
        // eslint-disable-next-line camelcase
        const rows = await this.ExecQuery(`SELECT tbl_name, sql FROM "sqlite_master" WHERE "type" = 'table'  AND name NOT LIKE 'sqlite_%'`);
        rows.forEach((val) => {
            if (val.sql.includes("AUTOINCREMENT")) {
                this.tablesWithGeneratedPrimaryKey.push(val.tbl_name);
            }
            ret.push({
                columns: [],
                indices: [],
                relations: [],
                relationIds: [],
                sqlName: val.tbl_name,
                tscName: val.tbl_name,
                fileName: val.tbl_name,
                fileImports: [],
            });
        });
        return ret;
    }
    async GetCoulmnsFromEntity(entities) {
        await Promise.all(entities.map(async (ent) => {
            const response = await this.ExecQuery(`PRAGMA table_info('${ent.tscName}');`);
            response.forEach((resp) => {
                const tscName = resp.name;
                let tscType = "";
                const options = { name: resp.name };
                if (resp.notnull === 0)
                    options.nullable = true;
                const isPrimary = resp.pk > 0 ? true : undefined;
                const defaultValue = SqliteDriver.ReturnDefaultValueFunction(resp.dflt_value);
                const columnType = resp.type
                    .replace(/\([0-9 ,]+\)/g, "")
                    .toLowerCase()
                    .trim();
                const generated = isPrimary &&
                    this.tablesWithGeneratedPrimaryKey.includes(ent.tscName)
                    ? true
                    : undefined;
                switch (columnType) {
                    case "int":
                        tscType = "number";
                        break;
                    case "integer":
                        tscType = "number";
                        break;
                    case "int2":
                        tscType = "number";
                        break;
                    case "int8":
                        tscType = "number";
                        break;
                    case "tinyint":
                        tscType = "number";
                        break;
                    case "smallint":
                        tscType = "number";
                        break;
                    case "mediumint":
                        tscType = "number";
                        break;
                    case "bigint":
                        tscType = "string";
                        break;
                    case "unsigned big int":
                        tscType = "string";
                        break;
                    case "character":
                        tscType = "string";
                        break;
                    case "varchar":
                        tscType = "string";
                        break;
                    case "varying character":
                        tscType = "string";
                        break;
                    case "nchar":
                        tscType = "string";
                        break;
                    case "native character":
                        tscType = "string";
                        break;
                    case "nvarchar":
                        tscType = "string";
                        break;
                    case "text":
                        tscType = "string";
                        break;
                    case "blob":
                        tscType = "Buffer";
                        break;
                    case "clob":
                        tscType = "string";
                        break;
                    case "real":
                        tscType = "number";
                        break;
                    case "double":
                        tscType = "number";
                        break;
                    case "double precision":
                        tscType = "number";
                        break;
                    case "float":
                        tscType = "number";
                        break;
                    case "numeric":
                        tscType = "number";
                        break;
                    case "decimal":
                        tscType = "number";
                        break;
                    case "boolean":
                        tscType = "boolean";
                        break;
                    case "date":
                        tscType = "string";
                        break;
                    case "datetime":
                        tscType = "Date";
                        break;
                    default:
                        tscType = "NonNullable<unknown>";
                        TomgUtils.LogError(`Unknown column type: ${columnType}  table name: ${ent.tscName} column name: ${resp.name}`);
                        break;
                }
                const sqlOptions = resp.type.match(/\([0-9 ,]+\)/g);
                if (this.ColumnTypesWithPrecision.some((v) => v === columnType) &&
                    sqlOptions) {
                    options.precision = Number.parseInt(sqlOptions[0]
                        .substring(1, sqlOptions[0].length - 1)
                        .split(",")[0], 10);
                    options.scale = Number.parseInt(sqlOptions[0]
                        .substring(1, sqlOptions[0].length - 1)
                        .split(",")[1], 10);
                }
                if (this.ColumnTypesWithLength.some((v) => v === columnType) &&
                    sqlOptions) {
                    options.length = Number.parseInt(sqlOptions[0].substring(1, sqlOptions[0].length - 1), 10);
                }
                if (this.ColumnTypesWithWidth.some((v) => v === columnType && tscType !== "boolean") &&
                    sqlOptions) {
                    options.width = Number.parseInt(sqlOptions[0].substring(1, sqlOptions[0].length - 1), 10);
                }
                ent.columns.push({
                    generated,
                    primary: isPrimary,
                    type: columnType,
                    default: defaultValue,
                    options,
                    tscName,
                    tscType,
                });
            });
        }));
        return entities;
    }
    async GetIndexesFromEntity(entities) {
        await Promise.all(entities.map(async (ent) => {
            const response = await this.ExecQuery(`PRAGMA index_list('${ent.tscName}');`);
            await Promise.all(response.map(async (resp) => {
                const indexColumnsResponse = await this.ExecQuery(`PRAGMA index_info('${resp.name}');`);
                const indexInfo = {
                    name: resp.name,
                    columns: [],
                    options: {},
                };
                if (resp.unique === 1)
                    indexInfo.options.unique = true;
                indexColumnsResponse.forEach((record) => {
                    indexInfo.columns.push(record.name);
                });
                if (indexColumnsResponse.length === 1 &&
                    indexInfo.options.unique) {
                    ent.columns
                        .filter((v) => v.tscName === indexInfo.columns[0])
                        .forEach((v) => {
                        // eslint-disable-next-line no-param-reassign
                        v.options.unique = true;
                    });
                }
                ent.indices.push(indexInfo);
            }));
        }));
        return entities;
    }
    async GetRelations(entities, schemas, dbNames, generationOptions) {
        let retVal = entities;
        await Promise.all(retVal.map(async (entity) => {
            const response = await this.ExecQuery(`PRAGMA foreign_key_list('${entity.tscName}');`);
            const relationsTemp = [];
            const relationKeys = new Set(response.map((v) => v.id));
            relationKeys.forEach((relationId) => {
                const rows = response.filter((v) => v.id === relationId);
                const ownerTable = entities.find((v) => v.sqlName === entity.tscName);
                const relatedTable = entities.find((v) => v.sqlName === rows[0].table);
                if (!ownerTable || !relatedTable) {
                    TomgUtils.LogError(`Relation between tables ${entity.tscName} and ${rows[0].table} wasn't found in entity model.`, true);
                    return;
                }
                const internal = {
                    ownerColumns: [],
                    relatedColumns: [],
                    ownerTable,
                    relatedTable,
                };
                if (rows[0].on_delete !== "NO ACTION") {
                    internal.onDelete = rows[0].on_delete;
                }
                if (rows[0].on_update !== "NO ACTION") {
                    internal.onUpdate = rows[0].on_update;
                }
                rows.forEach((row) => {
                    internal.ownerColumns.push(row.from);
                    internal.relatedColumns.push(row.to);
                });
                relationsTemp.push(internal);
            });
            retVal = SqliteDriver.GetRelationsFromRelationTempInfo(relationsTemp, retVal, generationOptions);
        }));
        return retVal;
    }
    async DisconnectFromServer() {
        this.db.close();
    }
    async ConnectToServer(connectionOptons) {
        const promise = new Promise((resolve, reject) => {
            this.db = new this.sqlite.Database(connectionOptons.databaseNames[0], (err) => {
                if (err) {
                    TomgUtils.LogError("Error connecting to SQLite database.", false, err.message);
                    reject(err);
                    return;
                }
                resolve();
            });
        });
        return promise;
    }
    // eslint-disable-next-line class-methods-use-this
    async CreateDB() {
        // not supported
    }
    // eslint-disable-next-line class-methods-use-this
    async DropDB() {
        // not supported
    }
    // eslint-disable-next-line class-methods-use-this
    async CheckIfDBExists() {
        return true;
    }
    async ExecQuery(sql) {
        let ret = [];
        const promise = new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(sql, [], (err, row) => {
                    if (!err) {
                        ret = row;
                        resolve(true);
                    }
                    else {
                        TomgUtils.LogError("Error executing query on SQLite.", false, err.message);
                        reject(err);
                    }
                });
            });
        });
        await promise;
        return ret;
    }
    static ReturnDefaultValueFunction(defVal) {
        if (!defVal) {
            return undefined;
        }
        return `() => "${defVal}"`;
    }
}
exports.default = SqliteDriver;
//# sourceMappingURL=SqliteDriver.js.map