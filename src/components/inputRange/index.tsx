import React, { forwardRef, useState, useImperativeHandle, HTMLAttributes, DetailedHTMLProps, useEffect } from 'react';

import './styles.scss';
export interface InputRangePropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  Child?: React.ReactNode;
  onMouseMove?: (e: any) => void,
  onClick: (e: any) => void,
  onMouseLeave?: (e: any) => void,
  initialState?: number
  max?: number,
  setIsHovered?: (value: boolean) => void; 
}

const InputRange = forwardRef(({ Child, onMouseMove, onClick, onMouseLeave, initialState, max = 100, setIsHovered = () => {} }: InputRangePropsType, ref) => {
  const [savedValue, setSavedValue] = useState(initialState || 0);
  const [dragging, setDragging] = useState(false);

  useImperativeHandle(ref, () => ({
    setInputValue(val: number) {
      setSavedValue(val);
    },
    getIsDrag() {
      return dragging;
    }
  }));

  const onMouseLeaveRange = (e) => {
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  }

  const onMouseMoveRange = (e) => {
    if (onMouseMove) {
      onMouseMove(e);
    }
  }

  const onMouseUp = (event) => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    setDragging(false);
    setIsHovered(false);
  };

  const onMouseDown = (event) => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    setDragging(true);
    setIsHovered(true);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", () => onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []); 

  return (
    <div
      className="range"
      onMouseMove={onMouseMoveRange}
      onMouseLeave={onMouseLeaveRange}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <div className="progressBar">
        {Child}
        <div
          style={{ width: `${savedValue}%` }}
          className="active_progress"
        >
        </div>
        <div
          style={{ left: `calc(${savedValue}% - 10px*${(savedValue) / 100})` }}
          className="active_progress_point"
        >
        </div>
      </div>
    </div>)
});

export default InputRange;