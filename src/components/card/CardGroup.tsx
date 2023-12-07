import type { UserProfile } from '@project-rouge/service-user-client/resource/user';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Button } from '../button/Button';
import type { CardGroupItemProps } from './CardGroupItem';
import { CardGroupItem } from './CardGroupItem';

export type FormData =
  Record<string, unknown>[]
  & UserProfile;

export type CardGroupProps = {
  title?: string | undefined;
  items: CardGroupItemProps[];
  onSubmitForm?: () => void;
};

export const CardGroup: FunctionComponent<CardGroupProps> = ({ title, items, onSubmitForm }) => {
  const [isGroupEditMode, setIsGroupEditMode] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const onSubmit = () => {
    onSubmitForm?.();
    setIsGroupEditMode(false);
  };

  const onCancel = () => {
    setIsGroupEditMode(false);
    setCounter(counter + 1);
  };

  return (
    <>
      <div className='pl-8'>
        {title !== undefined && <div className='text-sm pt-7 pb-3 pl-0 text-slate-500'>{title?.toUpperCase()}</div>}
        <div>
          {items.map((item, index) => {
            return <CardGroupItem key={`${index}.${counter}`} property={item.property} value={item.value} onInputChange={item.onInputChange} isEditMode={isGroupEditMode}></CardGroupItem>;
          })}
        </div>
        {onSubmitForm !== undefined && isGroupEditMode === false && (
          <div className='flex flex-row'>
            <div className='ml-auto'>
              <Button
                type={'button'}
                label={'Edit'}
                disabled={false}
                onButtonClick={() => setIsGroupEditMode(true)}
              />
            </div>
          </div>
        )}
        {onSubmitForm !== undefined && isGroupEditMode === true && (
          <div className='flex flex-row'>
            <div className='ml-auto flex flex-row'>
              <div className='text-sm align-baseline mt-auto mb-1 font-semibold cursor-pointer text-gray-500 pr-5' onClick={() => onCancel()}>Cancel</div>
              <Button
                type={'button'}
                label={'Save'}
                disabled={false}
                onButtonClick={() => onSubmit()}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
