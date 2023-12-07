import type { HttpTransportKind } from '@matt-usurp/grok/http/transport';
import type { Client } from '@project-rouge/service-core/http/client';
import { factory } from '@project-rouge/service-core/http/client';
import type { ExtractHttpResponseIdentifiers } from '@project-rouge/service-core/http/endpoint';
import type { MutationStatus, QueryStatus } from '@tanstack/react-query';

/**
 * Available states for the http client to be in.
 */
export const enum HttpClientState {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

/**
 * Transform the `@tanstack/react-query` state types ({@link MutationStatus} or {@link QueryStatus}) into a {@link HttpClientState}.
 */
export const toHttpClientState = (state: MutationStatus | QueryStatus): HttpClientState => {
  switch (state) {
    case 'loading': return HttpClientState.Loading;
    case 'success': return HttpClientState.Success;
    case 'error': return HttpClientState.Error;
    default: return HttpClientState.Idle;
  }
};

/**
 * A type representing the base information for an executing query.
 */
export type HttpClientQuery<R extends HttpTransportKind> = {
  readonly identifier: ExtractHttpResponseIdentifiers<R> | undefined;
  readonly status: HttpClientState;
  readonly data: R | undefined;
  readonly is: HttpClientQueryStateBooleans;
};

/**
 * A constraint type for {@link HttpClientQuery}.
 */
export type HttpClientQueryKind = HttpClientQuery<HttpTransportKind>;

/**
 * Boolean states describing the {@link HttpClientQuery}.
 */
export type HttpClientQueryStateBooleans = {
  readonly idle: boolean;
  readonly loading: boolean;
  readonly success: boolean;
  readonly error: boolean;
};

/**
 * A function to create {@link HttpClientQueryStateBooleans} for the given {@link state}.
 */
export const createHttpClientQueryStateBooleans = (state: HttpClientState): HttpClientQueryStateBooleans => {
  return {
    idle: state === HttpClientState.Idle,
    loading: state === HttpClientState.Loading,
    success: state === HttpClientState.Success,
    error: state === HttpClientState.Error,
  };
};

/**
 * Create a common error for hooks that require authentication.
 */
export const createHookRequiresCredentialsError = (): Error => {
  return new Error([
    'This hook requires valid credentials (authentication) to be used!',
    'Ensure the usage of the query or mutation is behind checks for authentication.',
  ].join(' '));
};

/**
 * Check if the given response is an error kind.
 */
export const isHandlerResponseError = (response: HttpTransportKind | undefined): boolean => {
  if (response === undefined) {
    return false;
  }

  if (response.status >= 200 && response.status < 300) {
    return true;
  }

  return false;
};

/**
 * A cached `@project-rouge/service-core/http/client`.
 */
const client = factory(fetch);

/**
 * A hook to a `@project-rouge/service-core/http/client`.
 */
export const useApiClient = (): Client => {
  return client;
};
