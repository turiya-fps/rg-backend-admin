import type { Client } from '@project-rouge/service-core/http/client';
import type { PutUserIsMasterAdmin } from '@project-rouge/service-user-client/endpoint/user/put-user-is-master-admin';
import { request } from '@project-rouge/service-user-client/endpoint/user/put-user-is-master-admin';
import type { AuthenticationTokenMapping } from '../../../helpers/authentication/credential-storage';
import { useAuthenticationStoreCredentials } from '../../../stores/authentication/context';
import type { HttpClientQuery } from '../use-api-client';
import { createHookRequiresCredentialsError, useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type PutUserIsMasterAdminQueryFunctionInput = {
  readonly id: string;
};

type PutUserIsMasterAdminQueryFunctionFactory = (
  client: Client,
  hostname: string,
  credentials: AuthenticationTokenMapping | undefined,
) => UseApiMutationFunction<PutUserIsMasterAdminQueryFunctionInput, PutUserIsMasterAdmin.Response>;

export type PutUserIsMasterAdminQuery = HttpClientQuery<PutUserIsMasterAdmin.Response>;
export type PutUserIsMasterAdminQueryMutation = UseApiMutation<PutUserIsMasterAdminQueryFunctionInput, PutUserIsMasterAdmin.Response>;

/**
 * An api query handler for the {@link PutUserIsMasterAdmin} endpoint.
 */
export const handle: PutUserIsMasterAdminQueryFunctionFactory = (client, hostname, credentials) => {
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
 * A hook to perform queries against the {@link PutUserIsMasterAdmin} endpoint.
 */
export const usePutUserIsMasterAdminQuery = (): PutUserIsMasterAdminQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();
  const credentials = useAuthenticationStoreCredentials();

  const handler = handle(client, hostname.user, credentials);

  return useApiMutation(handler);
};
