import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import { DateTimeText } from './DateTimeText';

export type DateTimeTableCellProps = {
  readonly date: string | undefined | null;
  readonly format: 'full' | 'date-only';
  readonly fallback?: string;
};

export const DateTimeTableCell: FunctionComponent<DateTimeTableCellProps> = (props) => {
  return (
    <td className={clsx({
      'p-1 text-right': true,
      'w-[9rem]': props.format === 'full',
      'w-[7rem]': props.format === 'date-only',
    })}>
      <DateTimeText
        date={props.date}
        format={'date-only'}
        fallback={props.fallback}
      />
    </td>
  );
};
