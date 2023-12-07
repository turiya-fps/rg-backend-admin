import { fn } from '@matt-usurp/grok/testing';
import type { Dispatch } from 'react';
import { proxy } from './common';

describe('proxy()', (): void => {
  it('with dispatcher, proxies to dispatcher', (): void => {
    const dispatcher = fn<Dispatch<unknown>>();
    const proxied = proxy('test:proxy', dispatcher);

    expect(dispatcher).toBeCalledTimes(0);

    proxied('test:value');

    expect(dispatcher).toBeCalledTimes(1);
    expect(dispatcher).toBeCalledWith<[string]>('test:value');
  });
});
