import React from 'react';
import { useMediaQuery } from "react-responsive";

import { DeviceSize } from "../responsive";

import './styles.scss';

import Logo from './components/logo';
import NavLinks from './components/navLinks';
import MobileNavLinks from './components/mobileNavLinks';
import DefaultButton from '../../components/defaultButton';

export default function NavBar(props) {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    return (
        <div className="navBarContainer">
            <div className="leftSection">
                <Logo />
            </div>
            <div className="middleSection">
                {!isMobile && <NavLinks />}
            </div>
            <div className="rightSection">
                {!isMobile && <DefaultButton title="Login"/>}
                {isMobile && <MobileNavLinks />}
            </div>
        </div>
    )
}