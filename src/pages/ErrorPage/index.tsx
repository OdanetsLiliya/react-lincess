import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import { useNavigate } from "react-router-dom";

import DefaultButton from '../../components/defaultButton';

import './styles.scss';
export interface ErrorPagePropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    description: string;
}

const ErrorPage: React.FC<ErrorPagePropsType> = ({ description }) => {
    const history = useNavigate();

    const onClick = () => {
        history(-1)
    }
    return <div className='permissionsDeniedContainer'>
        <div className='permissionsDeniedCard'>
            <div className='permissionsDeniedTitle'>Ошибка</div>
            <div className='permissionsDeniedDescr'>{description}</div>
            <DefaultButton
               title='Назад'
               onClick={onClick}
            />
        </div>
    </div>;
};

export default ErrorPage;