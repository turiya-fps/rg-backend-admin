export type ApiHostConfiguration = {
  readonly user: string;
};

/**
 * A hook to return environment related hostnames.
 *
 * These variables are taken from the environment directly, the syntax is required to remain as is.
 * The build will do string replaces, so in the built distribution this becomes a hardcoded map of strings.
 *
 * @see https://vitejs.dev/guide/env-and-mode.html
 */
export const useApiHostname = (): ApiHostConfiguration => {
  return {
    user: import.meta.env.VITE_HOST_SERVICE_USER,
  };
};
