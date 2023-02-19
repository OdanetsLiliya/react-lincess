import React from 'react';
import { useNavigate } from "react-router-dom";

import DefaultButton from '../../components/defaultButton';

import './styles.scss';

const AdministrationPage: React.FC = () => {
    const history = useNavigate();

    return <div className='administrationContainer'>
        <DefaultButton
            title="Добавить тренировку"
            onClick={() => history('/administration/add-workout')}
        />
    </div>
};

export default AdministrationPage;