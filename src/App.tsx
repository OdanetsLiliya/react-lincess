import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import NavBar from './components/navbar';
import Loader from './components/loader';
import Routing from './components/routing';
import FlashMessage from './components/flashMessage';

import { appActions } from './globals/app/actions';

import { RootStateType, persistor } from './stores';

import './App.css';

function App() {
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const route = useSelector((state : RootStateType) => state?.app?.route);
  
  const isNavbarRendering = !(location.pathname.includes("/workout-player")
  || location.pathname.includes("/login")
  );

  useEffect(() => {
     if (route) {
       history(route);
       dispatch(appActions.setRoute(null))
     }
  }, [route, history, dispatch])

  return (
    <div className="App">
      <PersistGate loading={null} persistor={persistor}>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Loader />
          <FlashMessage />
          <NavBar isNavbarRendering={isNavbarRendering} />
          <Routing isNavbarRendering={isNavbarRendering} />
        </QueryParamProvider>
      </PersistGate>
    </div>
  );
}

export default App; 