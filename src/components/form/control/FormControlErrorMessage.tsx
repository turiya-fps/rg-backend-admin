import { ErrorMessage } from '@hookform/error-message';
import type { FunctionComponent } from 'react';
import type { FieldName, FieldValues } from 'react-hook-form';
import type { UseCustomFormController } from '../../../hooks/form/use-custom-form-controller';

export type FormControlErrorMessageProps = {
  readonly message: string;
};

export const FormControlErrorMessage: FunctionComponent<FormControlErrorMessageProps> = (props) => {
  return (
    <p className={'text-sm text-red-500 ml-1'}>
      {props.message}
    </p>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormControlErrorMessageForControllerProps<T extends FieldValues = any> = {
  readonly controller: UseCustomFormController<T>;
  readonly field: FieldName<T>;
};

export const FormControlErrorMessageForController: FunctionComponent<FormControlErrorMessageForControllerProps> = (props) => {
  return (
    <ErrorMessage
      name={props.field}
      errors={props.controller.hook.formState.errors}
      render={({ message }) => (
        <FormControlErrorMessage message={message} />
      )}
    />
  );
};
