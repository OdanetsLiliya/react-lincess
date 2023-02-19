import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from "classnames";

import './styles.scss';
export interface ButtonPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
    onClick?: () => void;
    isDark?: boolean;
    isActive?: boolean;
    style?: React.CSSProperties
}

const DefaultButton: React.FC<ButtonPropsType> = ({
    title,
    isDark = false,
    isActive = false,
    onClick,
    style = {}
}) => {
    return (
        <div className="buttonContainer">
            <div
                className={classNames("button", {
                    darkActiveButton: isActive && isDark,
                    darkButton: !isActive && isDark,
                })}
                style={{ ...style }}
                onClick={onClick}
            >
                {title}
            </div>
        </div>
    )
}

export default DefaultButton;