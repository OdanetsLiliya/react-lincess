import React, { forwardRef, useState, useImperativeHandle, HTMLAttributes, DetailedHTMLProps, useEffect } from 'react';

import './styles.scss';
export interface InputRangePropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  Child?: React.ReactNode;
  onMouseMoveHandle: (e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => void;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  initialState?: number
  max?: number,
  setIsHovered?: (value: boolean) => void;
}
export interface InputRangeHandle
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setInputValue: (e: number) => void,
  getIsDrag: () => boolean,
}

const InputRange = forwardRef(({
  Child,
  onMouseMoveHandle,
  onClick,
  onMouseLeave,
  initialState,
  max = 100,
  setIsHovered = () => { }
}: InputRangePropsType,
  ref: React.Ref<InputRangeHandle>
) => {
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

  const onMouseLeaveRange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  }

  const onMouseMoveRange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onMouseMoveHandle) {
      onMouseMoveHandle(e);
    }
  }

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMoveHandle);
    document.removeEventListener("mouseup", onMouseUp);
    setDragging(false);
    setIsHovered(false);
  };

  const onMouseDown = () => {
    document.addEventListener("mousemove", onMouseMoveHandle);
    document.addEventListener("mouseup", onMouseUp);
    setDragging(true);
    setIsHovered(true);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", onMouseMoveHandle);
      document.removeEventListener("mouseup", onMouseUp);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
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