import React, { useEffect } from 'react';
import classNames from "classnames";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import {
  useQueryParams,
  StringParam,
} from 'use-query-params';

import { RootStateType } from '../../stores';

import About from './components/About';
import Details from './components/Details';
import Workouts from '../../components/Workouts';
import DetailedMenu from './components/DetailedMenu';

import { coachesActions } from '../../globals/coaches/actions';

import './styles.scss';

const INITIAL_ACTIVE_KEY = 'about';
const SEC_ACTIVE_KEY = 'workouts';
const THIRD_ACTIVE_KEY = 'details';


const DetailedСoach = () => {
  const menuInfo = [{
    title: "О Тренере",
    value: INITIAL_ACTIVE_KEY,
    isActive: true
  },
  {
    title: "Тренировки",
    value: SEC_ACTIVE_KEY,
    isActive: false
  },
  {
    title: "Детали",
    value: THIRD_ACTIVE_KEY,
    isActive: false
  }];
  const dispatch = useDispatch();
  const params = useParams();

  let [query] = useQueryParams({
    tab: StringParam
  });

  const detailedCoach = useSelector((state: RootStateType) => state.coach?.detailedCoach);

  useEffect(() => {
    if (params.id) {
      dispatch(coachesActions.getCoachDetailed({ id: params.id }))
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);


  return (
    <div
      className={classNames("coachInfoContainer unselectableItems", {
        darkBackground: INITIAL_ACTIVE_KEY !== (query?.tab || INITIAL_ACTIVE_KEY),
      })}
    >
      <DetailedMenu
        INITIAL_ACTIVE_KEY={INITIAL_ACTIVE_KEY}
        menuInfo={menuInfo}
        query={query}
        title={detailedCoach?.title}
      />
      <About
        isAvailiable={(query?.tab || INITIAL_ACTIVE_KEY) === INITIAL_ACTIVE_KEY}
        about={detailedCoach?.about}
      />
      <Workouts
        isAvailiable={(query?.tab || INITIAL_ACTIVE_KEY) === SEC_ACTIVE_KEY}
      // coachID={detailedCoach.id}
      />
      <Details
        isAvailiable={(query?.tab || INITIAL_ACTIVE_KEY) === THIRD_ACTIVE_KEY}
        details={detailedCoach?.details}
      />
    </div>
  );
}

export default DetailedСoach;