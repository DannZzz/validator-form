export type ValidationOption = IMaxLength | IMinLength | IRequired | IEmail | IPassword | IUrl | IHexColor;
export interface IMaxLength {
    type: "maxLength";
    length: number;
}
export interface IMinLength {
    type: "minLength";
    length: number;
}
export interface IRequired {
    type: "required";
}
export interface IEmail {
    type: "email";
}
export interface IPassword {
    type: "password";
    minLength: number;
    maxLength?: number;
    bothCases?: boolean;
    numbers?: boolean;
    symbols?: boolean;
}
export interface IUrl {
    type: "url";
}
export interface IHexColor {
    type: "hexColor";
}
export interface IErrors {
    minLength?: {
        currentLength: number;
        allowedLength: number;
    };
    maxLength?: {
        currentLength: number;
        allowedLength: number;
    };
    email?: boolean;
    password?: {
        minLength?: {
            currentLength: number;
            allowedLength: number;
        };
        maxLength?: {
            currentLength: number;
            allowedLength: number;
        };
        bothCases?: boolean;
        numbers?: boolean;
        symbols?: boolean;
    };
    required?: boolean;
    hexColor?: boolean;
    url?: boolean;
}
