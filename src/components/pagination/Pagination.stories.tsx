import type { Meta, StoryFn } from '@storybook/react';
import { ComponentDisplayCase } from '../../testing/stories/ComponentDisplayCase';
import { Pagination } from './Pagination';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: Pagination,
  args: {},
  argTypes: {},
} as Meta<typeof Pagination>;


export const States: StoryFn<typeof Pagination> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Normal'}>
        <Pagination
          pagination={{
            page: 5,
            limit: 30,
            pages: 5,
            total: 35,

            hasNext: false,
            hasPrevious: true,

            goto: (page) => alert(`pagination.goto(${page})`),
            next: () => alert('pagination.next()'),
            previous: () => alert('pagination.previous()'),
          }}
        />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Many Pages'}>
        <Pagination
          pagination={{
            page: 2,
            limit: 50,
            pages: 15,
            total: 200,

            hasNext: true,
            hasPrevious: true,

            goto: (page) => alert(`pagination.goto(${page})`),
            next: () => alert('pagination.next()'),
            previous: () => alert('pagination.previous()'),
          }}
        />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Empty'}>
        <Pagination
          pagination={{
            page: 1,
            limit: 30,
            pages: 1,
            total: 0,

            hasNext: false,
            hasPrevious: false,

            goto: (page) => alert(`pagination.goto(${page})`),
            next: () => alert('pagination.next()'),
            previous: () => alert('pagination.previous()'),
          }}
        />
      </ComponentDisplayCase>
    </>
  );
};
