import React, { useState, HTMLAttributes, DetailedHTMLProps, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../stores';

import { DictType } from '../../types/dictTypes';
import { Workout } from '../../types/workoutTypes';

import { workoutActions } from '../../globals/workouts/actions';
import { filterActions } from '../../globals/filtersData/actions';

import WorkoutCard from '../workoutCard';
import WorkoutsFilter from '../WorkoutsFilter';
import Pagination from '../pagination';

import './styles.scss';
export interface WorkoutsPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isAvailiable: boolean;
}

const Workouts: React.FC<WorkoutsPropsType> = ({ isAvailiable }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const workouts = useSelector((state: RootStateType) => state.workout?.workouts);
  const user = useSelector((state: RootStateType) => state.auth?.user);
  const selectedFilters = useSelector((state: RootStateType) => state.filter?.selectedFilters);

  const take = selectedFilters.take || 12;
  const [workoutTypeFilters, setWorkoutTypeFilters] = useState<DictType>(selectedFilters.workoutTypes);
  const [equipmentFilters, setEquipmentFilters] = useState<DictType>(selectedFilters.equipments);
  const [levelFilters, setLevelFilters] = useState<DictType>(selectedFilters.levels);
  const [page, setPage] = useState(selectedFilters.page || 0);

  const onFiltersUpdate = () => {
    dispatch(filterActions.selectFilters({
      page,
      take,
      levels: levelFilters,
      equipments: equipmentFilters,
      workoutTypes: workoutTypeFilters
    }));
  }

  const onSelectWorkout = (id: string | number) => {
    onFiltersUpdate();
    navigate(`/workout-player/${id}`);
  }

  const convertCheckBoxFilterToQuery = (queryName: string, filters: DictType) => {
    let queryToAdd = '';
    if (Object.keys(filters).length) {
      Object.keys(filters).map((key) => {
        const filter = filters[key];
        if (filter) {
          queryToAdd += `&${queryName}=${key}`
        }
      })
    }
    return queryToAdd;
  }

  const queryFiltersCreate = () => {
    let filter_query = '';
    filter_query += convertCheckBoxFilterToQuery('workout_type', workoutTypeFilters);
    filter_query += convertCheckBoxFilterToQuery('level', levelFilters);
    filter_query += convertCheckBoxFilterToQuery('equipments', equipmentFilters);
    return filter_query;
  }

  const getWorkoutsList = (page: number) => {
    const filter_query = queryFiltersCreate();
    dispatch(workoutActions.getWorkoutsList(`
    ${filter_query}
    &take=${take}
    &skip=${page * take}`));
  }

  useEffect(() => {
    if (selectedFilters.page) {
      getWorkoutsList(page);
    } else {
      setPage(0)
      getWorkoutsList(0);
    }
    dispatch(filterActions.clearFilters(null));
  }, [dispatch, workoutTypeFilters, equipmentFilters, levelFilters]);


  const handlePageClick = (selectedItem: {
    selected: number;
  }) => {
    setPage(selectedItem.selected);
    getWorkoutsList(selectedItem.selected);
  };


  return isAvailiable ?
    <div className='workoutsContainer'>
      <WorkoutsFilter
        workoutTypeFilters={workoutTypeFilters}
        setWorkoutTypeFilters={setWorkoutTypeFilters}
        equipmentFilters={equipmentFilters}
        setEquipmentFilters={setEquipmentFilters}
        levelFilters={levelFilters}
        setLevelFilters={setLevelFilters}
      />
      <div className='workoutsScroll'>
        <div className="workoutsListCards">
          {workouts?.items.map((data: Workout, idx: number) => (
            <WorkoutCard
              workout={data}
              key={idx}
              onClick={() => {
                if(data.id) {
                  onSelectWorkout(data.id)
                }
              }}
              onFiltersUpdate={onFiltersUpdate}
              isEdit={user?.role === 'admin'}
            />
          ))}
        </div>
        <Pagination
          pageCount={Math.ceil(workouts?.count / take)}
          handlePageClick={handlePageClick}
          forcePage={page}
        />
      </div>
    </div> : <></>;
};

export default Workouts;