import clsx from 'clsx';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export type LinkTextProps = {
  readonly label: string;
  readonly to: string;
};

export const LinkText: FunctionComponent<PropsWithChildren<LinkTextProps>> = (props) => {
  return (
    <Link
      className={clsx({
        'text-teal-600 underline': true,
        'hover:text-teal-500': true,
        'active:text-teal-700': true,
      })}
      to={props.to}
    >
      {props.label}
    </Link>
  );
};
