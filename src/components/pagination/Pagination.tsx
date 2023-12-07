import type { PagerPaginationRequirements } from '@project-rouge/service-core/http/pagination/pager';
import type { FunctionComponent } from 'react';
import type { UsePaginationControls } from '../../hooks/routing/use-pagination';
import { MicroButton } from '../button/micro/MicroButton';
import { MicroButtonGroup } from '../button/micro/group/MicroButtonGroup';

export type PaginationProps = {
  readonly pagination: UsePaginationControls;

  readonly onPaginationChange?: (pagination: PagerPaginationRequirements) => void | Promise<void>;
};

export const Pagination: FunctionComponent<PaginationProps> = (props) => {
  const pages: number[] = new Array(props.pagination.pages).fill(undefined);

  return (
    <div className='flex items-center justify-between'>
      <div>
        <MicroButtonGroup>
          <MicroButton
            label={'Previous'}
            disabled={props.pagination.hasPrevious === false}
            onPillClick={() => {
              // eslint-disable-next-line no-void
              void props.pagination.previous();
            }}
          />

          {pages.map((_, index) => {
            const page = index + 1;

            return (
              <MicroButton
                key={page}
                label={page.toString()}
                active={page === props.pagination.page}
                onPillClick={() => {
                  // eslint-disable-next-line no-void
                  void props.pagination.goto(page);
                }}
              />
            );
          })}

          <MicroButton
            label={'Next'}
            disabled={props.pagination.hasNext === false}
            onPillClick={() => {
              // eslint-disable-next-line no-void
              void props.pagination.next();
            }}
          />
        </MicroButtonGroup>
      </div>

      <div>
        <div className='sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <p className="text-gray-700">
            {'Showing '}
            <span className="font-medium text-teal-700">{props.pagination.total}</span>
            {' results total with '}
          </p>

          <select className='font-medium text-teal-700 border m-2'>
            <option>{props.pagination.limit}</option>
          </select>

          <p className="text-gray-700">
            {' per page'}
          </p>
        </div>
      </div>
    </div>
  );
};
