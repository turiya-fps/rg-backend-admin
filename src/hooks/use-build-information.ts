import { parseIntegerFromString } from '@project-rouge/service-core/data/number';

export type Environment = (
  | 'development'
  | 'staging'
  | 'production'
);

export const parseEnvironmentFromString = (value: string | undefined): Environment | undefined => {
  if (value === undefined) {
    return undefined;
  }

  const normalised = value.trim().toLowerCase();

  switch (normalised) {
    case 'development':
    case 'staging':
    case 'production':
      return normalised;

    default:
      return undefined;
  }
};

export type BuildInformation = {
  readonly environment: Environment | undefined;

  readonly id: number;
  readonly at: Date;

  readonly pullrequest: number;
  readonly branch: string;
  readonly commit: string;
};

export const useBuildInformation = (): BuildInformation => {
  const VITE_BUILD_ENVIRONMENT = import.meta.env.VITE_BUILD_ENVIRONMENT;
  const VITE_BUILD_ID = import.meta.env.VITE_BUILD_ID;
  const VITE_BUILD_DATE = import.meta.env.VITE_BUILD_DATE;
  const VITE_BUILD_PULL_REQUEST_ID = import.meta.env.VITE_BUILD_PULL_REQUEST_ID;
  const VITE_BUILD_BRANCH = import.meta.env.VITE_BUILD_BRANCH;
  const VITE_BUILD_COMMIT_SHA = import.meta.env.VITE_BUILD_COMMIT_SHA;

  return {
    environment: parseEnvironmentFromString(VITE_BUILD_ENVIRONMENT),

    id: parseIntegerFromString(VITE_BUILD_ID, 0),
    at: new Date(parseIntegerFromString(VITE_BUILD_DATE, 0)),

    pullrequest: parseIntegerFromString(VITE_BUILD_PULL_REQUEST_ID, 0),
    branch: VITE_BUILD_BRANCH ?? 'unknown',
    commit: VITE_BUILD_COMMIT_SHA ?? '00000000',
  };
};
