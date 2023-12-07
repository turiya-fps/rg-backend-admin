import { isHttpResponseIdentifier } from '@project-rouge/service-core/http/endpoint';
import type { FunctionComponent } from 'react';
import { usePostSessionQuery } from '../../../../hooks/api/user/post-session';
import { useAuthenticationStore } from '../../../../stores/authentication/context';
import { LoginPage } from './LoginPage';

export const LoginPageScreen: FunctionComponent = () => {
  const authentication = useAuthenticationStore();

  const postSessionQuery = usePostSessionQuery();

  return (
    <LoginPage
      loading={postSessionQuery.is.loading}
      onUserLogin={async (email, password) => {
        const response = await postSessionQuery.make({
          email,
          password,
        });

        if (isHttpResponseIdentifier(response, 'success:created:session')) {
          authentication.dispatch({
            type: 'SET_ADMIN_TOKEN',

            tokens: {
              admin: response.body.tokens.admin ?? 'unknown',
            },
          });
        }
      }}
    />
  );
};
