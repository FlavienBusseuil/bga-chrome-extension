import React from 'preact';
import { useState } from 'preact/hooks';

type Props = {
  checked: boolean,
  textOn: string,
  textOff: string,
  onChange: (val: boolean) => void,
  className?: string;
};

const Switch = ({ checked, textOn, textOff, onChange, className }: Props) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleCheckboxChange = () => {
    onChange(!isChecked)
    setIsChecked(!isChecked)
  }

  return (
    <div className={`bgaext_switch_container ${className || ''}`}>
      <label className='bgaext_switch'>
        <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
        <span className="bgaext_slider round" />
      </label>
      <span className='bgaext_switch_text'>
        {isChecked ? textOn : textOff}
      </span>
    </div>
  );
}

export default Switch
