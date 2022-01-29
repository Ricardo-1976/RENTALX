import { Entity } from "./models/Entity";
export declare function LogError(errText: string, isABug?: boolean, passedError?: string | ErrorConstructor): void;
export declare function packageVersion(): string;
export declare function findNameForNewField(_fieldName: string, entity: Entity, columnOldName?: string): string;
export declare function requireLocalFile(fileName: string): any;
export declare function assertUnreachable(x: never): never;
