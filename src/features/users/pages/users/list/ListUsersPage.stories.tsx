import { noop } from '@matt-usurp/grok';
import type { Meta, StoryFn } from '@storybook/react';
import { withRouterDecorator } from '../../../../../testing/decorators/with-router-decorator';
import { createUserHttpResourceMock } from '../../../../../testing/hooks/api/service/user';
import { createPaginationControlsMock } from '../../../../../testing/hooks/routing/use-pagination';
import { ListUsersPage } from './ListUsersPage';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: ListUsersPage,

  decorators: [
    withRouterDecorator(),
  ],

  args: {},
  argTypes: {},
} as Meta<typeof ListUsersPage>;

export const Default: StoryFn<typeof ListUsersPage> = () => {
  return (
    <ListUsersPage
      loading={false}
      pagination={createPaginationControlsMock()}
      users={[
        createUserHttpResourceMock(),
        createUserHttpResourceMock(),
        createUserHttpResourceMock(),
        createUserHttpResourceMock(),
        createUserHttpResourceMock(),
        createUserHttpResourceMock(),
        createUserHttpResourceMock(),
        createUserHttpResourceMock(),
        createUserHttpResourceMock(),
        createUserHttpResourceMock(),
      ]}
      onCreateNewUser={noop}
    />
  );
};

export const Loading: StoryFn<typeof ListUsersPage> = () => {
  return (
    <ListUsersPage
      loading={true}
      pagination={createPaginationControlsMock()}
      users={[]}
      onCreateNewUser={noop}
    />
  );
};
