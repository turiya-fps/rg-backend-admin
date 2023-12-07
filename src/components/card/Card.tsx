import type { FunctionComponent } from 'react';
import type { CardGroupProps } from './CardGroup';
import { CardGroup } from './CardGroup';

type CardProps = {
  heading: string;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  groups: CardGroupProps[];
};

export const Card: FunctionComponent<CardProps> = ({ heading, onClose, groups }) => {
  return (
    <div className='pl-16 pb-10 w-[650px]'>
      <a className='pl-4 cursor-pointer font-semibold text-teal-500' onClick={onClose}>Back to list</a>
      <h1 className='font-bold text-xl pl-4 pt-4 pb-10'>{heading}</h1>
      {groups.map((group, index) => {
        return (
          <CardGroup key={index} title={group.title} items={group.items} onSubmitForm={group.onSubmitForm}></CardGroup>
        );
      })}
    </div>
  );
};
