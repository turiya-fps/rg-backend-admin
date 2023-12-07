import type { Client } from '@project-rouge/service-core/http/client';
import type { PostSessionProxy } from '@project-rouge/service-user-client/endpoint/session/post-session-proxy';
import { request } from '@project-rouge/service-user-client/endpoint/session/post-session-proxy';
import type { HttpClientQuery } from '../use-api-client';
import { useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type PostSessionProxyQueryFunctionInput = {
  readonly userId: string;
  readonly token: string;
  readonly sessionId: string;
};

type PostSessionProxyQueryFunctionFactory = (
  client: Client,
  hostname: string,
) => UseApiMutationFunction<PostSessionProxyQueryFunctionInput, PostSessionProxy.Response>;

export type PostSessionProxyQuery = HttpClientQuery<PostSessionProxy.Response>;
export type PostSessionProxyQueryMutation = UseApiMutation<PostSessionProxyQueryFunctionInput, PostSessionProxy.Response>;

/**
 * An api query handler for the {@link PostSessionProxy} endpoint.
 */
export const handle: PostSessionProxyQueryFunctionFactory = (client, hostname) => {
  return async (input) => {
    return request(client, {
      hostname,

      credentials: {
        admin: input.token,
      },

      path: {
        sessionId: input.sessionId,
      },

      payload: {
        user: {
          id: input.userId,
        },
      },
    });
  };
};

/**
 * A hook to perform queries against the {@link PostSessionProxy} endpoint.
 */
export const usePostSessionProxyQuery = (): PostSessionProxyQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();

  const handler = handle(client, hostname.user);

  return useApiMutation(handler);
};
