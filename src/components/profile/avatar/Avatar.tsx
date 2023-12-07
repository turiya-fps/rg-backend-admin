import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import Gravatar from 'react-gravatar';

export type AvatarProps = {
  readonly email: string;
  readonly purpose: 'inline';
};

export const Avatar: FunctionComponent<AvatarProps> = (props) => {
  return (
    <Gravatar
      className={clsx({
        'inline-block': true,
        'rounded-full': true,
      })}
      email={props.email}
      default={'mp'}
      size={20}
    />
  );
};
