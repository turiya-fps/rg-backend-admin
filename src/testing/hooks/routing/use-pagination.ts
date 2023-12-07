import { noop } from '@matt-usurp/grok';
import type { UsePaginationControls } from '../../../hooks/routing/use-pagination';

export const createPaginationControlsMock = (): UsePaginationControls => {
  return {
    page: 2,
    pages: 4,
    limit: 15,
    total: 56,

    hasNext: false,
    hasPrevious: false,

    next: noop,
    previous: noop,
    goto: noop,
  };
};
