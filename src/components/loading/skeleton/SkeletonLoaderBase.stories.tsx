import type { Meta, StoryFn } from '@storybook/react';
import { SkeletonLoaderBase } from './SkeletonLoaderBase';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: SkeletonLoaderBase,
  args: {},
  argTypes: {},
} as Meta<typeof SkeletonLoaderBase>;

export const Default: StoryFn<typeof SkeletonLoaderBase> = () => {
  return (
    <div className={'relative'} style={{ width: 500, height: 500 }}>
      <SkeletonLoaderBase />
    </div>
  );
};
