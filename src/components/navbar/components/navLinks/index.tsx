import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';

import { headerPaths } from '../../../../assets/constants/routingConstants';

import './styles.scss';

export interface NavbarLinksType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    role: string;
}

const NavLinks: React.FC<NavbarLinksType> = ({ role }) => {
    return (
        <div className="navLinksContainer">
            <div className="linksWrapper">
                {
                    headerPaths.map(path => (path.role && path.role === role || !path.role) ? (
                        <NavLink
                        to={path.url}
                        className={({ isActive }) =>
                            isActive ? 'activeLink' : 'unactiveLink'
                        }
                    >
                        <div className="linkItem">{path.name}</div>
                      </NavLink>
                    ) : <></>)
                }
            </div>
        </div>
    )
}

export default NavLinks;