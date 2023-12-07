import type { InitialEntry } from '@remix-run/router';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

type GivenComponent = () => ReactElement;

/**
 * A storybook decorator factory that will supply a {@link MemoryRouter}.
 */
export const withRouterDecorator = (initial?: InitialEntry) => {
  return function withRouterDecorator(component: GivenComponent): ReactElement {
    return (
      <MemoryRouter
        initialIndex={0}
        initialEntries={
          initial === undefined
            ? undefined
            : [initial]
        }
      >
        {component()}
      </MemoryRouter>
    );
  };
};
