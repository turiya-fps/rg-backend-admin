import type { Client } from '@project-rouge/service-core/http/client';
import type { PostUser } from '@project-rouge/service-user-client/endpoint/user/post-user';
import { request } from '@project-rouge/service-user-client/endpoint/user/post-user';
import type { UserProfile } from '@project-rouge/service-user-client/resource/user';
import type { AuthenticationTokenMapping } from '../../../helpers/authentication/credential-storage';
import { useAuthenticationStoreCredentials } from '../../../stores/authentication/context';
import type { HttpClientQuery } from '../use-api-client';
import { createHookRequiresCredentialsError, useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type PostUserQueryFunctionInput = {
  readonly email: string;
  readonly password: string;
  readonly profile: UserProfile;
};

type PostUserQueryFunctionFactory = (
  client: Client,
  hostname: string,
  credentials: AuthenticationTokenMapping | undefined,
) => UseApiMutationFunction<PostUserQueryFunctionInput, PostUser.Response>;

export type PostUserQuery = HttpClientQuery<PostUser.Response>;
export type PostUserQueryMutation = UseApiMutation<PostUserQueryFunctionInput, PostUser.Response>;

/**
 * An api query handler for the {@link PostUser} endpoint.
 */
export const handle: PostUserQueryFunctionFactory = (client, hostname, credentials) => {
  return async (input) => {
    if (credentials === undefined) {
      throw createHookRequiresCredentialsError();
    }

    return request(client, {
      hostname,

      credentials: {
        admin: credentials.admin,
      },

      payload: {
        email: input.email,
        password: input.password,
        profile: {
          name_first: input.profile.name_first,
          name_last: input.profile.name_last,
          company_name: input.profile.company_name,
          company_job_title: input.profile.company_job_title,
        },
      },
    });
  };
};

/**
 * A hook to perform queries against the {@link PostUser} endpoint.
 */
export const usePostUserQuery = (): PostUserQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();
  const credentials = useAuthenticationStoreCredentials();

  const handler = handle(client, hostname.user, credentials);

  return useApiMutation(handler);
};
