import type { FunctionComponent, PropsWithChildren } from 'react';

export const MicroButtonGroup: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <nav className={'isolate inline-flex -space-x-px'}>
      {props.children}
    </nav>
  );
};
