import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import { Button } from '../../../../components/button/Button';
import { FormForController } from '../../../../components/form/Form';
import { FormControl } from '../../../../components/form/control/FormControl';
import { FormControlErrorMessageForController } from '../../../../components/form/control/FormControlErrorMessage';
import { TextInputForController } from '../../../../components/form/element/input/TextInput';
import { Heading } from '../../../../components/text/Heading';
import { APP_HOSTNAME } from '../../../../helpers/url/url';
import { useCustomFormController } from '../../../../hooks/form/use-custom-form-controller';
import { isValidEmail } from '../../../../validators/email';

export type LoginPageFormFields = {
  readonly email: string;
  readonly password: string;
};

export type LoginPageProps = {
  readonly loading: boolean;
  readonly onUserLogin: (user: string, password: string) => Promise<void>;
};

export const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
  const controller = useCustomFormController<LoginPageFormFields>({
    onFormSubmit: async (data) => {
      return props.onUserLogin(data.email, data.password);
    },
  });

  return (
    <div
      className={clsx({
        'flex flex-col items-center mt-[100px]': true,
        'px-6 py-8 mx-auto md:h-screen lg:py-0': true,
      })}
    >
      <a className={'mb-6'} href={APP_HOSTNAME} title={'Goto TESSA app'}>
        <img className={'w-[200px]'} src="/logo.svg" alt="TESSA Logo" />
        <span className={'ml-3'}>Admin</span>
      </a>

      <div className={'w-full border rounded-lg xl:p-0 md:mt-0 sm:max-w-md shadow-md'}>
        <div className={'space-y-2 md:space-y-4 p-8'}>
          <Heading type={'h1'} label={'Sign in to your account'} />

          <FormForController
            controller={controller}
            submittable={props.loading === false}
            className={'space-y-2 md:space-y-4'}
          >
            <FormControl id={'email'} label={'Email Address'} required={true}>
              <TextInputForController
                controller={controller}
                id={'email'}
                type={'email'}
                loading={props.loading === true}
                rules={{
                  required: 'This field is required',
                  validate: {
                    required: (value) => isValidEmail(value) || 'Invalid email address',
                  },
                }}
              />

              <FormControlErrorMessageForController controller={controller} field={'email'} />
            </FormControl>

            <FormControl id={'password'} label={'Password'} required={true}>
              <TextInputForController
                controller={controller}
                id={'password'}
                type={'password'}
                loading={props.loading === true}
                rules={{
                  required: 'This field is required',
                }}
              />

              <FormControlErrorMessageForController controller={controller} field={'password'} />
            </FormControl>

            <Button
              type={'submit'}
              disabled={controller.submittable === false}
              label={'Login'}
              onButtonClick={async () => {
                return controller.submit();
              }}
            />
          </FormForController>
        </div>
      </div>
    </div>
  );
};
