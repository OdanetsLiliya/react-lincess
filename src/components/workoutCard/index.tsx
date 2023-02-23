import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import { useNavigate } from 'react-router-dom';

import { Workout } from '../../types/workoutTypes';

import Edit from '../../assets/images/edit.svg';

import './styles.scss';


export interface WorkoutCardType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  workout: Workout
  onClick?: (data: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onFiltersUpdate: () => void;
  isEdit: boolean
}

const WorkoutCard: React.FC<WorkoutCardType> = ({
  workout, onClick, isEdit = false, onFiltersUpdate
}) => {
  const history = useNavigate();

  const onEdit = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onFiltersUpdate();
    event.stopPropagation();
    history(`/workouts/edit-workout/${workout.id}`);
  }

  return (
    <div
      className="defaultWorkoutCard" onClick={onClick}
      style={{ backgroundImage: 'url(\'' + workout.image_preview_url + '\')' }}
    >
      <video
        src={workout.video_preview_url}
        autoPlay={true}
        className='background-video'
        playsInline={true}
        muted={true}
        loop={true}
      />
      <div
        className="workoutTextContainer defaultTitleContainer"
      >
        <div className="defaultCardTitle">{workout.title}</div>
        {isEdit ? <div onClick={onEdit}>
          <img alt="" src={Edit} className="iconWorkoutCard" />
        </div> : <></>}
      </div>
      <div
        className="workoutTextContainer defaultDescriptionContainer"
      >
        <div className="defaultCardDesccription">{workout.description}</div>
      </div>

    </div>
  );
};

export default WorkoutCard;