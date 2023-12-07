import clsx from 'clsx';
import type { FunctionComponent } from 'react';

export type MicroButtonProps = {
  readonly label: string;
  readonly active?: boolean;
  readonly disabled?: boolean;

  readonly onPillClick?: () => void | Promise<void>;
};

export const MicroButton: FunctionComponent<MicroButtonProps> = (props) => {
  const isActive = props.active === true;
  const isDisabled = props.disabled === true;
  const isNormal = isActive === false && isDisabled === false;

  return (
    <a
      className={clsx({
        'relative inline-flex items-center px-2 py-1': true,
        'text-sm leading-tight': true,
        'bg-white border border-slate-300 text-slate-500': isNormal === true,
        'hover:bg-slate-100': isNormal === true,
        'hover:cursor-pointer': isDisabled === false,

        'hover:z-10': isNormal === true,
        'focus:z-30': isNormal === true,

        'bg-teal-50 border border-teal-500 text-teal-600 z-20': isActive === true,
        'hover:bg-teal-50 hover:text-teal-800': isActive === true,

        'bg-slate-50 border border-slate-300 text-slate-400 z-10': isDisabled === true,
        'hover:bg-slate-50': isDisabled === true,
      })}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.disabled === true) {
          return;
        }

        // eslint-disable-next-line no-void
        void props.onPillClick?.();
      }}
    >
      <span>{props.label}</span>
    </a>
  );
};
