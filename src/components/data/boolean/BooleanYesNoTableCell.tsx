import type { FunctionComponent } from 'react';
import type { ChoiceAlternative } from '../../../helpers/data/boolean';
import { chooseWithDefaults, createTextValueForBoolean } from '../../../helpers/data/boolean';
import type { FlareColours } from '../../text/Flare';
import { Flare } from '../../text/Flare';

export type BooleanYesNoTableCellProps = {
  readonly value: boolean;
  readonly flare?: boolean;
  readonly labels?: ChoiceAlternative<string>;
  readonly colours?: ChoiceAlternative<FlareColours>;
};

export const BooleanYesNoTableCell: FunctionComponent<BooleanYesNoTableCellProps> = (props) => {
  const label = createTextValueForBoolean(props.value, props.labels);

  if (props.flare === true) {
    return (
      <td className={'p-1 text-center w-[4rem]'}>
        <Flare
          colour={
            chooseWithDefaults(
              props.value,
              props.colours?.truthy,
              props.colours?.falsey,
              'green',
              'red',
            )
          }
          label={label}
        />
      </td>
    );
  }

  return (
    <td className={'p-1 text-center w-[4rem]'}>
      {label}
    </td>
  );
};
