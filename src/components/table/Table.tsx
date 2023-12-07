import clsx from 'clsx';
import type { FunctionComponent, PropsWithChildren, ReactElement } from 'react';

export type TableProps = {
  readonly header?: ReactElement;
};

export const Table: FunctionComponent<PropsWithChildren<TableProps>> = (props) => {
  return (
    <table className={'w-full table-auto'}>
      {props.header !== undefined && (
        <thead>
          {props.header}
        </thead>
      )}

      <tbody>
        {props.children}
      </tbody>
    </table>
  );
};

export const TableRow: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <tr className={'hover:bg-gray-50'}>
      {props.children}
    </tr>
  );
};

export type TableCellProps = {
  readonly align?: 'left' | 'right' | 'center';
};

export const TableCell: FunctionComponent<PropsWithChildren<TableCellProps>> = (props) => {
  return (
    <td className={clsx({
      'p-1': true,
      'text-left': props.align === undefined || props.align === 'left',
      'text-right': props.align === 'right',
      'text-center': props.align === 'center',
    })}>
      {props.children}
    </td>
  );
};

export const TableHeaderRow: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <tr className={'bg-gray-200'}>
      {props.children}
    </tr>
  );
};

export type TableHeaderCellProps = {
  readonly label: string;
  readonly align?: 'left' | 'right' | 'center';
};

export const TableHeaderCell: FunctionComponent<TableHeaderCellProps> = (props) => {
  return (
    <th className={clsx({
      'p-2 text-left font-semibold': true,
      'text-left': props.align === undefined || props.align === 'left',
      'text-right': props.align === 'right',
      'text-center': props.align === 'center',
    })}>
      {props.label}
    </th>
  );
};
