import type { Meta, StoryFn } from '@storybook/react';
import { ComponentDisplayCase } from '../../../testing/stories/ComponentDisplayCase';
import { MicroButton } from './MicroButton';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: MicroButton,
  args: {},
  argTypes: {},
} as Meta<typeof MicroButton>;

export const States: StoryFn<typeof MicroButton> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Normal'}>
        <MicroButton label={'Lorem'} />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Disabled'}>
        <MicroButton label={'Lorem'} disabled={true} />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Active'}>
        <MicroButton label={'Lorem'} active={true} />
      </ComponentDisplayCase>
    </>
  );
};
