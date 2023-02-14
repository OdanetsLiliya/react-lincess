import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "classnames";

import './styles.scss';

import { Workout as WorkoutProps } from '../../../../../../types/workoutTypes';

export interface WorkoutPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    workouts: Array<WorkoutProps>,
    setWorkouts: (value: Array<WorkoutProps>) => void,
    init_workouts: Array<WorkoutProps>,
    setCurrentWorkout: (value: WorkoutProps) => void,
    currentWorkout: WorkoutProps,
    refreshOrChageVideo: () => void
}


const Workout: React.FC<WorkoutPropsType> = ({
    workouts,
    setWorkouts,
    init_workouts,
    setCurrentWorkout,
    currentWorkout,
    refreshOrChageVideo,
}) => {
    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        console.log('fetch more')
        setInterval(() => {
          setWorkouts(workouts.concat(init_workouts))
        }, 1500);
    };

    const chooseWorkout = (item) => {
      setCurrentWorkout(item);
      refreshOrChageVideo();
    }
    
    return (
        <InfiniteScroll
          dataLength={workouts.length}
          // onScroll={onScroll}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {workouts.map((item, index) => (
            <div
            key={index}
            className={classNames("workoutCard", {
                activeWorkout: item.id === currentWorkout.id
            })}
            onClick={() => chooseWorkout(item)}
            >
            <img src={item.image_preview_url} className="workoutPoster"/>
            <div className="workoutCardText">
            
            <div className="workoutCardDescription">{item.description}</div>
            </div>
            </div>
          ))}
        </InfiniteScroll>
    );
};

export default Workout;