export const PAGE_SIZE = 10;

export const INITIAL_PAGE = 1;

export const getTotalPage = (
  totalCount: number,
  itemsPerPage: number = PAGE_SIZE,
) => {
  return Math.ceil(totalCount / itemsPerPage);
};
