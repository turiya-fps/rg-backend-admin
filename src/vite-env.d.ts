/// <reference types="vite/client" />

// --
// -- Build directives
// --

/**
 * This is a build directive that is used to enable debug logging for the api hooks.
 * This value is controlled through the `vite.config.ts` at the root of the project.
 *
 * @todo Add documentation for build flag code stripping.
 */
declare const DEBUG_API: boolean;

/**
 * This is a build directive that is used to enable debug logging for the store reducer hooks.
 * This value is controlled through the `vite.config.ts` at the root of the project.
 *
 * @todo Add documentation for build flag code stripping.
 */
declare const DEBUG_STORE: boolean;

// --
// -- Environment
// --

interface ImportMetaEnv {
  readonly VITE_BUILD_ENVIRONMENT: string;
  readonly VITE_BUILD_ID: string;
  readonly VITE_BUILD_REGION: string;
  readonly VITE_BUILD_APP_ID: string;
  readonly VITE_BUILD_BRANCH: string;
  readonly VITE_BUILD_COMMIT_SHA: string;
  readonly VITE_BUILD_COMMIT_PREVIOUS_SHA: string;
  readonly VITE_BUILD_PULL_REQUEST_ID: string;
  readonly VITE_BUILD_DATE: string;

  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_ENVIRONMENT: string;
  readonly VITE_SENTRY_RELEASE: string;

  readonly VITE_HOST_SELF: string;

  readonly VITE_HOST_WEB_ADMIN: string;
  readonly VITE_HOST_WEB_APP: string;

  readonly VITE_HOST_SERVICE_COST: string;
  readonly VITE_HOST_SERVICE_FILE: string;
  readonly VITE_HOST_SERVICE_PART: string;
  readonly VITE_HOST_SERVICE_PROJECT: string;
  readonly VITE_HOST_SERVICE_USER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
