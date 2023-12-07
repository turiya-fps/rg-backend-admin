import type { UserProfile } from '@project-rouge/service-user-client/resource/user';
import { composeFullName, sanitiseUserProfileInputData } from './data';

describe('sanitiseUserProfileInputData()', (): void => {
  it('with any empty string values returns undefined against those properties', (): void => {
    const userProfileInput: Partial<UserProfile> = {
      name_first: '',
      name_last: '',
      company_name: '',
      company_job_title: '',
    };

    expect(
      sanitiseUserProfileInputData(userProfileInput),
    ).toStrictEqual<Partial<UserProfile>>({
      name_first: undefined,
      name_last: undefined,
      company_name: undefined,
      company_job_title: undefined,
    });
  });
  it('trims whitespace from values', (): void => {
    const userProfileInput: Partial<UserProfile> = {
      name_first: 'test:input:profile_name_first ',
      name_last: ' test:input:profile_name_last ',
      company_name: '  test:input:profile_company_name ',
      company_job_title: 'test:input:profile_company_job_title ',
    };

    expect(
      sanitiseUserProfileInputData(userProfileInput),
    ).toStrictEqual<Partial<UserProfile>>({
      name_first: 'test:input:profile_name_first',
      name_last: 'test:input:profile_name_last',
      company_name: 'test:input:profile_company_name',
      company_job_title: 'test:input:profile_company_job_title',
    });
  });
});

describe('composeFullName', () => {
  it('should return the full name when both first and last names are provided', () => {
    const fullName = composeFullName('The', 'Dude');
    expect(fullName).toBe('The Dude');
  });

  it('should return undefined when either first or last name is not provided', () => {
    const fullName1 = composeFullName('The', undefined);
    const fullName2 = composeFullName(undefined, 'Dude');
    expect(fullName1).toBeUndefined();
    expect(fullName2).toBeUndefined();
  });
});
