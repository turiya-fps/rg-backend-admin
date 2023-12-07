import type { Meta, StoryFn } from '@storybook/react';
import { UserEmailInline } from './UserEmail';

/** @see https://storybook.js.org/docs/react/api/csf */
export default {
  component: UserEmailInline,

  args: {},
  argTypes: {},
} as Meta<typeof UserEmailInline>;

export const States: StoryFn<typeof UserEmailInline> = () => {
  return (
    <UserEmailInline user={{ id: '3e917427-e550-4913-a1bd-53d5cde8d3be', email: 'matt.rose@modulous.com' }} />
  );
};
