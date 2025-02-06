import { Block } from "../core/Block.ts";

export type ValidationRuleKey =
  | "name"
  | "login"
  | "email"
  | "password"
  | "phone"
  | "message";
type ValidationRule = { rule: RegExp; errorMessage: string };

const validationRules: Record<ValidationRuleKey, ValidationRule> = {
  name: {
    rule: /^[A-ZА-Я][a-zа-яёйË]*$/,
    errorMessage:
      "The value must start with a capital letter and not contain spaces, numbers, or symbols (except for a hyphen).",
  },
  login: {
    rule: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
    errorMessage:
      "The value must contain from 3 to 20 characters, only Latin letters, may contain numbers, but may not consist only of them, without spaces, without symbols (except for a hyphens and underscores).",
  },
  email: {
    rule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
    errorMessage:
      "The value must be in the email address format (example@mail.com).",
  },
  password: {
    rule: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()-+=<>?/.,:;{}[\]~`_|]{8,40}$/,
    errorMessage:
      "The value must contain from 8 to 40 characters, at least one uppercase letter and a number.",
  },
  phone: {
    rule: /^\+?\d{10,15}$/,
    errorMessage:
      "The value must contain from 10 to 15 characters, consist of numbers, and may start with a plus.",
  },
  message: {
    rule: /^.+$/,
    errorMessage: "The value must not be empty.",
  },
} as const;

export const validate = (value: string, rule: ValidationRuleKey) => {
  if (!validationRules[rule].rule.test(value)) {
    return validationRules[rule].errorMessage;
  }

  return "";
};

export const getByName = (element: HTMLElement | null, name: string) => {
  if (!element) return null;

  return element.querySelector(`[name=${name}]`);
};

export const validateInput = (
  form: Block,
  name: string,
  rule: ValidationRuleKey | null,
  validationCb?: (...args: unknown[]) => string,
) => {
  const inputElement = getByName(form.getElement(), name);
  const inputBlock = form
    .getLists()
    .inputs.find((input) => input.getProps().name === name);

  let validationError: string = "";

  if (inputElement && inputElement instanceof HTMLInputElement && inputBlock) {
    if (!validationCb && rule) {
      validationError = validate(inputElement.value, rule);
    } else if (validationCb) {
      validationError = validationCb();
    }
    inputBlock.changeProps({
      error: validationError,
      value: inputElement.value,
    });
  }

  return validationError;
};

export const validatePasswordMatch = (form: HTMLElement | null) => {
  const password = getByName(form, "password");
  const repeatPassword = getByName(form, "repeat_password");

  if (
    password &&
    repeatPassword &&
    password instanceof HTMLInputElement &&
    repeatPassword instanceof HTMLInputElement &&
    password.value === repeatPassword.value
  ) {
    return "";
  }

  return "Passwords don't match";
};
