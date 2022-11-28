"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorForm = void 0;
const Validator_1 = require("./Validator");
class ValidatorForm {
    /**
     * Create Validator Form Group
     *
     * @param {{ [k: string]: Validator }} fields
     */
    constructor(fields) {
        this.fields = fields;
    }
    change(fieldName, value) {
        this.fields[fieldName].change(value);
    }
    /**
     * Wheter or not form group is valid
     * @type {boolean}
     */
    get valid() {
        for (let fieldName in this.fields) {
            const validator = this.fields[fieldName];
            if (Object.keys(validator.errors).length)
                return false;
        }
        return true;
    }
    /**
     * Get errors by field name, or empty object if no errors
     * @type {{ [k in keyof T]?: IErrors }}
     */
    get errors() {
        const errors = {};
        for (let fieldName in this.fields) {
            const validator = this.fields[fieldName];
            if (Object.keys(validator.errors).length)
                errors[fieldName] = validator.errors;
        }
        return errors;
    }
    /**
     * Use this method for creating json object, can be parsed with method .parse()
     * @returns {any}
     */
    toJSON() {
        const obj = { type: "ValidatorForm", fields: {} };
        for (let fieldName in this.fields) {
            const validator = this.fields[fieldName];
            obj.fields[fieldName] = validator.toJSON();
        }
        return JSON.parse(JSON.stringify(obj));
    }
    /**
     * Use this method for creating ValidatorForm classes from json object
     *
     * @param {Object} obj
     * @returns {ValidatorForm}
     */
    static parse(obj) {
        if (typeof obj === "string")
            obj = JSON.parse(obj);
        if ((obj === null || obj === void 0 ? void 0 : obj.type) !== "ValidatorForm")
            throw new Error("Can't parse object to ValidatorForm");
        const fields = {};
        for (let fieldName in (obj === null || obj === void 0 ? void 0 : obj.fields) || {}) {
            fields[fieldName] = Validator_1.Validator.parse(((obj === null || obj === void 0 ? void 0 : obj.fields) || {})[fieldName]);
        }
        return new ValidatorForm(fields);
    }
}
exports.ValidatorForm = ValidatorForm;
