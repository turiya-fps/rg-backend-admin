import type { Meta, StoryFn } from '@storybook/react';
import { ComponentDisplayCase } from '../../../../testing/stories/ComponentDisplayCase';
import { TextInput } from './TextInput';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: TextInput,
  args: {},
  argTypes: {},
} as Meta<typeof TextInput>;

export const Types: StoryFn<typeof TextInput> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Text'}>
        <TextInput
          id={'test-case-text'}
          type={'text'}
          placeholder={'It is a long established fact that a reader will be distracted ..'}
        />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Email'}>
        <TextInput
          id={'test-case-email'}
          type={'email'}
          placeholder={'email@domain.com'}
        />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Password'}>
        <TextInput
          id={'test-case-password'}
          type={'password'}
          placeholder={'password'}
        />
      </ComponentDisplayCase>
    </>
  );
};

export const States: StoryFn<typeof TextInput> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Normal'}>
        <TextInput
          id={'test-case-normal'}
          type={'text'}
          placeholder={'It is a long established fact that a reader will be distracted ..'}
        />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Disabled'}>
        <TextInput
          id={'test-case-disabled'}
          type={'text'}
          placeholder={'It is a long established fact that a reader will be distracted ..'}
          disabled={true}
        />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Loading'}>
        <TextInput
          id={'test-case-loading'}
          type={'text'}
          placeholder={'It is a long established fact that a reader will be distracted ..'}
          loading={true}
        />
      </ComponentDisplayCase>
    </>
  );
};
