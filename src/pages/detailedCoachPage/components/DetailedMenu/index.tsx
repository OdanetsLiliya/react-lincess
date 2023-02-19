import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";

import DefaultButton from '../../../../components/defaultButton';

import './styles.scss';

export interface DetailedMenuPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  INITIAL_ACTIVE_KEY: string,
  menuInfo: Array<{
    title: string,
    value: string,
    isActive: boolean
  }>;
  query?: {
    tab: string | null | undefined
  };
  title: string
}

const DetailedMenu: React.FC<DetailedMenuPropsType> = ({
  INITIAL_ACTIVE_KEY,
  menuInfo,
  query,
  title
}) => {

  const renderMenu = () => (
    menuInfo.map((item) => (
      <div className="buttonMenu" key={item.value}>
        <Link to={`?tab=${item.value}`}>
          <DefaultButton
            title={item.title}
            isDark={item.value !== (query?.tab || INITIAL_ACTIVE_KEY)}
            isActive={item.value === (query?.tab || INITIAL_ACTIVE_KEY)} />
        </Link>
      </div>
    ))
  );

  return (

    <div
      className={classNames("coachTitleMenu", {
        animateTitleMenu: INITIAL_ACTIVE_KEY !== (query?.tab || INITIAL_ACTIVE_KEY),
        animateTitleMenuInit: INITIAL_ACTIVE_KEY === (query?.tab || INITIAL_ACTIVE_KEY),
      })}
    >
      <div className="coachTitleContainer">
        <div className="coachTitle">
          {title}
        </div>
      </div>
      <div className="coachMenuContainer">
        {renderMenu()}
      </div>
    </div>
  );
}

export default DetailedMenu;