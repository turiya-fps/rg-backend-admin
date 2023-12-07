import type { Meta, StoryFn } from '@storybook/react';
import { ComponentDisplayCase } from '../../testing/stories/ComponentDisplayCase';
import { Button } from './Button';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: Button,
  args: {},
  argTypes: {},
} as Meta<typeof Button>;

export const States: StoryFn<typeof Button> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Normal'}>
        <Button
          type={'button'}
          label={'Lorem'}
        />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Disabled'}>
        <Button
          type={'button'}
          label={'Lorem'}
          disabled={true}
        />
      </ComponentDisplayCase>
    </>
  );
};
