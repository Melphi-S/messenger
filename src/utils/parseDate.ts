export const dateToChatView = (dateString?: string) => {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  return `${String(date.getHours()).padStart(0, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};
