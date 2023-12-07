import type { FunctionComponent, PropsWithChildren } from 'react';

export const HeaderContainer: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <div className={'flex items-center justify-between flex-wrap bg-teal-500 pt-4 px-8 mb-8'}>
      {props.children}
    </div>
  );
};
