import type { Meta, StoryFn } from '@storybook/react';
import { ComponentDisplayCase } from '../../testing/stories/ComponentDisplayCase';
import { Heading } from './Heading';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: Heading,
  args: {},
  argTypes: {},
} as Meta<typeof Heading>;

export const States: StoryFn<typeof Heading> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Example'}>
        <Heading type={'h1'} label={'This is a heading level one'} />
      </ComponentDisplayCase>
    </>
  );
};
