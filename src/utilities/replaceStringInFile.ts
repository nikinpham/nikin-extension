const regex: RegExp = /(["'])(?:(?=(\\?))\2.)*?\1/g;

const replaceStringInFile = (words: string) => {
  return words.replace(regex, "test");
};

export default replaceStringInFile;
