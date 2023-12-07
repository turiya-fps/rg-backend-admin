import type { FormEvent, FunctionComponent, PropsWithChildren } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { UseCustomFormController } from '../../hooks/form/use-custom-form-controller';

export type FormEventComposite = FormEvent<HTMLFormElement>;

export type FormProps = {
  readonly submittable?: boolean;

  readonly onFormSubmit?: (event: FormEventComposite) => void | Promise<void>;

  readonly className?: string;
};

/**
 * A basic form.
 */
export const Form: FunctionComponent<PropsWithChildren<FormProps>> = (props) => {
  return (
    <form
      className={props.className}
      noValidate
      action={'#'}
      method={'post'}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.submittable === false) {
          return;
        }

        // eslint-disable-next-line no-void
        void props.onFormSubmit?.(event);
      }}>
      {props.children}
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormForControllerProps<T extends FieldValues = any> = {
  readonly controller: UseCustomFormController<T>;

  readonly submittable?: boolean;

  readonly className?: string;
};

/**
 * A controlled form.
 */
export const FormForController: FunctionComponent<PropsWithChildren<FormForControllerProps>> = (props) => {
  return (
    <Form
      submittable={props.submittable}
      onFormSubmit={async () => {
        if (props.controller.submittable === false) {
          return;
        }

        await props.controller.submit();
      }}
      className={props.className}
    >
      {props.children}
    </Form>
  );
};
