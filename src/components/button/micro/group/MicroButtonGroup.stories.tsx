import type { Meta, StoryFn } from '@storybook/react';
import { ComponentDisplayCase } from '../../../../testing/stories/ComponentDisplayCase';
import { MicroButton } from '../MicroButton';
import { MicroButtonGroup } from './MicroButtonGroup';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: MicroButtonGroup,
  args: {},
  argTypes: {},
} as Meta<typeof MicroButtonGroup>;


export const States: StoryFn<typeof MicroButtonGroup> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Normal'}>
        <MicroButtonGroup>
          <MicroButton label={'Hello'} />
          <MicroButton label={'World'} active={true} />
          <MicroButton label={'How'} />
          <MicroButton label={'Are'} />
          <MicroButton label={'You?'} />
        </MicroButtonGroup>
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Pagination'}>
        <MicroButtonGroup>
          <MicroButton label={'Previous'} />
          <MicroButton label={'1'} active={true} />
          <MicroButton label={'2'} />
          <MicroButton label={'Next'} />
        </MicroButtonGroup>
      </ComponentDisplayCase>
    </>
  );
};
