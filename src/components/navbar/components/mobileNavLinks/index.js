import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

import DefaultButton from '../../../../components/defaultButton';
import MenuToggle from "../menuToogle";

import { headerPaths } from '../../../../assets/constants/routingConstants';

import './styles.scss';

export default function MobileNavLinks({ role }) {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="navLinksContainer">
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {isOpen && (<div className="linksMobileWrapper">
                {
                    headerPaths.map(path => (path.role && path.role === role || !path.role) ? (
                        <NavLink
                        to={path.url}
                        className={({ isActive }) =>
                            isActive ? 'activeLink' : 'unactiveLink'
                        }
                    >
                        <div className="linkMobileItem">{path.name}</div>
                      </NavLink>
                    ) : <></>)
                }
                <div className="marginer" />
                <DefaultButton title="Login"/>
                <div className="marginer" />
            </div>)}
        </div>
    )
}