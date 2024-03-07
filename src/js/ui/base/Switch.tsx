import React from "preact";
import { useState } from "preact/hooks";

type Props = {
  checked: boolean,
  textOn: string,
  textOff: string,
  onChange: (val: boolean) => void,
};

const Switch = ({ checked, textOn, textOff, onChange }: Props) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleCheckboxChange = () => {
    onChange(!isChecked)
    setIsChecked(!isChecked)
  }

  return (
    <div className="slider-container">
      <label className='switch'>
        <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
        <span className="slider round" />
      </label>
      <span className='switch-text'>
        {isChecked ? textOn : textOff}
      </span>
    </div>
  );
}

export default Switch
