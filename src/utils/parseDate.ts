export const dateToChatView = (date?: Date) => {
  if (!date) {
    return null;
  }

  return `${String(date.getHours()).padStart(0, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};
