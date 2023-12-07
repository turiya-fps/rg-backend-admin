import { useMemo } from 'react';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';

export type UseCustomFormController<T extends FieldValues> = {
  readonly hook: UseFormReturn<T>;

  /**
   * Trigger a form submission.
   */
  readonly submit: () => Promise<void>;

  readonly submittable: boolean;
};

export type UseCustomFormControllerProps<T extends FieldValues> = {
  onFormSubmit: SubmitHandler<T>;
};

export const useCustomFormController = <T extends FieldValues>(props: UseCustomFormControllerProps<T>): UseCustomFormController<T> => {
  const hook = useForm<T>({
    mode: 'onChange',
  });

  return {
    hook,
    submit: hook.handleSubmit(props.onFormSubmit),
    submittable: useMemo(() => {
      const state = hook.formState;

      if (state.isDirty === false) {
        return false;
      }

      if (state.isValid === false) {
        return false;
      }

      return true;
    }, [hook.formState.isDirty, hook.formState.isValid]),
  };
};
