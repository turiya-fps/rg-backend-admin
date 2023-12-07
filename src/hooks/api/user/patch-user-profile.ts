import type { Client } from '@project-rouge/service-core/http/client';
import type { PatchUserProfile } from '@project-rouge/service-user-client/endpoint/user/patch-user-profile';
import { request } from '@project-rouge/service-user-client/endpoint/user/patch-user-profile';
import type { UserProfile } from '@project-rouge/service-user-client/resource/user';
import type { AuthenticationTokenMapping } from '../../../helpers/authentication/credential-storage';
import { useAuthenticationStoreCredentials } from '../../../stores/authentication/context';
import type { HttpClientQuery } from '../use-api-client';
import { createHookRequiresCredentialsError, useApiClient } from '../use-api-client';
import { useApiHostname } from '../use-api-hostname';
import type { UseApiMutation, UseApiMutationFunction } from '../use-api-mutation';
import { useApiMutation } from '../use-api-mutation';

type PatchUserProfileQueryFunctionInput = {
  readonly userId: string;
  readonly profile: Partial<UserProfile>;
};

type PatchUserProfileQueryFunctionFactory = (
  client: Client,
  hostname: string,
  credentials: AuthenticationTokenMapping | undefined,
) => UseApiMutationFunction<PatchUserProfileQueryFunctionInput, PatchUserProfile.Response>;

export type PatchUserProfileQuery = HttpClientQuery<PatchUserProfile.Response>;
export type PatchUserProfileQueryMutation = UseApiMutation<PatchUserProfileQueryFunctionInput, PatchUserProfile.Response>;

/**
 * An api query handler for the {@link PatchUserProfile} endpoint.
 */
export const handle: PatchUserProfileQueryFunctionFactory = (client, hostname, credentials) => {
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
        userId: input.userId,
      },

      payload: {
        name_first: input.profile.name_first,
        name_last: input.profile.name_last,
        company_name: input.profile.company_name,
        company_job_title: input.profile.company_job_title,
      },
    });
  };
};

/**
 * A hook to perform queries against the {@link PatchUserProfile} endpoint.
 */
export const usePatchUserProfileQuery = (): PatchUserProfileQueryMutation => {
  const hostname = useApiHostname();
  const client = useApiClient();
  const credentials = useAuthenticationStoreCredentials();

  const handler = handle(client, hostname.user, credentials);

  return useApiMutation(handler);
};
