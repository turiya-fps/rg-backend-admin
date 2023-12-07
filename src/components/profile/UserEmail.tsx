import type { UserHttpResource } from '@project-rouge/service-user-client/resource/user';
import type { FunctionComponent } from 'react';
import { Avatar } from './avatar/Avatar';

export type UserEmailInlineProps = {
  readonly user: Pick<UserHttpResource, 'id' | 'email'>;
};

export const UserEmailInline: FunctionComponent<UserEmailInlineProps> = (props) => {
  return (
    <span>
      <Avatar email={props.user.email} purpose={'inline'} />
      <span className={'ml-1'}>
        {props.user.email}
      </span>
    </span>
  );
};
