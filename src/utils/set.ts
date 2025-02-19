import { Indexed } from "../types/types.ts";

function merge(left: Indexed, right: Indexed): Indexed {
  for (let p in right) {
    try {
      if (
        typeof right[p] === "object" &&
        right[p] !== null &&
        typeof left[p] === "object" &&
        left[p] !== null
      ) {
        right[p] = merge(left[p] as Indexed, right[p] as Indexed);
      } else {
        left[p] = right[p];
      }
    } catch (e) {
      right[p] = right[p];
    }
  }

  return right;
}

export const set = (
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown => {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );

  return merge(object as Indexed, result);
};
