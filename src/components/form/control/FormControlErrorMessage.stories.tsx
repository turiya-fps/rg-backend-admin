import type { Meta, StoryFn } from '@storybook/react';
import { TextInput } from '../element/input/TextInput';
import { FormControlErrorMessage } from './FormControlErrorMessage';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: TextInput,
  args: {},
  argTypes: {},
} as Meta<typeof TextInput>;

export const Default: StoryFn<typeof TextInput> = () => {
  return (
    <FormControlErrorMessage message={'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout'} />
  );
};
