import type { FunctionComponent, PropsWithChildren } from 'react';

export type ComponentDisplayCaseProps = {
  readonly label: string;
};

export const ComponentDisplayCase: FunctionComponent<PropsWithChildren<ComponentDisplayCaseProps>> = (props) => {
  return (
    <div className={'mb-5'}>
      <div className={'block text-sm mb-2 text-gray-600 border-b'}>
        {'≫ Case:'} {props.label}
      </div>

      {props.children}
    </div>
  );
};
