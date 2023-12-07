import type { Client } from '@project-rouge/service-core/http/client';
import type { DeleteUserIsActive } from '@project-rouge/service-user-client/endpoint/user/delete-user-is-active';
import { request } from '@project-rouge/service-user-client/endpoint/user/delete-user-is-active';
import type { AuthenticationTokenMapping } from '../../../helpers/authentication/credential-storage';
import { useAuthenticationStoreCredentials } from '../../../stores/authentication/context';
import type { HttpClientQuery } from '../use-api-client';
import { createHookRequiresCredentialsError, useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type DeleteUserIsActiveQueryFunctionInput = {
  readonly id: string;
};

type DeleteUserIsActiveQueryFunctionFactory = (
  client: Client,
  hostname: string,
  credentials: AuthenticationTokenMapping | undefined,
) => UseApiMutationFunction<DeleteUserIsActiveQueryFunctionInput, DeleteUserIsActive.Response>;

export type DeleteUserIsActiveQuery = HttpClientQuery<DeleteUserIsActive.Response>;
export type DeleteUserIsActiveQueryMutation = UseApiMutation<DeleteUserIsActiveQueryFunctionInput, DeleteUserIsActive.Response>;

/**
 * An api query handler for the {@link DeleteUserIsActive} endpoint.
 */
export const handle: DeleteUserIsActiveQueryFunctionFactory = (client, hostname, credentials) => {
  return async (input) => {
    if (credentials === undefined) {
      throw createHookRequiresCredentialsError();
    }

    return request(client, {
      hostname,
      credentials: {
        admin: credentials.admin,
      },

      path: {
        userId: input.id,
      },
    });
  };
};

/**
 * A hook to perform queries against the {@link DeleteUserIsActive} endpoint.
 */
export const useDeleteUserIsActiveQuery = (): DeleteUserIsActiveQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();
  const credentials = useAuthenticationStoreCredentials();

  const handler = handle(client, hostname.user, credentials);

  return useApiMutation(handler);
};
