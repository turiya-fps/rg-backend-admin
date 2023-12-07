import type { PagerPaginationRequirements } from '@project-rouge/service-core/http/pagination/pager';
import { usePaginationQuery } from './use-pagination-query';

export type UsePaginationControls = PagerPaginationRequirements & {
  readonly pages: number;
  readonly total: number;

  readonly hasNext: boolean;
  readonly hasPrevious: boolean;

  readonly goto: (page: number) => void;
  readonly next: () => void;
  readonly previous: () => void;
};

export const usePagination = (page: number, limit: number, total: number | undefined): UsePaginationControls => {
  const qp = usePaginationQuery(page, limit);

  // eslint-disable-next-line no-negated-condition
  const pages = total !== undefined ? Math.ceil(total / qp.limit) : 0;

  // eslint-disable-next-line no-unneeded-ternary
  const hasPrevious = total !== undefined && qp.page === 1 ? false : true;

  // eslint-disable-next-line no-unneeded-ternary
  const hasNext = total !== undefined && qp.page < pages;

  const previous = (): void => {
    if (hasPrevious === false) {
      return;
    }

    qp.update({
      page: qp.page - 1,
    });
  };

  const next = (): void => {
    if (hasNext === false) {
      return;
    }

    qp.update({
      page: qp.page + 1,
    });
  };

  const goto = (page: number): void => {
    if (page > pages) {
      return;
    }

    if (page === qp.page) {
      return;
    }

    qp.update({
      page,
    });
  };

  return {
    page: qp.page,
    limit: qp.limit,
    pages,
    total: total ?? 0,

    hasPrevious,
    hasNext,

    goto,
    next,
    previous,
  };
};
