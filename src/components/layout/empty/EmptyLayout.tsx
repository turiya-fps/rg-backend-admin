import type { FunctionComponent, PropsWithChildren } from 'react';
import { PageContainer } from '../../page/container/Container';

export const EmptyLayout: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <PageContainer>
      {props.children}
    </PageContainer>
  );
};
