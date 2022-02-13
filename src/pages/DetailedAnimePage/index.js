import React, { useRef, useState } from 'react';
import './styles.scss'
import classNames from "classnames";

import DefaultButton from '../../components/defaultButton';
import About from './components/About';
import Details from './components/Details';

const DetailedAnimePage = () => {
  const menuInfo = [{
    title: "Об аниме",
    value: "about_anime",
    isActive: true
  },
  {
    title: "Арки и эпизоды",
    value: "episodes",
    isActive: false
  },
  {
    title: "Детали",
    value: "details",
    isActive: false
  }
  ];
  const INITIAL_ACTIVE_KEY = 0;
  const [menuActiveKey, setMenuActiveKey] = useState(INITIAL_ACTIVE_KEY)

  const pressMenuButton = (idx) => {
    setMenuActiveKey(idx)
  }

  const renderMenu = () => (
    menuInfo.map((item, idx) => (
      <div className="buttonMenu" key={item.title}>
        <DefaultButton title={item.title} isDark={idx !== menuActiveKey} isActive={idx === menuActiveKey} onClick={() => pressMenuButton(idx)} />
      </div>
    ))
  );

  return (
    <div
      className={classNames("animeInfoContainer", {
        darkBackground: INITIAL_ACTIVE_KEY !== menuActiveKey,
        detailsSelected: menuInfo[menuActiveKey].value === 'details'
      })}
    >
     
      <div
        className={classNames("titleMenu", {
          animateTitleMenu: INITIAL_ACTIVE_KEY !== menuActiveKey,
          animateTitleMenuInit: INITIAL_ACTIVE_KEY === menuActiveKey,
        })}
      >
        <div className="titleContainer">
          <div className="animeTitle">
            Наруто
          </div>
        </div>
        <div className="menuContainer">
          {renderMenu()}
        </div>
        </div>
        <About isAvailiable={INITIAL_ACTIVE_KEY === menuActiveKey}/>
        <Details isAvailiable={menuInfo[menuActiveKey].value === 'details'}/>
    </div>
  );
}

export default DetailedAnimePage;