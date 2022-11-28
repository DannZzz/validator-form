import {
  IEmail,
  IErrors,
  IHexColor,
  IMaxLength,
  IMinLength,
  IPassword,
  IRequired,
  IUrl,
  ValidationOption,
} from "./Validator.type";

export class Validator {
  private options: ValidationOption[];
  private _value: string;

  /**
   *
   * @param {string} defaultValue
   * @param {ValidationOption[]} options
   */
  constructor(readonly defaultValue: string, options: ValidationOption[] = []) {
    Object.defineProperty(this, "options", {
      value: options,
      enumerable: false,
      configurable: false,
    });

    Object.defineProperty(this, "_value", {
      value: defaultValue,
      enumerable: false,
      writable: true,
    });
  }

  /**
   * @returns {string} current value
   */
  toString(): string {
    return this._value;
  }

  /**
   * @type {boolean} wheter the current value is correct or not
   */
  get valid(): boolean {
    return !Object.keys(this.errors).length;
  }

  /**
   * Current value
   */
  get currentValue() {
    return this._value;
  }

  /**
   * changes current value
   * @param {string} newValue
   */
  change(newValue: string) {
    this._value = newValue;
  }

  /**
   * error's object, empty object if there are no errors
   * @type {IErrors}
   */
  get errors() {
    const value = this.currentValue;
    const errors: IErrors = {};

    this.options.forEach((option) => {
      switch (option.type) {
        case "minLength":
          if (option.length > value.length) {
            errors[option.type] = {
              currentLength: value.length,
              allowedLength: option.length,
            };
          }
          break;

        case "maxLength":
          if (option.length < value.length) {
            errors[option.type] = {
              currentLength: value.length,
              allowedLength: option.length,
            };
          }
          break;

        case "email":
          if (
            !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
              value
            )
          ) {
            errors[option.type] = true;
          }
          break;

        case "password": {
          const passErrors: IErrors["password"] = {};

          if (option.minLength > value.length) {
            passErrors.minLength = {
              allowedLength: option.minLength,
              currentLength: value.length,
            };
          }
          if (!isNaN(option.maxLength) && option.maxLength < value.length) {
            passErrors.maxLength = {
              allowedLength: option.maxLength,
              currentLength: value.length,
            };
          }
          if (option.bothCases && !/([A-Z].*[a-z]|[a-z].*[A-Z])/g.test(value)) {
            passErrors.bothCases = true;
          }
          if (option.numbers && !/(?=.*\d)/g.test(value)) {
            passErrors.numbers = true;
          }
          if (option.symbols && !/(?=(.*[@#$%.<>?!]))/g.test(value)) {
            passErrors.symbols = true;
          }
          Object.keys(passErrors).length && (errors[option.type] = passErrors);
          break;
        }

        case "required":
          if (!value?.trim()) {
            errors[option.type] = true;
          }
          break;

        case "url":
          if (
            !/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(
              value
            )
          ) {
            errors[option.type] = true;
          }
          break;

        case "hexColor":
          if (!/^#?([0-9a-f]{3}){1,2}$/i.test(value)) {
            errors[option.type] = true;
          }
          break;

        default:
          break;
      }
    });

    return !errors.required && !this.currentValue?.trim?.() ? {} : errors;
  }

  /**
   * use this method for sending validation data from frotend
   * @returns {Object} json object
   */
  toJSON(): any {
    return JSON.parse(
      JSON.stringify({
        currentValue: this.currentValue,
        defaultValue: this.defaultValue,
        options: this.options,
        type: "Validator",
      })
    );
  }

  /**
   * use this method for creating validator class from json object
   *
   * @param {Object} obj json object, validator.toJson()
   * @returns {Validator}
   */
  static parse(obj: any): Validator {
    if (typeof obj === "string") obj = JSON.parse(obj);
    if (obj?.type !== "Validator")
      throw new Error("Can't parse object to Validator");
    const _ = new Validator(obj.defaultValue, obj.options);
    _.change(obj.currentValue);
    return _;
  }

  /**
   * set max length
   *
   * @param {number} length
   */
  static maxLength(length: number): IMaxLength {
    return {
      length,
      type: "maxLength",
    };
  }

  /**
   * set min length
   *
   * @param {number} length
   */
  static minLength(length: number): IMinLength {
    return {
      length,
      type: "minLength",
    };
  }

  /**
   * Wheter or not value is required
   *
   * NOTE: if validator is not required, empty value won't return errors
   */
  static get required(): IRequired {
    return {
      type: "required",
    };
  }

  /**
   * Wheter or not value must be an email
   */
  static get email(): IEmail {
    return {
      type: "email",
    };
  }

  /**
   * Wheter or not value is a password
   *
   * @param {number} minLength set password's min length
   * @param {Omit<IPassword, "type" | "minLength">} other other options
   */
  static password(
    minLength: number,
    other: Omit<IPassword, "type" | "minLength"> = {}
  ): IPassword {
    return {
      type: "password",
      minLength,
      maxLength: other?.maxLength,
      bothCases:
        typeof other?.bothCases !== "undefined" ? other.bothCases : true,
      numbers: typeof other?.numbers !== "undefined" ? other.numbers : true,
      symbols: typeof other?.symbols !== "undefined" ? other.symbols : true,
    };
  }

  /**
   * Wheter or not value is an url
   */
  static get url(): IUrl {
    return {
      type: "url",
    };
  }

  /**
   * Wheter or not value is a hex color code (# is optional)
   */
  static get hexColor(): IHexColor {
    return {
      type: "hexColor",
    };
  }
}
