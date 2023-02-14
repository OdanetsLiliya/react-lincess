import React, { HTMLAttributes, DetailedHTMLProps, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../stores';

import { FilterType } from '../../types/filterTypes';
import { DictType } from '../../types/dictTypes';

import { filterActions } from '../../globals/filtersData/actions';

import './styles.scss';
import CheckBox from '../checkBox';
import InputWithIcon from '../InputWithIcon';


export interface WorkoutsFilterPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  workoutTypeFilters: DictType,
  setWorkoutTypeFilters: (filters: DictType) => void,
  equipmentFilters: DictType,
  setEquipmentFilters: (filters: DictType) => void,
  levelFilters: DictType,
  setLevelFilters: (filters: DictType) => void,
}

const WorkoutsFilter: React.FC<WorkoutsFilterPropsType> = ({
  workoutTypeFilters,
  setWorkoutTypeFilters,
  equipmentFilters,
  setEquipmentFilters,
  levelFilters,
  setLevelFilters,
}) => {
  const dispatch = useDispatch();

  const equipmentOptions = useSelector((state: RootStateType) => state.filter?.equipment);
  const workoutLevelOptions = useSelector((state: RootStateType) => state.filter?.workoutLevels);
  const workoutTypesOptions = useSelector((state: RootStateType) => state.filter?.workoutTypes);

  useEffect(() => {
    dispatch(filterActions.getAllFilterData({}));
  }, [dispatch]);

  const updateFilter = (
    filters: DictType,
    setFilters: (filters: DictType) => void,
    id: string | number,
    value: boolean
  ) => {
    setFilters({
      ...filters,
      [id]: value
    })
  }

  return <div className='workoutsFilter'>
    <div className='inputContainerFilters'>
      <InputWithIcon
        label="search"
        isFormInput={true}
        placeholder="поиск..."
        autoComplete="off"
      />
    </div>
    <div className='workoutsFilterTitle'>
      Типы тренировок
    </div>
    {workoutTypesOptions.map((workoutType: FilterType) => (
      <CheckBox
        key={workoutType.label}
        label={workoutType.label}
        value={workoutTypeFilters[workoutType.value] || false}
        setValue={(value) => updateFilter(workoutTypeFilters, setWorkoutTypeFilters, workoutType.value, value)}
      />
    ))}
    <div className='workoutsFilterTitle'>
      Уровень
    </div>
    {workoutLevelOptions.map((level: FilterType) => (
      <CheckBox
        key={level.label}
        label={level.label}
        value={levelFilters[level.value] || false}
        setValue={(value) => updateFilter(levelFilters, setLevelFilters, level.value, value)}
      />
    ))}
    <div className='workoutsFilterTitle'>
      Оборудование
    </div>
    {equipmentOptions.map((equipment: FilterType) => (
      <CheckBox
        key={equipment.label}
        label={equipment.label}
        value={equipmentFilters[equipment.value] || false}
        setValue={(value) => updateFilter(equipmentFilters, setEquipmentFilters, equipment.value, value)}
      />
    ))}
  </div>;
};

export default WorkoutsFilter;