import type { Client } from '@project-rouge/service-core/http/client';
import type { PostSession } from '@project-rouge/service-user-client/endpoint/session/post-session';
import { request } from '@project-rouge/service-user-client/endpoint/session/post-session';
import type { HttpClientQuery } from '../use-api-client';
import { useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type PostSessionQueryFunctionInput = {
  readonly email: string;
  readonly password: string;
};

type PostSessionQueryFunctionFactory = (
  client: Client,
  hostname: string,
) => UseApiMutationFunction<PostSessionQueryFunctionInput, PostSession.Response>;

export type PostSessionQuery = HttpClientQuery<PostSession.Response>;
export type PostSessionQueryMutation = UseApiMutation<PostSessionQueryFunctionInput, PostSession.Response>;

/**
 * An api query handler for the {@link PostSession} endpoint.
 */
export const handle: PostSessionQueryFunctionFactory = (client, hostname) => {
  return async (input) => {
    return request(client, {
      hostname,

      payload: {
        role: 'admin',
        email: input.email,
        password: input.password,
      },
    });
  };
};

/**
 * A hook to perform queries against the {@link PostSession} endpoint.
 */
export const usePostSessionQuery = (): PostSessionQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();

  const handler = handle(client, hostname.user);

  return useApiMutation(handler);
};
