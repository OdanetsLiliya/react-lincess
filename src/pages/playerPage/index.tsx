import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import './styles.scss';

import { RootStateType } from '../../stores';

import { workoutActions } from '../../globals/workouts/actions';
import Player from './components/player';

const PlayerPage: React.FC = () => {
    const params = useParams();

    const dispatch = useDispatch();
    const detailedWorkout = useSelector((state: RootStateType) => state.workout?.detailedWorkout);

    useEffect(() => {
        if (params.id) {
            dispatch(workoutActions.getDetailedWorkout({ id: params.id }))
        }
    }, [dispatch, params])

    return <Player detailedWorkout={detailedWorkout}/>;
};

export default PlayerPage;