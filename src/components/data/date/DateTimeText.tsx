import { useMemo, type FunctionComponent } from 'react';

export type DateTimeTextProps = {
  date: string | undefined | null;
  format: 'full' | 'date-only';
  fallback?: string;
};

export const DateTimeText: FunctionComponent<DateTimeTextProps> = (props) => {
  if (props.date === undefined || props.date === null) {
    return (
      <span>{props.fallback ?? '-'}</span>
    );
  }

  const parts = props.date.split('T');

  const date = parts[0].split('-').reverse().join('/');
  const time = parts[1].split('.')[0];

  const output = useMemo(() => {
    switch (props.format) {
      case 'full':
        return `${date} ${time}`;

      case 'date-only':
        return date;

      default:
        return '[unknown]';
    }
  }, [props.date, props.format]);

  return (
    <span title={`${date} ${time}`}>{output}</span>
  );
};
