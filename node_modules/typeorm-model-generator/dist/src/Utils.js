"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertUnreachable = exports.requireLocalFile = exports.findNameForNewField = exports.packageVersion = exports.LogError = void 0;
const changeCase = require("change-case");
const path = require("path");
const packagejson = require("../package.json");
function LogError(errText, isABug = true, passedError) {
    let errObject = passedError;
    console.error(errText);
    console.error(`Error occurred in typeorm-model-generator.`);
    console.error(`${packageVersion()}  node@${process.version}`);
    console.error(`If you think this is a bug please open an issue including this log on ${packagejson.bugs.url}`);
    if (isABug && !passedError) {
        errObject = new Error().stack;
    }
    if (errObject) {
        console.error(errObject);
    }
}
exports.LogError = LogError;
function packageVersion() {
    return `${packagejson.name}@${packagejson.version}`;
}
exports.packageVersion = packageVersion;
function findNameForNewField(_fieldName, entity, columnOldName = "") {
    let fieldName = _fieldName;
    const validNameCondition = () => (entity.columns.every((v) => changeCase.camelCase(v.tscName) !==
        changeCase.camelCase(fieldName)) &&
        entity.relations.every((v) => changeCase.camelCase(v.fieldName) !==
            changeCase.camelCase(fieldName)) &&
        entity.relationIds.every((v) => changeCase.camelCase(v.fieldName) !==
            changeCase.camelCase(fieldName))) ||
        (columnOldName &&
            changeCase.camelCase(columnOldName) ===
                changeCase.camelCase(fieldName));
    if (!validNameCondition()) {
        fieldName += "_";
        for (let i = 2; i <= entity.columns.length + entity.relations.length; i++) {
            fieldName =
                fieldName.substring(0, fieldName.length - i.toString().length) +
                    i.toString();
            if (validNameCondition()) {
                break;
            }
        }
    }
    return fieldName;
}
exports.findNameForNewField = findNameForNewField;
function requireLocalFile(fileName) {
    try {
        // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
        return require(fileName);
    }
    catch (err) {
        if (!path.isAbsolute(fileName)) {
            // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
            return require(path.resolve(process.cwd(), fileName));
        }
        throw err;
    }
}
exports.requireLocalFile = requireLocalFile;
function assertUnreachable(x) {
    throw new Error("Didn't expect to get here");
}
exports.assertUnreachable = assertUnreachable;
//# sourceMappingURL=Utils.js.map