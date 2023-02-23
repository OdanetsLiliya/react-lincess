import React, { useState, DetailedHTMLProps, HTMLAttributes } from "react";
import { NavLink } from 'react-router-dom';

import DefaultButton from '../../../defaultButton';
import MenuToggle from "../menuToogle";

import { headerPaths } from '../../../../assets/constants/routingConstants';

import './styles.scss';

export interface MobileNavLinksType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    role: string;
    onClick: () => void;
}

const MobileNavLinks: React.FC<MobileNavLinksType> = ({ role, onClick }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="navLinksMobileContainer">
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {isOpen && (<div className="linksMobileWrapper">
                {
                    headerPaths.map(path => ((path.role && path.role === role) || !path.role) ? (
                        <NavLink
                            to={path.url}
                            className={({ isActive }) =>
                                isActive ? 'activeLink' : 'unactiveLink'
                            }
                            key={path.url}
                            onClick={() => setOpen(false)}
                        >
                            <div className="linkMobileItem">{path.name}</div>
                        </NavLink>
                    ) : <></>)
                }
                <div className="marginer" />
                <DefaultButton title="Logout" onClick={onClick} />
                <div className="marginer" />
            </div>)}
        </div>
    )
}

export default MobileNavLinks;