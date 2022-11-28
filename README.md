# Tool for creating text validation forms and use in both sides (frotend, backend)

### Use this package in react with [@onlydann/react-validator](https://www.npmjs.com/package/@onlydann/react-validator), and in react native with [@onlydann/native-validator](https://www.npmjs.com/package/@onlydann/native-validator)

## Install

```shell
npm install @onlydann/validator-form
```

### Or

```shell
yarn add @onlydann/validator-form
```

## Usage

```js
import { ValidatorForm, Validator } from "react-validator-form";

const form = new ValidatorForm({
  name: new Validator("", [Validator.minLength(4), Validator.maxLength(16)]),

  password: new Validator("", [
    Validator.password(8, { maxLength: 10, bothCases: true }),
    Validator.required,
  ]),
});
```

## Change values and get errors

```js
form.fields.password.change("1234asd");
// or
form.change("password", "1234asd");

// errors
if (!form.valid) {
  if (form.errors?.password?.required) {
    console.log("Password is required");
  }

  if (form.errors?.name?.minLength) {
    console.log(
      `Name's minimum length is ${form.errors.name.minLength.allowedLength}, current length is ${form.errors.name.minLength.currentLength}.`
    );
  }
}
```

## Sending and getting forms

```js
// Client Side
const json = form.toJSON();

anyFetch("api/loging", { body: json });

// Server Side
const newForm = ValidatorForm.parse(req.body);
if (newForm.valid) {
  return res.json({ msg: "Form is valid" });
} else {
  return res.json({ msg: "Invalid form" });
}
```
