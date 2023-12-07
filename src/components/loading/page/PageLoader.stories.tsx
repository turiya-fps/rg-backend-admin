import type { Meta, StoryFn } from '@storybook/react';
import { PageLoader } from './PageLoader';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: PageLoader,
  args: {},
  argTypes: {},
} as Meta<typeof PageLoader>;

export const Default: StoryFn<typeof PageLoader> = () => {
  return (
    <PageLoader />
  );
};
