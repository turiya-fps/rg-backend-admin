import type { FunctionComponent, PropsWithChildren } from 'react';

export type FormControlProps = {
  readonly id?: string;
  readonly label: string;
  readonly required?: boolean;
};

export const FormControl: FunctionComponent<PropsWithChildren<FormControlProps>> = (props) => {
  return (
    <div className={'w-auto'}>
      <label className={'block'} htmlFor={props.id}>
        <span className={'block text-sm text-gray-600'}>
          <span className={'ml-1'}>{props.label}</span>

          {props.required === true && (
            <span className={'text-xs text-red-700'}>{' *'}</span>
          )}
        </span>

        {props.children}
      </label>
    </div>
  );
};
