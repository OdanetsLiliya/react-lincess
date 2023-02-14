import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import { useMediaQuery } from "react-responsive";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Logo from './components/logo';
import NavLinks from './components/navLinks';
import MobileNavLinks from './components/mobileNavLinks';
import DefaultButton from '../defaultButton';
import BreadCrumbs from './components/breadCrumbs';

import { authActions } from '../../globals/auth/actions';

import { RootStateType } from '../../stores';

import { DeviceSize } from "../responsive";

import './styles.scss';

export interface NavbarPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isNavbarRendering: boolean;
}

const NavBar: React.FC<NavbarPropsType> = ({ isNavbarRendering }) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

    const user = useSelector((state : RootStateType) => state.auth?.user);

    const onClick = () => {
        if (user.id){
            dispatch(authActions.logOut({ id: user.id }));
        } else {
            history('/login');
        }
    }

    return isNavbarRendering ? (
        <div className="fixedHeader">
         <div className="navBarContainer">
            <div className="leftSection">
                <Logo />
            </div>
            <div className="middleSection">
                {!isMobile && <NavLinks role={user.role} />}
            </div>
            <div className="rightSection">
                {!isMobile && <DefaultButton
                    title={user?.id ? `Logout` : `Login`}
                    onClick={onClick}
                />}
                {isMobile && <MobileNavLinks role={user.role} onClick={onClick} />}
            </div>
        </div>
        <BreadCrumbs />
        </div>
    ) : <></>
}

export default NavBar;