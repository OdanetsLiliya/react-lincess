import React from 'react';

import './styles.scss';

export default function NavLinks(props) {
    return (
        <div className="navLinksContainer">
            <div className="linksWrapper">
                <div className="linkItem">
                   <div className="link" href="#">Link 1</div>
                </div>
                <div className="linkItem">
                   <div className="link" href="#">Link 2</div>
                </div>
                <div className="linkItem">
                   <div className="link" href="#">Link 3</div>
                </div>
                <div className="linkItem">
                   <div className="link" href="#">Link 4</div>
                </div>
            </div>
        </div>
    )
}