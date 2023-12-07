import type { UserHttpResource } from '@project-rouge/service-user-client/resource/user';
import type { FunctionComponent } from 'react';
import { BooleanYesNoTableCell } from '../../../../components/data/boolean/BooleanYesNoTableCell';
import { DateTimeTableCell } from '../../../../components/data/date/DateTimeTableCell';
import { IdentityTableCell } from '../../../../components/data/identity/IdentityTableCell';
import { LinkText } from '../../../../components/link/LinkText';
import { Pagination } from '../../../../components/pagination/Pagination';
import { UserEmailInline } from '../../../../components/profile/UserEmail';
import { Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow } from '../../../../components/table/Table';
import type { UsePaginationControls } from '../../../../hooks/routing/use-pagination';

export type ListUsersTableProps = {
  readonly loading: boolean;
  readonly records: UserHttpResource[];
  readonly pagination: UsePaginationControls;
};

export const ListUsersTable: FunctionComponent<ListUsersTableProps> = (props) => {
  if (props.loading === true) {
    return (
      <p>Loading ..</p>
    );
  }

  return (
    <>
      <div className='mb-2'>
        <Pagination pagination={props.pagination} />
      </div>

      <Table
        header={
          <TableHeaderRow>
            <TableHeaderCell label={'#'} />
            <TableHeaderCell label={'Email'} />
            <TableHeaderCell label={'Name'} />
            <TableHeaderCell label={'Company'} />
            <TableHeaderCell label={'Job Title'} />
            <TableHeaderCell label={'Active'} align={'center'} />
            <TableHeaderCell label={'Admin'} align={'center'} />
            <TableHeaderCell label={'Created'} align={'right'} />
            <TableHeaderCell label={'Last Active'} align={'right'} />
            <TableHeaderCell label={'Actions'} align={'center'} />
          </TableHeaderRow>
        }
      >
        {props.records.map((record) => {
          return (
            <TableRow key={`user-${record.id}`}>
              <IdentityTableCell id={record.id} />
              <TableCell>
                <UserEmailInline user={record} />
              </TableCell>
              <TableCell>{record.profile.name_first} {record.profile.name_last}</TableCell>
              <TableCell>{record.profile.company_name}</TableCell>
              <TableCell>{record.profile.company_job_title}</TableCell>
              <BooleanYesNoTableCell
                flare={true}
                value={record.is_active}
                labels={{ truthy: 'Active', falsey: 'Inactive' }}
              />
              <BooleanYesNoTableCell
                flare={true}
                value={record.is_master_admin}
                labels={{ truthy: 'Admin', falsey: 'User' }}
                colours={{ truthy: 'purple', falsey: 'grey' }}
              />
              <DateTimeTableCell date={record.created_at} format={'date-only'} />
              <DateTimeTableCell date={record.last_active_at} format={'date-only'} fallback={'Never'} />
              <TableCell align={'center'}>
                <LinkText to={`/users/${record.id}`} label={'View'} />
              </TableCell>
            </TableRow>
          );
        })}
      </Table>

      <div className='mt-2'>
        <Pagination pagination={props.pagination} />
      </div>
    </>
  );
};
