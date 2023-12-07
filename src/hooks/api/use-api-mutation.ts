import type { HttpTransportKind } from '@matt-usurp/grok/http/transport';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { HttpClientQuery } from './use-api-client';
import { createHttpClientQueryStateBooleans, HttpClientState, isHandlerResponseError, toHttpClientState } from './use-api-client';

/**
 * A function that takes the given input of type {@link T} and return a promise of type {@link R}.
 * This should make the request to the api using one of the provided request functions.
 */
export type UseApiMutationFunction<T, R extends HttpTransportKind> = (input: T) => Promise<R>;

/**
 * A type that will explain the state of the mutation / request.
 */
export type UseApiMutation<T, R extends HttpTransportKind> = (
  & HttpClientQuery<R>
  & {
    readonly make: UseMutateAsyncFunction<R, unknown, T, unknown>;
  }
);

/**
 * A custom {@link useMutation} that handles our error response types.
 */
export const useApiMutation = <T, R extends HttpTransportKind>(handler: UseApiMutationFunction<T, R>): UseApiMutation<T, R> => {
  const mutation = useMutation(handler);

  // We can resolve the api response identifier from the mutation data if its present.
  // This helps with debugging the mutations responses against our types.
  const identifier = mutation.data?.headers?.['api-response'];

  // The status is normalised to be relevant to our responses.
  // Typically all responses from the api will be success, but with a error payload.
  const status = isHandlerResponseError(mutation.data) === true
    ? HttpClientState.Error
    : toHttpClientState(mutation.status);

  // A wrapper that can help place global debugging between mutation queries.
  const make: UseApiMutationFunction<T, R> = async (input) => {
    if (DEBUG_API === true) {
      // eslint-disable-next-line no-console
      console.debug('hooks.api.mutation', 'mutate:request', { input });
    }

    const response = await mutation.mutateAsync(input);

    if (DEBUG_API === true) {
      // eslint-disable-next-line no-console
      console.debug('hooks.api.mutation', 'mutate:response', {
        identifier: response?.headers?.['api-response'],
        response,
        error: {
          origin: response?.headers?.['error-origin'],
          hint: response?.headers?.['error-hint'],
        },
      });
    }

    return response;
  };

  return {
    identifier,
    status,
    make,
    data: mutation.data,
    is: createHttpClientQueryStateBooleans(status),
  };
};
