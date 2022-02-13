import React, { useRef, useState } from 'react';
import './styles.scss'

import DefaultButton from '../../components/defaultButton';

const DetailedAnimePage = () => {
  return (
    <div className="animeInfoContainer">
      <div className="titleMenu">
        <div className="titleContainer">
          <div className="animeTitle">
            Наруто
          </div>
        </div>
        <div className="menuContainer">
          <div className="buttonMenu">
            <DefaultButton title="Об аниме" isDark={true} isActive={true} />
          </div>
          <div className="buttonMenu">
            <DefaultButton title="Список арок и эпизодов" isDark={true} />
          </div>
          <div className="buttonMenu">
            <DefaultButton title="Детали" isDark={true} />
          </div>
        </div>
        <div className="descriptionContainer">
          <div className="description">
            Познакомьтесь с Наруто Узумаки – юным ниндзя, которому предстоит пройти долгий путь к своей мечте. Однако для достижения любой цели нужны верные товарищи, которых Наруто предстоит обрести. Эта история о том, как найти в себе силы не сдаваться, когда никто вокруг не верит в успех. А ещё это исключительная и неповторимая в своём роде классика – самое занимательное приключение ниндзя всех времён!
          </div>
          <div className="buttonWatch">
            <DefaultButton title="Смотреть" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedAnimePage;