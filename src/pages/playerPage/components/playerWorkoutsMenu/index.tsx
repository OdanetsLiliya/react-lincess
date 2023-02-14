import React, { useState, HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

import PlayerMenu from '../../../../assets/images/player-menu.svg';

import WorkoutType from './components/workoutType';
import Workout from './components/workout';
import PlayerWorkoutsMenuHeader from './components/playerWorkoutsMenuHeader';

import { Workout as WorkoutPropsType } from '../../../../types/workoutTypes';
import { WorkoutType as WorkoutTypePropsType } from '../../../../types/workoutTypeTypes';

/* const init_workouts: Array<WorkoutPropsType> = [
    {
      title: 'Тренировка осанка',
      id: 1,
      workout_type: 1,
      image_preview_url: previewSource,
      description: '53 мин. Убираем сутулость, раскрываем грудную клетку, формируем осанку, укрепляем мышцы спины, рук',
      video_url: videoSource
    }, {
      title: 'Тренировка осанка',
      id: 2,
      workout_type: 1,
      image_preview_url: previewSource,
      description: '54 мин. Работа с лопатками, убираем сутулость грудного отдела, укрепляем мышцы спины и рук',
      video_url: videoSource
    },
    {
      title: 'Тренировка осанка',
      id: 3,
      workout_type: 1,
      image_preview_url: previewSource,
      description: '54 мин. Работа с лопатками, убираем сутулость грудного отдела, укрепляем мышцы спины и рук',
      video_url: videoSource
    },
    {
      title: 'Тренировка осанка',
      id: 4,
      workout_type: 1,
      image_preview_url: previewSource,
      description: '54 мин. Работа с лопатками, убираем сутулость грудного отдела, укрепляем мышцы спины и рук',
      video_url: videoSource
    },
    {
      title: 'Тренировка осанка',
      id: 5,
      workout_type: 1,
      image_preview_url: previewSource,
      description: '54 мин. Работа с лопатками, убираем сутулость грудного отдела, укрепляем мышцы спины и рук',
      video_url: videoSource
    },
]; */

export interface PlayerEpisodeMenuPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    fastForward: () => void,
    isOpen: boolean;
    setIsOpen: (value: boolean) => void,
    currentWorkout: WorkoutPropsType;
    setCurrentWorkout: (workout: WorkoutPropsType) => void,
    currentWorkoutType: WorkoutTypePropsType;
    setCurrentWorkoutType: (workoutType: WorkoutTypePropsType) => void,
    refreshOrChageVideo: () => void,
}


const PlayerEpisodeMenu: React.FC<PlayerEpisodeMenuPropsType> = ({
    fastForward, currentWorkout, setCurrentWorkout, currentWorkoutType, setCurrentWorkoutType, isOpen, setIsOpen, refreshOrChageVideo
}) => {
    const [workoutTypes, setWorkoutTypes] = useState<Array<WorkoutTypePropsType>>([]);
    const [workouts, setWorkouts] = useState<Array<WorkoutPropsType>>([]);
    const [isWorkoutTypesVisible, setIsWorkoutTypesVisible] = useState(false);
    const [selectedWorkoutType, setSelectedWorkoutType] = useState(currentWorkoutType);

    const changeWorkoutTypesVisibility = (value) => {
        setIsWorkoutTypesVisible(value)
    }

    const onMouseLeave = () => {
        setSelectedWorkoutType(currentWorkoutType)
        changeWorkoutTypesVisibility(false)
        setIsOpen(false)
    }

    const onMouseMove = () => {
        setIsOpen(true)
    }

    const workoutsMenuHover = () => {
        setIsOpen(true)
    }

    const workoutsMenuUnhover = () => {
        setSelectedWorkoutType(currentWorkoutType)
        changeWorkoutTypesVisibility(false)
        setIsOpen(false)
    }

    const refreshOrChangeVideoCloseMenu = () => {
        refreshOrChageVideo();
        setIsOpen(false);
    }

    return (
        <div className="playerWorkoutContainer">
            <div
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseMove}
            >
                <img
                    className="playerMenuControlsIcon"
                    onClick={fastForward}
                    alt=""
                    src={PlayerMenu}
                />
            </div>

            <div
                className="workoutMenuHoverContainer"
                onMouseMove={workoutsMenuHover}
                onMouseLeave={workoutsMenuUnhover}
                hidden={!isOpen}
            >
                <div>
                    <PlayerWorkoutsMenuHeader
                        workoutType={selectedWorkoutType}
                        changeWorkoutTypesVisibility={changeWorkoutTypesVisibility}
                    />
                    <div
                        className="workoutMenu"
                    >
                        {!isWorkoutTypesVisible &&
                            <Workout
                                workouts={workouts}
                                currentWorkout={currentWorkout}
                                setCurrentWorkout={setCurrentWorkout}
                                init_workouts={[]}
                                setWorkouts={setWorkouts}
                                refreshOrChageVideo={refreshOrChangeVideoCloseMenu}
                            />
                        }
                        {isWorkoutTypesVisible &&
                            <WorkoutType
                                workoutTypes={workoutTypes}
                                setWorkoutTypes={setWorkoutTypes}
                                init_workout_types={[]}
                                changeWorkoutTypesVisibility={changeWorkoutTypesVisibility}
                                setWorkoutType={setSelectedWorkoutType}
                                workoutType={selectedWorkoutType}
                            />
                        }
                    </div>
                </div>

            </div>

        </div>
    );
};

export default PlayerEpisodeMenu;