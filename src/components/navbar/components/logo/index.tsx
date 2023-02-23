import React from 'react';

import LogoImage from '../../../../assets/images/purple-heart.png';

import './styles.scss';

const Logo: React.FC = () => {
    return (
        <div className="logoWrapper">
            <div className="logoImg">
                <img src={LogoImage} alt="Logo"></img>
            </div>
            <div className="logoText">
                Lincess
            </div>
        </div>
    )
}

export default Logo;