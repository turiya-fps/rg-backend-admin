import type { FunctionComponent } from 'react';
import type { BuildInformation } from '../../../hooks/use-build-information';
import { DateTimeText } from '../../data/date/DateTimeText';

type FooterProps = {
  readonly build: BuildInformation;
};

export const Footer: FunctionComponent<FooterProps> = (props) => {
  return (
    <div className={'fixed bg-teal-500 bottom-0 left-0 right-0 py-1 px-2'}>
      <div className={'text-xs text-teal-100'}>
        This is <u className={'text-teal-700'}>{props.build.environment ?? 'unknown'}</u> (<u className={'text-teal-700'}>#{props.build.id}</u>, <u className={'text-teal-700'}>{props.build.commit.substring(0, 8)}</u>), last built at <u className={'text-teal-700'}><DateTimeText format={'full'} date={props.build.at.toISOString()} /> UTC</u>

        {props.build.pullrequest > 0 && (
          <>
            {' '} to preview pull request <u className={'text-teal-700'}>#{props.build.pullrequest}</u> (<u className={'text-teal-700'}>{props.build.branch}</u>)
          </>
        )}
      </div>
    </div>
  );
};
