import type { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export type HeaderNavigationLinkProps = {
  readonly to: string;
  readonly label: string;
};

export const HeaderNavigationLink: FunctionComponent<HeaderNavigationLinkProps> = (props) => {
  return (
    <li className={'list-none'}>
      <Link
        className={'block px-4 py-2 text-teal-100 hover:text-white'}
        to={props.to}
      >
        {props.label}
      </Link>
    </li>
  );
};

export const HeaderNavigation: FunctionComponent = () => {
  return (
    <ul className={'flex list-none'}>
      <HeaderNavigationLink to={'/dashboard'} label={'Dashboard'} />
      <HeaderNavigationLink to={'/users'} label={'Users'} />
    </ul>
  );
};
