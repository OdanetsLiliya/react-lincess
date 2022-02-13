import React, { forwardRef, useState, useImperativeHandle  } from 'react';

import './styles.scss';

const InputRange = forwardRef(({ Child, onMouseMove, onClick, onMouseLeave, initialState }, ref) => {
  const [savedValue, setSavedValue] = useState(initialState || 0);

  const onInput = (e) => {
    const newVal = Number(e.target.value);
    onClick(newVal)
    setSavedValue(newVal);
  }

  useImperativeHandle(ref, () => ({
    setInputValue(val) {
      setSavedValue(val);
    }
  }));

  return (
    <div className="range">
      <input
        type="range"
        step="1"
        min="0"
        max="100"
        value={savedValue}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onInput={onInput} />

      <div className="progressBar">
        <div
          style={{ width: `${savedValue}%` }}
          className="active_progress"
        >
        </div>
        <div
          style={{ left: `calc(${savedValue}% - 14px*${(savedValue) / 100})` }}
          className="active_progress_point"
        >
        </div>
        { Child }
      </div>

    </div>
  )
});

export default InputRange;