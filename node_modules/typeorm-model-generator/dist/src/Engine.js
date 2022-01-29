"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataCollectionPhase = exports.createModelFromDatabase = exports.createDriver = void 0;
const TomgUtils = require("./Utils");
const MssqlDriver_1 = require("./drivers/MssqlDriver");
const MariaDbDriver_1 = require("./drivers/MariaDbDriver");
const PostgresDriver_1 = require("./drivers/PostgresDriver");
const MysqlDriver_1 = require("./drivers/MysqlDriver");
const OracleDriver_1 = require("./drivers/OracleDriver");
const SqliteDriver_1 = require("./drivers/SqliteDriver");
const ModelCustomization_1 = require("./ModelCustomization");
const ModelGeneration_1 = require("./ModelGeneration");
function createDriver(driverName) {
    switch (driverName) {
        case "mssql":
            return new MssqlDriver_1.default();
        case "postgres":
            return new PostgresDriver_1.default();
        case "mysql":
            return new MysqlDriver_1.default();
        case "mariadb":
            return new MariaDbDriver_1.default();
        case "oracle":
            return new OracleDriver_1.default();
        case "sqlite":
            return new SqliteDriver_1.default();
        default:
            TomgUtils.LogError("Database engine not recognized.", false);
            throw new Error("Database engine not recognized.");
    }
}
exports.createDriver = createDriver;
async function createModelFromDatabase(driver, connectionOptions, generationOptions) {
    let dbModel = await dataCollectionPhase(driver, connectionOptions, generationOptions);
    if (dbModel.length === 0) {
        TomgUtils.LogError("Tables not found in selected database. Skipping creation of typeorm model.", false);
        return;
    }
    dbModel = (0, ModelCustomization_1.default)(dbModel, generationOptions, driver.defaultValues);
    (0, ModelGeneration_1.default)(connectionOptions, generationOptions, dbModel);
}
exports.createModelFromDatabase = createModelFromDatabase;
async function dataCollectionPhase(driver, connectionOptions, generationOptions) {
    return driver.GetDataFromServer(connectionOptions, generationOptions);
}
exports.dataCollectionPhase = dataCollectionPhase;
//# sourceMappingURL=Engine.js.map