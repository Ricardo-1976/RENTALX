"use strict";
// TODO: change name
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultConnectionOptions = void 0;
function getDefaultConnectionOptions() {
    const connectionOptions = {
        host: "127.0.0.1",
        port: 0,
        databaseNames: [""],
        user: "",
        password: "",
        databaseType: undefined,
        schemaNames: [""],
        instanceName: undefined,
        ssl: false,
        skipTables: [],
        onlyTables: [],
    };
    return connectionOptions;
}
exports.getDefaultConnectionOptions = getDefaultConnectionOptions;
//# sourceMappingURL=IConnectionOptions.js.map