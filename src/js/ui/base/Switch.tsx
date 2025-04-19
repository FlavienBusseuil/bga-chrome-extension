import '../../../css/switch.css';

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

  const fullClassName = `bgaext_switch_container ${className || ''} ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`;

  return (
    <div className={fullClassName} onClick={handleCheckboxChange}>
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
