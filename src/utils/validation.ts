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

const hasErrorsInForm = (formElement: Element) => {
  const allErrorContainers = [...formElement.querySelectorAll(".error-text")];
  return allErrorContainers.some((container) => container.textContent);
};

export const validateInput = (
  form: Block,
  name: string,
  rule: ValidationRuleKey | null,
  validationCb?: (...args: unknown[]) => string,
) => {
  const formElement = form.getElement();

  if (!formElement) return;

  const inputWrapper = formElement.querySelector(`[for=${name}]`);

  if (!inputWrapper) return;

  const inputElement = inputWrapper.querySelector("input");
  const oneLineWrapper = inputWrapper.querySelector(".one-line");
  const submitButton = formElement?.querySelector('button[type="submit"]');
  const errorContainer = inputWrapper.querySelector(".error-text");
  let validationError: string = "";

  if (inputElement && inputElement instanceof HTMLInputElement) {
    if (!validationCb && rule) {
      validationError = validate(inputElement.value, rule);
    } else if (validationCb) {
      validationError = validationCb();
    }
  }

  if (validationError) {
    !oneLineWrapper
      ? inputElement?.classList.add("input_error")
      : oneLineWrapper.classList.add("one-line_error");
    if (submitButton) {
      submitButton.classList.add("button_disabled");
    }
    if (errorContainer) {
      errorContainer.textContent = validationError;
    }
  } else {
    !oneLineWrapper
      ? inputElement?.classList.remove("input_error")
      : oneLineWrapper.classList.remove("one-line_error");

    if (errorContainer) {
      errorContainer.textContent = "";
    }

    if (submitButton && !hasErrorsInForm(formElement)) {
      submitButton.classList.remove("button_disabled");
    }
  }

  return validationError;
};

export const clearInputs = (form: Block) => {
  const formElement = form.getElement();

  if (!formElement) return;

  const inputs = [...formElement.querySelectorAll("input")];

  inputs.forEach((input) => {
    input.value = "";
  });
};

export const validatePasswordMatch = (
  form: HTMLElement | null,
  firstInputName: string,
  secondInputName: string,
) => {
  if (!form) return "";

  const password = form.querySelector(`[name=${firstInputName}]`);
  const repeatPassword = form.querySelector(`[name=${secondInputName}]`);

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
