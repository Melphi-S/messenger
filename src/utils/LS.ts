export enum LSKeys {
  LAST_CHAT = "last-chat",
}

export const saveToLS = (key: LSKeys, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLS = (key: LSKeys) => {
  return localStorage.getItem(key);
};
