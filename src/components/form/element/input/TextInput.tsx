import clsx from 'clsx';
import type { FunctionComponent, InputHTMLAttributes } from 'react';
import { forwardRef, useMemo } from 'react';
import type { RegisterOptions } from 'react-hook-form';
import type { UseCustomFormController } from '../../../../hooks/form/use-custom-form-controller';
import { SkeletonLoaderBase } from '../../../loading/skeleton/SkeletonLoaderBase';

export type TextInputProps = {
  readonly id: string;
  readonly type: 'text' | 'email' | 'password';

  /**
   * The HTML `name` attribute for the input.
   * When this is not provided it will be set to the {@link id} property.
   */
  readonly name?: string;
  readonly value?: string;
  readonly placeholder?: string;

  readonly loading?: boolean;
  readonly disabled?: boolean;

  readonly other?: InputHTMLAttributes<HTMLInputElement>;
};

/**
 * A base component for defining a basic text input.
 */
export const TextInput: FunctionComponent<TextInputProps> = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  const autocomplete = useMemo(() => {
    switch (props.type) {
      case 'email': return 'email';
      case 'password': return 'current-password';
      default: return 'off';
    }
  }, [props.type]);

  return (
    <div className={'inline-block relative w-full rounded-md border border-gray-200 overflow-hidden'}>
      {props.loading === true && (
        <SkeletonLoaderBase />
      )}
      <input
        ref={ref}
        id={props.id}
        className={clsx({
          'inline-block appearance-none bg-neutral-50 m-0 py-2 px-3 w-full': true,
          'font-normal text-gray-700 leading-tight placeholder-gray-300': true,
          'transition ease-in-out': true,
          'disabled:bg-gray-100 disabled:text-stone-400': true,
          'focus:bg-gray-50 focus:outline-none focus:border-teal-600 focus:text-stone-800': true,
        })}
        type={props.type}
        name={props.name ?? props.id}
        value={props.value}
        placeholder={props.placeholder ?? ''}
        autoComplete={autocomplete}
        autoCapitalize={'off'}
        disabled={props.disabled === true || props.loading === true}
        {...props.other}
      />
    </div>
  );
});

export type TextInputForControllerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly controller: UseCustomFormController<any>;

  readonly id: string;
  readonly type: 'text' | 'email' | 'password';

  /**
   * The HTML `name` attribute for the input.
   * When this is not provided it will be set to the {@link id} property.
   */
  readonly name?: string;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly placeholder?: string;

  readonly rules?: RegisterOptions;
};

export const TextInputForController: FunctionComponent<TextInputForControllerProps> = (props) => {
  const field = props.name ?? props.id;
  const other = props.controller.hook.register(field, props.rules);

  return (
    <TextInput
      id={props.id}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      loading={props.loading}
      disabled={props.disabled}
      other={other}
    />
  );
};
