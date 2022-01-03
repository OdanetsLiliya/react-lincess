import React from 'react';

import './styles.scss';

import Logo from './components/logo';

export default function NavBar(props) {
    return (
        <div className={navBarContainer}>
            <div className={leftSection}>
                <Logo />
            </div>
            <div className={middleSection}></div>
            <div className={rightSection}></div>
        </div>
    )
}