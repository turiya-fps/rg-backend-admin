import type { FunctionComponent } from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderNavigation } from './HeaderNavigation';
import { HeaderUserProfile } from './HeaderUserProfile';

export const Header: FunctionComponent = () => {
  return (
    <HeaderContainer>
      <HeaderNavigation />
      <HeaderUserProfile />
    </HeaderContainer>
  );
};
