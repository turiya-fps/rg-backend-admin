import type { Client } from '@project-rouge/service-core/http/client';
import type { PutUserIsActive } from '@project-rouge/service-user-client/endpoint/user/put-user-is-active';
import { request } from '@project-rouge/service-user-client/endpoint/user/put-user-is-active';
import type { AuthenticationTokenMapping } from '../../../helpers/authentication/credential-storage';
import { useAuthenticationStoreCredentials } from '../../../stores/authentication/context';
import type { HttpClientQuery } from '../use-api-client';
import { createHookRequiresCredentialsError, useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type PutUserIsActiveQueryFunctionInput = {
  readonly id: string;
};

type PutUserIsActiveQueryFunctionFactory = (
  client: Client,
  hostname: string,
  credentials: AuthenticationTokenMapping | undefined,
) => UseApiMutationFunction<PutUserIsActiveQueryFunctionInput, PutUserIsActive.Response>;

export type PutUserIsActiveQuery = HttpClientQuery<PutUserIsActive.Response>;
export type PutUserIsActiveQueryMutation = UseApiMutation<PutUserIsActiveQueryFunctionInput, PutUserIsActive.Response>;

/**
 * An api query handler for the {@link PutUserIsActive} endpoint.
 */
export const handle: PutUserIsActiveQueryFunctionFactory = (client, hostname, credentials) => {
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
 * A hook to perform queries against the {@link PutUserIsActive} endpoint.
 */
export const usePutUserIsActiveQuery = (): PutUserIsActiveQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();
  const credentials = useAuthenticationStoreCredentials();

  const handler = handle(client, hostname.user, credentials);

  return useApiMutation(handler);
};
