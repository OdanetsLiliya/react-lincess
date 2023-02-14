import { Routes, Route } from 'react-router-dom';
import classNames from "classnames";
import { useSelector } from 'react-redux';

import PlayerPage from '../../pages/playerPage';
import CoachesList from '../../pages/coachesList';
import DetailedCoachPage from '../../pages/detailedCoachPage';
import SartTest from '../../pages/startPage';
import LoginPage from '../../pages/loginPage';
import WorkoutsPage from '../../pages/workoutsPage';
import EditWorkoutPage from '../../pages/editWorkout';
import AdministrationPage from '../../pages/AdministrationPage';
import ErrorPage from '../../pages/ErrorPage';
import AddWorkoutPage from '../../pages/AddWorkout';

import RequireAuth from './components/requireAuth';
import RequireAdmin from './components/requireAdmin';

import { useBreadCrumbsRoutes } from '../../hooks/useBasePath';

import './styles.scss';

const Routing = ({ isNavbarRendering }) => {
  const user = useSelector((state) => state.auth?.user);
  const isBreadCrumbsRoutes = useBreadCrumbsRoutes();

  const privateRoutes = [
    {
      path: '/workout-player/:id',
      Component: PlayerPage
    },
    {
      path: '/coaches-list',
      Component: CoachesList
    },
    {
      path: '/detailed-coach/:id',
      Component: DetailedCoachPage
    },
    {
      path: '/dashboard-start',
      Component: SartTest
    },
    {
      path: '/workouts',
      Component: WorkoutsPage
    }
  ]

  const privateRoutesAdmin = [
    {
      path: '/workouts/edit-workout/:id',
      Component: EditWorkoutPage
    },
    {
      path: '/administration',
      Component: AdministrationPage
    },
    {
      path: '/administration/add-workout',
      Component: AddWorkoutPage
    }
  ]

  const publicRoutes = [
    {
      path: '/login',
      Component: LoginPage
    },
  ]

  return (
    <main className={classNames('', {
      rotesWithNavbar: isNavbarRendering,
      rotesWithNavbarAndBreads: isBreadCrumbsRoutes
    })}>
      <Routes>
        {privateRoutes.map(({ Component, ...routeParams }) =>
          <Route
            {...routeParams}
            key={routeParams.path}
            element={<RequireAuth userId={user?.id}
              Component={Component} />}
          />)}
        {privateRoutesAdmin.map(({ Component, ...routeParams }) =>
          <Route
            {...routeParams}
            key={routeParams.path}
            element={<RequireAdmin userRole={user?.role}
              Component={Component} />}
          />)}
        {publicRoutes.map(({ Component, ...routeParams }) =>
          <Route
            {...routeParams}
            key={routeParams.path}
            element={<Component />}
          />)}
        <Route
            path="*"
            element={<ErrorPage description="Страница не найдена. Обратитесь к администратору сайта."/>}
        />
      </Routes>
    </main>
  )
};

export default Routing;