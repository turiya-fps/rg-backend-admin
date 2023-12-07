import clsx from 'clsx';
import type { FunctionComponent } from 'react';

export type ButtonProps = {
  readonly type: 'button' | 'submit' | 'reset';
  readonly disabled?: boolean;
  readonly label: string;
  readonly onButtonClick?: () => void | Promise<void>;
};

export const Button: FunctionComponent<ButtonProps> = (props) => {
  return (
    <input
      className={clsx({
        'block-inline bg-teal-500 rounded-full px-5 py-3': true,
        'text-white font-semibold leading-none': true,
        'transition duration-150 ease-in-out': true,
        'active:outline-none active:bg-teal-800 active:ring': props.disabled !== true,
        'focus:outline-none focus:bg-teal-700 focus:ring-0': props.disabled !== true,
        'hover:outline-none hover:bg-teal-700 hover:ring-0 cursor-pointer': props.disabled !== true,
        'disabled:text-gray-100 disabled:bg-gray-300': true,
      })}
      type={props.type ?? 'button'}
      disabled={props.disabled === true}
      value={props.label}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        // eslint-disable-next-line no-void
        void props.onButtonClick?.();
      }}
    />
  );
};
