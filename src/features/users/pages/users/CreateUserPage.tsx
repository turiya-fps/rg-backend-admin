import { isHttpResponseIdentifier } from '@project-rouge/service-core/http/endpoint';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/button/Button';
import { FormForController } from '../../../../components/form/Form';
import { FormControl } from '../../../../components/form/control/FormControl';
import { FormControlErrorMessage, FormControlErrorMessageForController } from '../../../../components/form/control/FormControlErrorMessage';
import { TextInputForController } from '../../../../components/form/element/input/TextInput';
import { Heading } from '../../../../components/text/Heading';
import { generatePassword } from '../../../../helpers/password/password';
import { usePostUserQuery } from '../../../../hooks/api/user/post-user';
import { useCustomFormController } from '../../../../hooks/form/use-custom-form-controller';
import { isValidEmail } from '../../../../validators/email';

export type CreateUserPageFormFields = {
  readonly firstName: string;
  readonly lastName: string;
  readonly companyName: string;
  readonly companyJobTitle: string;
  readonly email: string;
  readonly password: string;
};

export const UserCreatePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const postUserQuery = usePostUserQuery();
  const [submitErrorText, setSubmitErrorText] = useState<string | undefined>(undefined);

  const onCloseForm = () => {
    navigate('/users');
  };

  const controller = useCustomFormController<CreateUserPageFormFields>({
    onFormSubmit: async (data) => {
      const response = await postUserQuery.make({
        email: data.email.trim(),
        password: generatePassword(),
        profile: {
          name_first: data.firstName,
          name_last: data.lastName,
          company_name: data.companyName,
          company_job_title: data.companyJobTitle,
        },
      });

      if (isHttpResponseIdentifier(response, 'success:created:user')) {
        onCloseForm();
      } else if (isHttpResponseIdentifier(response, 'failure:invalid:user:email')) {
        setSubmitErrorText('Email address already exists');
      } else {
        setSubmitErrorText('There was an error creating the user');
      }
    },
  });

  return (
    <FormForController
      controller={controller}
      submittable={postUserQuery.is.loading === false}
    >
      <div className='pl-4 w-[400px]'>
        <Heading type={'h1'} label={'Create a new user'} />

        {submitErrorText !== undefined && (
          <FormControlErrorMessage message={submitErrorText} />
        )}

        <FormControl id={'email'} label={'Email'} required={true}>
          <TextInputForController
            controller={controller}
            id={'email'}
            type={'email'}
            loading={postUserQuery.is.loading === true}
            rules={{
              required: 'This field is required',
              validate: {
                required: (value) => isValidEmail(value) || 'Invalid email address',
              },
            }}
          />

          <FormControlErrorMessageForController controller={controller} field={'email'} />
        </FormControl>

        <FormControl id={'firstName'} label={'First Name'} required={true}>
          <TextInputForController
            controller={controller}
            id={'firstName'}
            type={'text'}
            loading={postUserQuery.is.loading === true}
            rules={{
              required: 'This field is required',
            }}
          />

          <FormControlErrorMessageForController controller={controller} field={'firstName'} />
        </FormControl>

        <FormControl id={'lastName'} label={'Last Name'} required={true}>
          <TextInputForController
            controller={controller}
            id={'lastName'}
            type={'text'}
            loading={postUserQuery.is.loading === true}
            rules={{
              required: 'This field is required',
            }}
          />

          <FormControlErrorMessageForController controller={controller} field={'lastName'} />
        </FormControl>

        <FormControl id={'companyName'} label={'Company Name'} required={true}>
          <TextInputForController
            controller={controller}
            id={'companyName'}
            type={'text'}
            loading={postUserQuery.is.loading === true}
            rules={{
              required: 'This field is required',
            }}
          />

          <FormControlErrorMessageForController controller={controller} field={'companyName'} />
        </FormControl>

        <FormControl id={'companyJobTitle'} label={'Company Job Title'} required={true}>
          <TextInputForController
            controller={controller}
            id={'companyJobTitle'}
            type={'text'}
            loading={postUserQuery.is.loading === true}
            rules={{
              required: 'This field is required',
            }}
          />

          <FormControlErrorMessageForController controller={controller} field={'companyJobTitle'} />
        </FormControl>
      </div>

      <div className='pl-4 w-[400px]'>
        <Button
          type={'submit'}
          disabled={controller.submittable === false}
          label={'Create'}
          onButtonClick={async () => {
            return controller.submit();
          }}
        />

        <Button
          type={'button'}
          label={'Cancel'}
          onButtonClick={async () => {
            return onCloseForm();
          }}
        />
      </div>
    </FormForController>
  );
};
