const parseNumber = (number, defaultValue) =>
  typeof number === "string" ? parseInt(number) || defaultValue : defaultValue;

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  return {
    page: parseNumber(page, 1),
    perPage: parseNumber(perPage, 10),
  };
};
