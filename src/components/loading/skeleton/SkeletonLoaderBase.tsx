import clsx from 'clsx';
import type { FunctionComponent } from 'react';

export const SkeletonLoaderBase: FunctionComponent = () => {
  return (
    <div className={'absolute bg-gray-50 w-full h-full'} role={'status'}>
      <div
        className={clsx({
          'absolute bg-gray-200 w-full h-full': true,
          'animate-pulse': true,
        })}
        role={'status'}
      >
        <span className={'sr-only'}>Loading</span>
      </div>
    </div>
  );
};
