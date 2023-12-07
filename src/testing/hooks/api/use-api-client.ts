import type { HttpClientQueryKind } from '../../../hooks/api/use-api-client';
import { createHttpClientQueryStateBooleans, HttpClientState } from '../../../hooks/api/use-api-client';

export const createHttpClientQueryIdle = <T extends HttpClientQueryKind>(identifier?: string): T => {
  return {
    identifier,
    status: HttpClientState.Idle,
    data: undefined,
    is: createHttpClientQueryStateBooleans(HttpClientState.Idle),
  } as T;
};

export const createHttpClientQuerySuccess = <T extends HttpClientQueryKind>(identifier?: string): T => {
  return {
    identifier,
    status: HttpClientState.Success,
    data: undefined,
    is: createHttpClientQueryStateBooleans(HttpClientState.Success),
  } as T;
};

export const createHttpClientQueryLoading = <T extends HttpClientQueryKind>(): T => {
  return {
    identifier: undefined,
    status: HttpClientState.Loading,
    data: undefined,
    is: createHttpClientQueryStateBooleans(HttpClientState.Loading),
  } as T;
};
