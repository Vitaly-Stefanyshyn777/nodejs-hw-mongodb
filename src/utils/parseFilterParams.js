const parseFavourite = (value) =>
  typeof value === "string" ? value.toLowerCase() === "true" : undefined;

const parseGender = (gender) =>
  typeof gender === "string" && ["male", "female", "other"].includes(gender)
    ? gender
    : undefined;

const parseNumber = (number) =>
  typeof number === "string" ? parseInt(number) || undefined : undefined;

export const parseFilterParams = (query) => {
  const { type, isFavourite, gender, maxAge, minAge, maxAvgMark, minAvgMark } =
    query;

  return {
    type: typeof type === "string" ? type : undefined,
    isFavourite: parseFavourite(isFavourite),
    gender: parseGender(gender),
    maxAge: parseNumber(maxAge),
    minAge: parseNumber(minAge),
    maxAvgMark: parseNumber(maxAvgMark),
    minAvgMark: parseNumber(minAvgMark),
  };
};
