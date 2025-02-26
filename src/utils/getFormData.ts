import { Block } from "../core/Block.ts";

export const getFormData = (form: Block, excludeFields: string[] = []) => {
  const formElement = form.getElement();

  if (!formElement) {
    return;
  }

  const inputs = [...formElement.querySelectorAll("input")];

  return inputs.reduce((acc: Record<string, string>, input) => {
    if (!excludeFields.includes(input.name)) {
      acc[input.name] = input.value;
    }
    return acc;
  }, {});
};
