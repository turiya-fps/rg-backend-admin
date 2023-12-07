import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

export type CardGroupItemProps = {
  property: string;
  value: string | boolean | JSX.Element;
  onInputChange?: (input: string) => void | undefined;
  isEditMode?: boolean;
};

export const CardGroupItem: FunctionComponent<CardGroupItemProps> = ({ property, value, onInputChange, isEditMode = false }) => {
  const [input, setInput] = useState<string>(value.toString());

  useEffect(() => {
    if (onInputChange !== undefined) {
      onInputChange(input);
    }
  }, [input]);

  return (
    <div className='pt-2 pb-2 pl-4 flex flex-row'>
      <div className='font-medium w-[150px]'>{property}</div>
      {(onInputChange === undefined || isEditMode=== false) && <div>{value}</div>}
      {onInputChange !== undefined && isEditMode === true && (
        <div className='flex flex-row'>
          <input className='p-[2px] pl-1 text-sm w-[200px]' onChange={(e) => setInput(e.target.value)} value={input}></input>
        </div>
      )}
    </div>
  );
};
