import { Validator } from "./Validator";
import { IErrors } from "./Validator.type";

export class ValidatorForm<T extends { [k: string]: Validator }> {
  /**
   * Create Validator Form Group
   *
   * @param {{ [k: string]: Validator }} fields
   */
  constructor(public readonly fields: T) {}

  change(fieldName: keyof T, value: string) {
    this.fields[fieldName].change(value);
  }

  /**
   * Wheter or not form group is valid
   * @type {boolean}
   */
  get valid() {
    for (let fieldName in this.fields) {
      const validator = this.fields[fieldName];
      if (Object.keys(validator.errors).length) return false;
    }
    return true;
  }

  /**
   * Get errors by field name, or empty object if no errors
   * @type {{ [k in keyof T]?: IErrors }}
   */
  get errors(): { [k in keyof T]?: IErrors } {
    const errors: { [k in keyof T]?: IErrors } = {};
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
  toJSON(): any {
    const obj: any = { type: "ValidatorForm", fields: {} };
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
  static parse(obj: any): ValidatorForm<any> {
    if (typeof obj === "string") obj = JSON.parse(obj);
    if (obj?.type !== "ValidatorForm")
      throw new Error("Can't parse object to ValidatorForm");

    const fields = {};
    for (let fieldName in obj?.fields || {}) {
      fields[fieldName] = Validator.parse((obj?.fields || {})[fieldName]);
    }
    return new ValidatorForm(fields);
  }
}
