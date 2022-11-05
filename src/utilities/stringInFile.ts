const regex: RegExp = /(["'])(?:(?=(\\?))\2.)*?\1/g;

export const replaceStringInFile = (words: string) => {
  return words.replace(regex, "test");
};

export const getStringInFile = (words: string) => {
  return words.match(regex);
};
