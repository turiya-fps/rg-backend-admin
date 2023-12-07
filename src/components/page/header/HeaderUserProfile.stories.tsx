import { partial } from '@matt-usurp/grok/testing';
import type { UserHttpResource } from '@project-rouge/service-user-client/resource/user';
import type { Meta, StoryFn } from '@storybook/react';
import { AuthenticationCredentialStorage } from '../../../helpers/authentication/credential-storage';
import { AuthenticationStoreContextProvider } from '../../../stores/authentication/context';
import type { AuthenticationStoreState } from '../../../stores/authentication/store';
import { AuthenticationStoreStateInitialisation } from '../../../stores/authentication/store';
import { FakeStorage } from '../../../testing/helpers/fake-storage';
import { HeaderContainer } from './HeaderContainer';
import { HeaderUserProfile } from './HeaderUserProfile';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: HeaderUserProfile,
  args: {},
  argTypes: {},
} as Meta<typeof HeaderUserProfile>;

export const Default: StoryFn<typeof HeaderUserProfile> = () => {
  const storage = new AuthenticationCredentialStorage(new FakeStorage());

  return (
    <AuthenticationStoreContextProvider
      storage={storage}
      initial={partial<AuthenticationStoreState>({
        initialised: AuthenticationStoreStateInitialisation.Initialised,
        authenticated: true,

        user: partial<UserHttpResource>({
          id: 'user-id',
          email: 'tony.stark@avengers.gov',
        }),
      })}
    >
      <HeaderContainer>
        <HeaderUserProfile />
      </HeaderContainer>
    </AuthenticationStoreContextProvider>
  );
};
