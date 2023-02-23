import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import { useNavigate } from "react-router-dom";

import './styles.scss';

export interface CoachCardPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  image_url: string;
  coachId: number;
}

const CoachCard: React.FC<CoachCardPropsType> = ({
  title, image_url, coachId
}) => {
  const navigate = useNavigate();

  const onSelectCoach = () => {
    navigate(`/detailed-coach/${coachId}`);
  }

  return <div className="defaultCoachCard" onClick={onSelectCoach}
    style={{ backgroundImage: 'url(\'' + image_url + '\')' }}
  >
    <div className="defaultCoachInfo">
      <div
        className="defaultCoachDescription"
      >
        {title}
      </div>

    </div>
  </div>
};

export default CoachCard;