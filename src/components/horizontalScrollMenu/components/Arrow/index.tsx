import React, { HTMLAttributes, DetailedHTMLProps } from 'react';

import PrevNextIcon from "../../../../assets/images/prev-next-icon.svg";

import './styles.scss';

export interface ArrowPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  disabled: boolean;
  onClick: () => void;
  left?: boolean
}

const Arrow: React.FC<ArrowPropsType> = ({
  disabled, onClick, left
}) => (
  <div onClick={onClick} className="arrowContainer">
    <img
      className="arrowIcon"
      alt=""
      src={PrevNextIcon}
      style={{
        transform: `rotate(${left ? '-90deg' : '90deg'})`,
        opacity: disabled ? "0" : "1",
      }}
    />
  </div>
)

export default Arrow;