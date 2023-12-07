import type { FunctionComponent, PropsWithChildren } from 'react';
import { PageContainer } from '../../page/container/Container';
import { Header } from '../../page/header/Header';

export const ApplicationLayout: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <PageContainer>
      <Header />

      <section className={'px-6 pb-10'}>
        {props.children}
      </section>
    </PageContainer>
  );
};
