import type { Client } from '@project-rouge/service-core/http/client';
import type { GetUser } from '@project-rouge/service-user-client/endpoint/user/get-user';
import { request } from '@project-rouge/service-user-client/endpoint/user/get-user';
import type { AuthenticationTokenMapping } from '../../../helpers/authentication/credential-storage';
import { useAuthenticationStoreCredentials } from '../../../stores/authentication/context';
import type { HttpClientQuery } from '../use-api-client';
import { createHookRequiresCredentialsError, useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type GetUserQueryFunctionInput = {
  readonly id: string;
};

type GetUserQueryFunctionFactory = (
  client: Client,
  hostname: string,
  credentials: AuthenticationTokenMapping | undefined,
) => UseApiMutationFunction<GetUserQueryFunctionInput, GetUser.Response>;

export type GetUserQuery = HttpClientQuery<GetUser.Response>;
export type GetUserQueryMutation = UseApiMutation<GetUserQueryFunctionInput, GetUser.Response>;

/**
 * An api query handler for the {@link GetUser} endpoint.
 */
export const handle: GetUserQueryFunctionFactory = (client, hostname, credentials) => {
  return async (input) => {
    if (credentials === undefined) {
      throw createHookRequiresCredentialsError();
    }

    return request(client, {
      hostname,
      credentials: {
        // @todo This needs to accept the admin token, types are wrong.
        actor: credentials.admin,
      },

      path: {
        userId: input.id,
      },
    });
  };
};

/**
 * A hook to perform queries against the {@link GetUser} endpoint.
 */
export const useGetUserQuery = (): GetUserQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();
  const credentials = useAuthenticationStoreCredentials();

  const handler = handle(client, hostname.user, credentials);

  return useApiMutation(handler);
};
