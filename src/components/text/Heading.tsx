import type { FunctionComponent } from 'react';

export type Headings = (
  | 'h1'
);

type HeadingProps = {
  readonly type: Headings;
  readonly label: string;
};

export const Heading: FunctionComponent<HeadingProps> = (props) => {
  return (
    <h1 className={'text-xl font-semibold leading-tight tracking-tight text-gray-600 mb-6'}>
      {props.label}
    </h1>
  );
};
