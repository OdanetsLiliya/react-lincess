import React from 'react';

import './styles.scss';
import LogoImage from '../../../../assets/images/logo.png';

export default function Logo(props) {
    return (
        <div className={logoWrapper}>
            <div className={logoImg}>
                <img src={LogoImage} alt="Anime logo"></img>
            </div>
            <div className={logoText}>
                Anime Logo
            </div>
        </div>
    )
}