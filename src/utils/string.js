export const truncateByWords = (str, numWords) => {
  // kiểm tra str
  if (typeof str !== "string" || numWords <= 0) return "";
  // split(/\s+/) → xử lý nhiều space, tab
  const words = str.trim().split(/\s+/);

  if (words.length <= numWords) return words.join(" ");

  return words.slice(0, numWords).join(" ") + "...";
};
