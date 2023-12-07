import type { Client } from '@project-rouge/service-core/http/client';
import type { PagerPaginationRequirements } from '@project-rouge/service-core/http/pagination/pager';
import type { GetUsers } from '@project-rouge/service-user-client/endpoint/user/get-users';
import { request } from '@project-rouge/service-user-client/endpoint/user/get-users';
import type { AuthenticationTokenMapping } from '../../../helpers/authentication/credential-storage';
import { useAuthenticationStoreCredentials } from '../../../stores/authentication/context';
import type { HttpClientQuery } from '../use-api-client';
import { createHookRequiresCredentialsError, useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type GetUsersQueryFunctionInput = {
  readonly pagination: PagerPaginationRequirements| undefined;
};

type GetUsersQueryFunctionFactory = (
  client: Client,
  hostname: string,
  credentials: AuthenticationTokenMapping | undefined,
) => UseApiMutationFunction<GetUsersQueryFunctionInput, GetUsers.Response>;

export type GetUsersQuery = HttpClientQuery<GetUsers.Response>;
export type GetUsersQueryMutation = UseApiMutation<GetUsersQueryFunctionInput, GetUsers.Response>;

/**
 * An api query handler for the {@link GetUsers} endpoint.
 */
export const handle: GetUsersQueryFunctionFactory = (client, hostname, credentials) => {
  return async (input) => {
    if (credentials === undefined) {
      throw createHookRequiresCredentialsError();
    }
    return request(client, {
      hostname,
      credentials: {
        admin: credentials.admin,
      },
      pagination: input.pagination,
    });
  };
};

/**
 * A hook to perform queries against the {@link GetUsers} endpoint.
 */
export const useGetUsersQuery = (): GetUsersQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();
  const credentials = useAuthenticationStoreCredentials();
  const handler = handle(client, hostname.user, credentials);

  return useApiMutation(handler);
};
