import type { UserHttpResource } from '@project-rouge/service-user-client/resource/user';
import type { FunctionComponent } from 'react';
import { Button } from '../../../../../components/button/Button';
import { Heading } from '../../../../../components/text/Heading';
import type { UsePaginationControls } from '../../../../../hooks/routing/use-pagination';
import { ListUsersTable } from '../../../components/table/ListUsersTable';

export type ListUsersPageProps = {
  readonly loading: boolean;
  readonly pagination: UsePaginationControls;
  readonly users: UserHttpResource[];

  readonly onCreateNewUser: () => void;
};

export const ListUsersPage: FunctionComponent<ListUsersPageProps> = (props) => {
  return (
    <>
      <Heading type={'h1'} label={'Users'} />

      <div className='pt-2 pb-2 flex justify-end'>
        <Button
          type={'button'}
          label={'Create New User'}
          onButtonClick={props.onCreateNewUser}
        />
      </div>

      <ListUsersTable
        loading={props.loading}
        records={props.users}
        pagination={props.pagination}
      />
    </>
  );
};
