import React from 'react';
import { useNavigate } from "react-router-dom";

import CloseIcon from '../../../../assets/images/close.svg';

import './styles.scss';

const TopPlayerMenu = ({ 
    title,
    isEpisodeMenuOpen,
    playing,
    onClick
}) => {
    const navigate = useNavigate();

    return (
        <div
        className={`topPlayerMenu ${playing && !isEpisodeMenuOpen ? 'animate' : ''}`}
        style={{ opacity: 1}}
        onClick={onClick}
        >
            <img
                onClick={() => navigate(-1)}
                className="closeControlsIcon"
                alt=""
                src={CloseIcon}
            />
            <div className="videoTitle">{title}</div>
        </div>
    );
};

export default TopPlayerMenu;