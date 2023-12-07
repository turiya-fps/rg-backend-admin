import type { Meta, StoryFn } from '@storybook/react';
import { withRouterDecorator } from '../../../testing/decorators/with-router-decorator';
import { HeaderContainer } from './HeaderContainer';
import { HeaderNavigation } from './HeaderNavigation';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: HeaderNavigation,

  decorators: [
    withRouterDecorator(),
  ],

  args: {},
  argTypes: {},
} as Meta<typeof HeaderNavigation>;

export const Default: StoryFn<typeof HeaderNavigation> = () => {
  return (
    <HeaderContainer>
      <HeaderNavigation />
    </HeaderContainer>
  );
};
