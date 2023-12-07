import { useEffect, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../../../../../hooks/api/user/get-users';
import { usePagination } from '../../../../../hooks/routing/use-pagination';
import { ListUsersPage } from './ListUsersPage';

export const ListUsersPageScreen: FunctionComponent = () => {
  const navigate = useNavigate();
  const getUsersQuery = useGetUsersQuery();

  const pagination = usePagination(1, 50, getUsersQuery.data?.body?.meta.total ?? 0);

  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => {
      await getUsersQuery.make({
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
        },
      });
    })();
  }, [pagination.page, pagination.limit]);

  return (
    <ListUsersPage
      loading={getUsersQuery.is.loading}
      pagination={pagination}
      users={getUsersQuery.data?.body?.results ?? []}
      onCreateNewUser={() => {
        navigate('/users/create');
      }}
    />
  );
};
