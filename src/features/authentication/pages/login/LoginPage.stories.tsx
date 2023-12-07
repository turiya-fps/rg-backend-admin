import type { Meta, StoryFn } from '@storybook/react';
import { LoginPage } from './LoginPage';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: LoginPage,
  args: {},
  argTypes: {},
} as Meta<typeof LoginPage>;

export const Page: StoryFn<typeof LoginPage> = () => {
  return (
    <LoginPage
      loading={false}
      onUserLogin={async (data) => {
        // eslint-disable-next-line no-console
        console.log({ data });
      }}
    />
  );
};

export const PageInLoadingState: StoryFn<typeof LoginPage> = () => {
  return (
    <LoginPage
      loading={true}
      onUserLogin={async (data) => {
        // eslint-disable-next-line no-console
        console.log({ data });
      }}
    />
  );
};
