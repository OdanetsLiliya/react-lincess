import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import './styles.scss';

import Workouts from '../../components/Workouts';

const WorkoutsPage: React.FC = () => {
    const params = useParams();

    const dispatch = useDispatch();

    useEffect(() => {

    }, [dispatch, params])

    return <div className='workoutsPageContainer'>
        <Workouts
            isAvailiable={true} />
    </div>;
};

export default WorkoutsPage;