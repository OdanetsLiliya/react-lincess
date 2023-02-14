import React, { forwardRef, useState, useImperativeHandle, HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

export interface InputRangePropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  Child?: React.ReactNode;
  onMouseMove?: (e: any) => void,
  onClick: (e: any) => void,
  onMouseLeave?: (e: any) => void,
  initialState?: number
  max?: number
}

const InputRange = forwardRef(({ Child, onMouseMove, onClick, onMouseLeave, initialState, max = 100 }: InputRangePropsType, ref) => {
  const [savedValue, setSavedValue] = useState(initialState || 0);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    onClick(newVal)
    setSavedValue(newVal);
  }

  useImperativeHandle(ref, () => ({
    setInputValue(val: number) {
      setSavedValue(val);
    }
  }));

  return (
    <div className="range">
      <progress
        id="progress-bar"
        value={savedValue}
        max={Math.floor(max)}
      >
      </progress>
      <input
        className='rangeInput'
        type="range"
        step="1"
        min="0"
        max={Math.floor(max)}
        value={savedValue}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onInput={onInput} />

      <div className="progressBar">
        {/* <div
          style={{ width: `${savedValue}%` }}
          className="active_progress"
        >
        </div>
        <div
          style={{ left: `calc(${savedValue}% - 14px*${(savedValue) / 100})` }}
          className="active_progress_point"
        >
        </div>  */}
        {Child}
      </div>

    </div>
  )
});

export default InputRange;