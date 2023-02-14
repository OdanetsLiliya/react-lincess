import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from "react-transition-group";

import { appActions } from '../../globals/app/actions';

import CloseIcon from '../../assets/images/close.svg';

import './styles.scss';

const Message = () => {
    const isShowMessage = useSelector((state) => state.app.isShowMessage);
    const message = useSelector((state) => state.app.message);
    const dispatch = useDispatch();

    const onExitFlash = () => {
        dispatch(appActions.setMessage({
            isShowMessage: false,
            message: ''
        }))
    }

    useEffect(() => {
        if (isShowMessage) {
          const timeout = setTimeout(() => onExitFlash(), 1000);
          return () => {
            clearTimeout(timeout);
          };
        }
      }, [isShowMessage]);

    return <CSSTransition
        in={isShowMessage}
        timeout={100}
        classNames="flashContainer"
        unmountOnExit
        onExit={onExitFlash}
    >
        <div className="flashContainer">
            <div className="flashMessage">{message}</div>
            <img
               alt=""
               src={CloseIcon}
               className="flashClose"
               onClick={onExitFlash}
            />
        </div>
    </CSSTransition>
}

export default Message;