import React from 'preact';
import { useState } from 'preact/hooks';

type Props = {
  checked: boolean,
  disabled?: boolean,
  textOn: string,
  textOff: string,
  onChange: (val: boolean) => void,
  className?: string;
};

const Switch = ({ checked, disabled, textOn, textOff, onChange, className }: Props) => {
  const handleCheckboxChange = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <div
      className={`bgaext_switch_container ${className || ''} ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} }`}
      onClick={handleCheckboxChange}
    >
      <div>
        <label className='bgaext_switch'>
          <span className="bgaext_slider round" />
        </label>
      </div>
      <span className='bgaext_switch_text'>
        {checked ? textOn : textOff}
      </span>
    </div>
  );
}

export default Switch
