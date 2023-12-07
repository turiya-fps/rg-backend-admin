import type { Meta, StoryFn } from '@storybook/react';
import { ComponentDisplayCase } from '../../../testing/stories/ComponentDisplayCase';
import { TextInput } from '../element/input/TextInput';
import { FormControl } from './FormControl';
import { FormControlErrorMessage } from './FormControlErrorMessage';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: TextInput,
  args: {},
  argTypes: {},
} as Meta<typeof TextInput>;

export const Default: StoryFn<typeof TextInput> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Normal'}>
        <FormControl label={'Lorem ipsum dolor sit amet'}>
          <TextInput
            id={'test-case-text'}
            type={'text'}
            placeholder={'It is a long established fact that a reader will be distracted ..'}
          />
        </FormControl>
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'With Error'}>
        <FormControl label={'Lorem ipsum dolor sit amet'}>
          <TextInput
            id={'test-case-text'}
            type={'text'}
            placeholder={'It is a long established fact that a reader will be distracted ..'}
          />

          <FormControlErrorMessage message={'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout'} />
        </FormControl>
      </ComponentDisplayCase>
    </>
  );
};
