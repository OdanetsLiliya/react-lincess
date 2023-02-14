import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "classnames";

import { WorkoutType } from '../../../../../../types/workoutTypeTypes';

import './styles.scss';

export interface WorkoutTypesPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    workoutTypes: Array<WorkoutType>,
    setWorkoutTypes:(value: Array<WorkoutType>) => void,
    init_workout_types: Array<WorkoutType>,
    changeWorkoutTypesVisibility: (value: boolean) => void,
    setWorkoutType: (value: WorkoutType) => void,
    workoutType: WorkoutType;
}

const WorkoutTypes: React.FC<WorkoutTypesPropsType> = ({
    workoutTypes,
    setWorkoutTypes,
    init_workout_types,
    changeWorkoutTypesVisibility,
    setWorkoutType,
    workoutType
}) => {
    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            setWorkoutTypes(workoutTypes.concat(init_workout_types))
        }, 1500);
    };

    const goToWorkouts = (item) => {
        setWorkoutType(item);
        changeWorkoutTypesVisibility(false);
    }

    return (
        <InfiniteScroll
          dataLength={workoutTypes.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {workoutTypes.map((item, index) => (
            <div
            key={index}
            className={classNames("workoutTypeContainer", {
                activeWorkoutType: item.id === workoutType.id
            })}
            onClick={() => goToWorkouts(item)}
            >
               <div className="workoutTypeTitle">
               {item.title}
               </div>
            </div>
          ))}
        </InfiniteScroll>
    );
};

export default WorkoutTypes;