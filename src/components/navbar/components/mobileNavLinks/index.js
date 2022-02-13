import React, { useState } from "react";

import DefaultButton from '../../../../components/defaultButton';
import MenuToggle from "../menuToogle";

import './styles.scss';

export default function MobileNavLinks(props) {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="navLinksContainer">
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {isOpen && (<div className="linksMobileWrapper">
                <div className="linkMobileItem">
                   <div className="link" href="#">Link 1</div>
                </div>
                <div className="linkMobileItem">
                   <div className="link" href="#">Link 2</div>
                </div>
                <div className="linkMobileItem">
                   <div className="link" href="#">Link 3</div>
                </div>
                <div className="linkMobileItem">
                   <div className="link" href="#">Link 4</div>
                </div>
                <div className="marginer" />
                <DefaultButton title="Login"/>
                <div className="marginer" />
            </div>)}
        </div>
    )
}