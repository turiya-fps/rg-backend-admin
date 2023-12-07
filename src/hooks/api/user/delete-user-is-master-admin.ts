import type { Client } from '@project-rouge/service-core/http/client';
import type { DeleteUserIsMasterAdmin } from '@project-rouge/service-user-client/endpoint/user/delete-user-is-master-admin';
import { request } from '@project-rouge/service-user-client/endpoint/user/delete-user-is-master-admin';
import type { AuthenticationTokenMapping } from '../../../helpers/authentication/credential-storage';
import { useAuthenticationStoreCredentials } from '../../../stores/authentication/context';
import type { HttpClientQuery } from '../use-api-client';
import { createHookRequiresCredentialsError, useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type DeleteUserIsMasterAdminQueryFunctionInput = {
  readonly id: string;
};

type DeleteUserIsMasterAdminQueryFunctionFactory = (
  client: Client,
  hostname: string,
  credentials: AuthenticationTokenMapping | undefined,
) => UseApiMutationFunction<DeleteUserIsMasterAdminQueryFunctionInput, DeleteUserIsMasterAdmin.Response>;

export type DeleteUserIsMasterAdminQuery = HttpClientQuery<DeleteUserIsMasterAdmin.Response>;
export type DeleteUserIsMasterAdminQueryMutation = UseApiMutation<DeleteUserIsMasterAdminQueryFunctionInput, DeleteUserIsMasterAdmin.Response>;

/**
 * An api query handler for the {@link DeleteUserIsMasterAdmin} endpoint.
 */
export const handle: DeleteUserIsMasterAdminQueryFunctionFactory = (client, hostname, credentials) => {
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
 * A hook to perform queries against the {@link DeleteUserIsMasterAdmin} endpoint.
 */
export const useDeleteUserIsMasterAdminQuery = (): DeleteUserIsMasterAdminQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();
  const credentials = useAuthenticationStoreCredentials();

  const handler = handle(client, hostname.user, credentials);

  return useApiMutation(handler);
};
