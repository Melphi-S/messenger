import { Block } from "../core/Block.ts";

export const getFormData = (form: Block, excludeFields: string[] = []) => {
  const inputs = form.getLists().inputs;
  return inputs.reduce((acc, { props }) => {
    if (!excludeFields.includes(props.name)) {
      acc[props.name] = props.value;
    }
    return acc;
  }, {});
};
