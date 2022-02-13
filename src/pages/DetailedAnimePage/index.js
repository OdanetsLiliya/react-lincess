import React, { useRef, useState } from 'react';
import './styles.scss'
import classNames from "classnames";

import DefaultButton from '../../components/defaultButton';

const DetailedAnimePage = () => {
  const menuInfo = [{
    title: "Об аниме",
    isActive: true
  },
  {
    title: "Список арок и эпизодов",
    isActive: false
  },
  {
    title: "Детали",
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
        { INITIAL_ACTIVE_KEY === menuActiveKey && <div className="descriptionContainer">
          <div className="description">
            Познакомьтесь с Наруто Узумаки – юным ниндзя, которому предстоит пройти долгий путь к своей мечте. Однако для достижения любой цели нужны верные товарищи, которых Наруто предстоит обрести. Эта история о том, как найти в себе силы не сдаваться, когда никто вокруг не верит в успех. А ещё это исключительная и неповторимая в своём роде классика – самое занимательное приключение ниндзя всех времён!
          </div>
          <div className="buttonWatch">
            <DefaultButton title="Смотреть" />
          </div>
        </div> }
    </div>
  );
}

export default DetailedAnimePage;