import { Validator } from "./Validator";
import { IErrors } from "./Validator.type";
export declare class ValidatorForm<T extends {
    [k: string]: Validator;
}> {
    readonly fields: T;
    /**
     * Create Validator Form Group
     *
     * @param {{ [k: string]: Validator }} fields
     */
    constructor(fields: T);
    change(fieldName: keyof T, value: string): void;
    /**
     * Wheter or not form group is valid
     * @type {boolean}
     */
    get valid(): boolean;
    /**
     * Get errors by field name, or empty object if no errors
     * @type {{ [k in keyof T]?: IErrors }}
     */
    get errors(): {
        [k in keyof T]?: IErrors;
    };
    /**
     * Use this method for creating json object, can be parsed with method .parse()
     * @returns {any}
     */
    toJSON(): any;
    /**
     * Use this method for creating ValidatorForm classes from json object
     *
     * @param {Object} obj
     * @returns {ValidatorForm}
     */
    static parse(obj: any): ValidatorForm<any>;
}
