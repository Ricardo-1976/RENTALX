"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlDriver_1 = require("./MysqlDriver");
class MariaDbDriver extends MysqlDriver_1.default {
    constructor() {
        super(...arguments);
        this.EngineName = "MariaDb";
    }
}
exports.default = MariaDbDriver;
//# sourceMappingURL=MariaDbDriver.js.map