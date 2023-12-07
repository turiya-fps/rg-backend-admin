import { fromIsoString } from '@project-rouge/service-core/data/date';
import { formatDate } from './date';

describe('formatDate()', (): void => {
  it('with Date, returns date time in readable format', (): void => {
    const dateObject: Date = fromIsoString('2022-10-24T15:22:28.230');
    expect(
      formatDate(dateObject),
    ).toStrictEqual('24/10/22 15:28');
  });
});
