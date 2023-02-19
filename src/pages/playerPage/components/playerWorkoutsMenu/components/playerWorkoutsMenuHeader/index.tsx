import React, { HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

import { WorkoutType } from '../../../../../../types/workoutTypeTypes';

export interface PlayerWorkoutsMenuHeaderPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  changeWorkoutTypesVisibility: (value: boolean) => void
  workoutType: WorkoutType;
}

const PlayerWorkoutsMenuHeader: React.FC<PlayerWorkoutsMenuHeaderPropsType> = ({
  changeWorkoutTypesVisibility, workoutType
}) => (
  <div className="workoutMenuHeader">
    <div className="workoutHeaderTitle">
      {workoutType.title}
    </div>
    <div className="workoutHeaderButton" onClick={() => changeWorkoutTypesVisibility(true)}>
      Bсе типы тренировок
    </div>
  </div>
);

export default PlayerWorkoutsMenuHeader;