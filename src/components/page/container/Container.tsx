import type { FunctionComponent, PropsWithChildren } from 'react';

export const PageContainer: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <div className={'relative h-max'}>
      {props.children}
    </div>
  );
};
