import type { FunctionComponent } from 'react';
import { useAuthenticationStore } from '../../../stores/authentication/context';
import { UserEmailInline } from '../../profile/UserEmail';

export const HeaderUserProfile: FunctionComponent = () => {
  const authentication = useAuthenticationStore();

  if (authentication.state.user === undefined) {
    return null;
  }

  return (
    <div className={'flex text-teal-100'}>
      <UserEmailInline user={authentication.state.user} />
    </div>
  );
};
