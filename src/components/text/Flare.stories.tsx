import type { Meta, StoryFn } from '@storybook/react';
import { ComponentDisplayCase } from '../../testing/stories/ComponentDisplayCase';
import { Flare } from './Flare';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: Flare,
  args: {},
  argTypes: {},
} as Meta<typeof Flare>;

export const States: StoryFn<typeof Flare> = () => {
  return (
    <>
      <ComponentDisplayCase label={'Variants'}>
        <Flare colour={'grey'} label={'There are many variations'} />
        <Flare colour={'yellow'} label={'There are many variations'} />
        <Flare colour={'green'} label={'There are many variations'} />
        <Flare colour={'blue'} label={'There are many variations'} />
        <Flare colour={'purple'} label={'There are many variations'} />
        <Flare colour={'red'} label={'There are many variations'} />
      </ComponentDisplayCase>

      <ComponentDisplayCase label={'Paragraph'}>
        There are many variations of passages of <Flare colour={'green'} label={'Lorem Ipsum'} /> available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
        All the <Flare colour={'blue'} label={'Lorem Ipsum'} /> generators on the Internet tend to repeat predefined <Flare colour={'grey'} label={'chunks'} /> as necessary, making this the first true generator on the Internet.
        It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
        The generated <Flare colour={'red'} label={'Lorem Ipsum'} /> is therefore always free from repetition, injected humour, or non-characteristic words etc.
      </ComponentDisplayCase>
    </>
  );
};
