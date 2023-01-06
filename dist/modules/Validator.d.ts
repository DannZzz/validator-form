import { IEmail, IErrors, IHexColor, IMaxLength, IMinLength, IPassword, IPattern, IRequired, IUrl, ValidationOption } from "./Validator.type";
export declare class Validator {
    readonly defaultValue: string;
    private options;
    private _value;
    /**
     *
     * @param {string} defaultValue
     * @param {ValidationOption[]} options
     */
    constructor(defaultValue: string, options?: ValidationOption[]);
    /**
     * @returns {string} current value
     */
    toString(): string;
    /**
     * @type {boolean} wheter the current value is correct or not
     */
    get valid(): boolean;
    /**
     * Current value
     */
    get currentValue(): string;
    /**
     * changes current value
     * @param {string} newValue
     */
    change(newValue: string): void;
    /**
     * error's object, empty object if there are no errors
     * @type {IErrors}
     */
    get errors(): IErrors;
    /**
     * use this method for sending validation data from frotend
     * @returns {Object} json object
     */
    toJSON(): any;
    /**
     * use this method for creating validator class from json object
     *
     * @param {Object} obj json object, validator.toJson()
     * @returns {Validator}
     */
    static parse(obj: any): Validator;
    /**
     * set max length
     *
     * @param {number} length
     */
    static maxLength(length: number): IMaxLength;
    /**
     * set min length
     *
     * @param {number} length
     */
    static minLength(length: number): IMinLength;
    /**
     * Wheter or not value is required
     *
     * NOTE: if validator is not required, empty value won't return errors
     */
    static get required(): IRequired;
    /**
     * Wheter or not value must be an email
     */
    static get email(): IEmail;
    /**
     * Wheter or not value is a password
     *
     * @param {number} minLength set password's min length
     * @param {Omit<IPassword, "type" | "minLength">} other other options
     */
    static password(minLength: number, other?: Omit<IPassword, "type" | "minLength">): IPassword;
    /**
     * Wheter or not value is an url
     */
    static get url(): IUrl;
    /**
     * Wheter or not value is a hex color code (# is optional)
     */
    static get hexColor(): IHexColor;
    /**
     * Custom pattern rule
     *
     * @param {RegExp} regexp pattern to check with
     */
    static pattern(regexp: RegExp): IPattern;
}
