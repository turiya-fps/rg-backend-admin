import type { FunctionComponent } from 'react';

type ToggleProps = {
  toggleValue: boolean;
  onToggleChange: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Toggle: FunctionComponent<ToggleProps> = ({ toggleValue, onToggleChange }) => {
  return (
    <div style={toggleValue ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }}>
      <div className='bg-neutral-100 p-0 m-0 leading-0'>
        <div className='relative w-[50px] h-[23px] bg-gray-300 cursor-pointer select-none rounded-md p-0' onClick={onToggleChange}>
          <div className={`h-[23px] w-[30px] pt-[3px] text-center font-semibold text-xs cursor-pointer text-white bg-pink-600 rounded-md absolute ${!toggleValue ? 'bg-gray-600 left-[20px]' : ''}`}>
            {toggleValue ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>
    </div>

  );
};
