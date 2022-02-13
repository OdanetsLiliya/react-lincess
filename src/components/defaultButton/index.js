import React from 'react';
import classNames from "classnames";

import './styles.scss';

export default function DefaultButton({ title, isDark, isActive, onClick }) {
    return (
        <div className="buttonContainer">
            <div
            className={classNames("button", {
                darkActiveButton: isActive && isDark,
                darkButton: !isActive && isDark,
            })}
            onClick={onClick}
            >
                {title}
            </div>
        </div>
    )
}