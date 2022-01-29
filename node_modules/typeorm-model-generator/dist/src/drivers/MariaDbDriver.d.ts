import MysqlDriver from "./MysqlDriver";
export default class MariaDbDriver extends MysqlDriver {
    readonly EngineName: string;
}
