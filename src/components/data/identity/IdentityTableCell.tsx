import clsx from 'clsx';
import type { FunctionComponent } from 'react';

export type IdentityTableCellProps = {
  readonly id: string;
};

export const IdentityTableCell: FunctionComponent<IdentityTableCellProps> = (props) => {
  return (
    <td className={'relative p-1 w-[5rem] h-full'}>
      <div
        className={clsx({
          'bg-teal-50 rounded border border-teal-500 pl-1 pr-1 w-16': true,
          'text-teal-800 font-mono text-sm': true,
          'absolute top-1.5': true,
          'whitespace-nowrap text-ellipsis overflow-hidden': true,
          'hover:overflow-auto hover:w-auto': true,
        })}
      >
        {props.id}
      </div>
    </td>
  );
};
