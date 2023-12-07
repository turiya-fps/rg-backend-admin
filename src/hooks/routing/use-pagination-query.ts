import { parseIntegerFromString } from '@project-rouge/service-core/data/number';
import type { PagerPaginationRequirements } from '@project-rouge/service-core/http/pagination/pager';
import { useSearchParams } from 'react-router-dom';

type PaginationQueryControls = PagerPaginationRequirements & {
  readonly update: (pagination: Partial<PagerPaginationRequirements>) => void;
};

export const usePaginationQuery = (page: number, limit: number): PaginationQueryControls => {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    page: parseIntegerFromString(searchParams.get('page') ?? undefined, page),
    limit: parseIntegerFromString(searchParams.get('limit') ?? undefined, limit),

    update: (pagination: Partial<PagerPaginationRequirements>): void => {
      let changed = false;

      if (pagination.page !== undefined) {
        searchParams.set('page', pagination.page.toString());
        changed = true;
      }

      if (pagination.limit !== undefined) {
        searchParams.set('limit', pagination.limit.toString());
        changed = true;
      }

      if (changed === true) {
        setSearchParams(searchParams);
      }
    },
  };
};
