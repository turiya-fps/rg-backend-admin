import clsx from 'clsx';
import type { FunctionComponent } from 'react';

export type FlareColours = (
  | 'grey'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'red'
);

type FlareProps = {
  readonly colour: FlareColours;
  readonly label: string;
};

/**
 * @see https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/labels
 */
export const Flare: FunctionComponent<FlareProps> = (props) => {
  return (
    <span className={clsx({
      'inline-block py-0.4 px-2 border rounded-full': true,
      'font-medium text-sm': true,

      'bg-neutral-50 border-neutral-100 text-neutral-500': props.colour === 'grey',
      'bg-amber-50 border-amber-100 text-amber-500': props.colour === 'yellow',
      'bg-emerald-50 border-emerald-100 text-emerald-500': props.colour === 'green',
      'bg-sky-50 border-sky-100 text-sky-500': props.colour === 'blue',
      'bg-purple-50 border-purple-100 text-purple-500': props.colour === 'purple',
      'bg-rose-50 border-rose-100 text-rose-500': props.colour === 'red',
    })}>
      {props.label}
    </span>
  );
};
