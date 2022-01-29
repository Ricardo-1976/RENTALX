"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileName = exports.columnName = exports.entityName = exports.relationName = exports.relationIdName = exports.enablePluralization = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const pluralize_1 = require("pluralize");
let pluralize;
function enablePluralization(value) {
    pluralize = value;
}
exports.enablePluralization = enablePluralization;
function relationIdName(relationId, relation, owner) {
    const columnOldName = relationId.fieldName;
    const isRelationToMany = relation.relationType === "OneToMany" ||
        relation.relationType === "ManyToMany";
    let newColumnName = columnOldName.replace(/[0-9]$/, "");
    if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
        newColumnName = newColumnName.substring(0, newColumnName.length - 1);
    }
    if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
        newColumnName = newColumnName.substring(0, newColumnName.length - 1);
    }
    if (isRelationToMany && pluralize) {
        newColumnName = (0, pluralize_1.plural)(newColumnName);
    }
    return newColumnName;
}
exports.relationIdName = relationIdName;
function relationName(relation, owner) {
    const columnOldName = relation.fieldName;
    const isRelationToMany = relation.relationType === "OneToMany" ||
        relation.relationType === "ManyToMany";
    let newColumnName = columnOldName.replace(/[0-9]$/, "");
    if (newColumnName.toLowerCase().endsWith("id") &&
        !newColumnName.toLowerCase().endsWith("guid")) {
        newColumnName = newColumnName.substring(0, newColumnName.toLowerCase().lastIndexOf("id"));
    }
    if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
        newColumnName = newColumnName.substring(0, newColumnName.length - 1);
    }
    if (!Number.isNaN(parseInt(newColumnName[newColumnName.length - 1], 10))) {
        newColumnName = newColumnName.substring(0, newColumnName.length - 1);
    }
    if (isRelationToMany && pluralize) {
        newColumnName = (0, pluralize_1.plural)(newColumnName);
    }
    return newColumnName;
}
exports.relationName = relationName;
function entityName(oldEntityName, entity) {
    return oldEntityName;
}
exports.entityName = entityName;
function columnName(oldColumnName, column) {
    return oldColumnName;
}
exports.columnName = columnName;
function fileName(oldFileName) {
    return oldFileName;
}
exports.fileName = fileName;
//# sourceMappingURL=NamingStrategy.js.map