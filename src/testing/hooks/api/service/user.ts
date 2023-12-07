import { faker } from '@faker-js/faker/locale/en';
import type { UserHttpResource } from '@project-rouge/service-user-client/resource/user';

export const createUserHttpResourceMock = (): UserHttpResource => {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();

  return {
    id: faker.string.uuid(),

    email: faker.internet.email({
      firstName: firstname,
      lastName: lastname,
    }).toLowerCase(),

    profile: {
      name_first: firstname,
      name_last: lastname,
      company_name: faker.company.name(),
      company_job_title: faker.person.jobTitle(),
    },

    is_active: faker.datatype.boolean(),
    is_master_admin: faker.datatype.boolean(),

    created_at: faker.date.anytime().toISOString(),
    updated_at: faker.date.anytime().toISOString(),
    last_active_at: null,
  };
};
