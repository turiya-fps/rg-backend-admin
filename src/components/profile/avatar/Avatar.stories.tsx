import type { Meta, StoryFn } from '@storybook/react';
import { ComponentDisplayCase } from '../../../testing/stories/ComponentDisplayCase';
import { Avatar } from './Avatar';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: Avatar,

  args: {},
  argTypes: {},
} as Meta<typeof Avatar>;

export const States: StoryFn<typeof Avatar> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Inline'}>
        <Avatar email={'matt.rose@modulous.com'} purpose={'inline'} />
        <Avatar email={'turiya.pearce-smith@modulous.com'} purpose={'inline'} />
        <Avatar email={'bob@bob.com'} purpose={'inline'} />
      </ComponentDisplayCase>
    </>
  );
};
