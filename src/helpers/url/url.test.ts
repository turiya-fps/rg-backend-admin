import { composeProxySignInUrl } from './url';

describe('composeProxySignInurl()', (): void => {
  it('with actor and admin tokens, return url', (): void => {
    const admin = 'test:token:admin';
    const actor = 'test:token:actor';

    expect(
      composeProxySignInUrl(admin, actor, 'https://tessa.ai/'),
    ).toStrictEqual('https://tessa.ai/login/sso/dGVzdDp0b2tlbjphZG1pbg==/dGVzdDp0b2tlbjphY3Rvcg==');
  });
});
