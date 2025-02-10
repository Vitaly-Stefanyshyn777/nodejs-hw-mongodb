import { SORT_ORDER } from "../constants/index.js";

const parseSortOrder = (sortOrder) =>
  [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)
    ? sortOrder
    : SORT_ORDER.ASC;

const parseSortBy = (sortBy) => (["name"].includes(sortBy) ? sortBy : "_id");

export const parseSortParams = ({ sortOrder, sortBy }) => ({
  sortOrder: parseSortOrder(sortOrder),
  sortBy: parseSortBy(sortBy),
});
