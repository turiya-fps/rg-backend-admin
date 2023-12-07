import type { UserProfile } from '@project-rouge/service-user-client/resource/user';

export const composeFullName = (firstName: string | undefined, lastName: string | undefined): string | undefined => {
  if (firstName === undefined || lastName === undefined) {
    return undefined;
  }
  return `${firstName} ${lastName}`;
};

export const sanitiseUserProfileInputData = (data: Partial<UserProfile>): Partial<UserProfile> => {
  const { name_first, name_last, company_name, company_job_title } = data;
  return {
    name_first: name_first !== undefined && name_first.length > 0 ? name_first.trim() : undefined,
    name_last: name_last !== undefined && name_last.length > 0 ? name_last.trim() : undefined,
    company_name: company_name !== undefined && company_name.length > 0 ? company_name.trim() : undefined,
    company_job_title: company_job_title !== undefined && company_job_title.length > 0 ? company_job_title.trim() : undefined,
  };
};
