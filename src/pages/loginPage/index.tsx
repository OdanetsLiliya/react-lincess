import React, { useState, useEffect } from 'react';
import { useForm, FieldValues } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';

import Logo from '../../assets/images/purple-heart.png';
import EmailIcon from '../../assets/images/email.svg';
import PasswordIcon from '../../assets/images/password-show.svg';
import ShowPasswordIcon from '../../assets/images/password-hide.svg';

import InputWithIcon from '../../components/InputWithIcon';
import DefaultButton from '../../components/defaultButton';

import { authActions } from '../../globals/auth/actions';

import { RootStateType } from '../../stores';
import { UserSignUpType } from '../../types/authTypes';

import { objectValidationShema } from './constants';

import './styles.scss';

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { isValid, errors } } = useForm({
        resolver: yupResolver(objectValidationShema),
        mode: 'onChange'
    });
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const history = useNavigate();
    const user = useSelector((state: RootStateType) => state.auth?.user);

    const onSubmit = (data: FieldValues) => {
        dispatch(authActions.logIn(({ ...data }) as UserSignUpType));
    }

    useEffect(() => {
        if (user?.id) {
            history('/coaches-list');
        }
    }, [history, user?.id])

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <div className="loginLogo">
                    <img src={Logo} alt="" className="loginLogoImage" />
                </div>
                <div className="loginLittleText">Private authentication</div>
                <div className="loginTitle">Welcome back to your Lincess Account</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputWithIcon
                        icon={EmailIcon}
                        label="email"
                        register={register}
                        isFormInput={true}
                        placeholder="Enter an email"
                        title="Authorized email"
                        autoComplete="on"
                        errorText={errors?.email?.message as string}
                    />
                    <InputWithIcon
                        icon={showPassword ? PasswordIcon : ShowPasswordIcon}
                        label="password"
                        register={register}
                        isFormInput={true}
                        placeholder="Enter your password"
                        title="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="on"
                        onClick={() => setShowPassword(!showPassword)}
                        errorText={errors?.password?.message as string}
                    />

                    <div className="loginArea">
                        <DefaultButton
                            title="Login"
                            style={
                                !isValid
                                    ? { opacity: 0.5, width: '118px' } : { width: '118px' }}
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>

                    <div className="loginOptionArea">
                        <div className="loginClickableOptions">Forgot your password?</div>
                        <div className="loginClickableOptions">Registration
                        </div>
                        <div className="loginTextOptions">Lincess © 2023</div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default LoginPage;