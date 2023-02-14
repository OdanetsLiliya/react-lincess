import React, { useEffect } from 'react';
import { useForm, FieldValues } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from "react-router-dom";

import InputWithIcon from '../../components/InputWithIcon';
import DefaultButton from '../../components/defaultButton';
import CustomSelect from '../../components/customSelect';
import CheckBox from '../../components/checkBox';

import { workoutActions } from '../../globals/workouts/actions';
import { filterActions } from '../../globals/filtersData/actions';

import { RootStateType } from '../../stores';

import { getFilterItem } from '../../utils/filters';

import Player from '../../pages/playerPage/components/player';

import { Workout } from '../../types/workoutTypes';
import { FilterType } from '../../types/filterTypes';
import { DictType } from '../../types/dictTypes';

import { commonShema, addShema } from './constants';

import './styles.scss';

const EditAddWorkout = ({
    isEdit = false
}) => {
    const { register, handleSubmit, formState: { isValid, errors }, setValue, trigger, watch } = useForm({
        resolver: yupResolver(isEdit ? commonShema : addShema),
        mode: 'onChange'
    });
    const formData = watch();
    const params = useParams();
    const dispatch = useDispatch();

    const detailedWorkout = useSelector((state: RootStateType) => state.workout?.detailedWorkout);
    const coachesOptions = useSelector((state: RootStateType) => state.filter?.coaches);
    const equipmentOptions = useSelector((state: RootStateType) => state.filter?.equipment);
    const workoutLevelOptions = useSelector((state: RootStateType) => state.filter?.workoutLevels);
    const workoutTypesOptions = useSelector((state: RootStateType) => state.filter?.workoutTypes);

    const onSubmit = (data: FieldValues) => {
        const equipments: Array<number> = [];
        Object.keys(data.equipment).forEach(eqKey => {
            if (data.equipment[eqKey]) {
                equipments.push(Number(eqKey))
            }
        })
        delete data.equipment;
        if (isEdit) {
            const dataToUpdate = ({
                ...data,
                equipments,
                coach: data.coach.value,
                workout_type: data.workout_type.value,
                level: data.level.value
            } as Workout)
            if (params.id) {
                dispatch(workoutActions.editWorkout({ id: params.id, data: dataToUpdate }))
            }
        } else {
            const dataToUpdate = ({
                ...data,
                equipments,
                coach: data.coach.value,
                workout_type: data.workout_type.value,
                level: data.level.value,
                previewTimecode: data.previewTimecode,
                outputFile: data.outputFile,
                video_url: data.video_url,
            } as Workout)
            console.log(dataToUpdate)
        }
    }

    const onCustomSelectChange = (field: string, value: FilterType | DictType) => {
        setValue(field, value);
        trigger();
    }

    useEffect(() => {
        if (isEdit) {
            if (params.id) {
                dispatch(workoutActions.getDetailedWorkout({ id: params.id }))
            }
            dispatch(filterActions.getAllFilterData({}));
        }
    }, [dispatch, params])

    useEffect(() => {
        if (isEdit) {
            if (Object.keys(detailedWorkout).length) {
                setValue('title', detailedWorkout.title);
                setValue('description', detailedWorkout.description);
                if (detailedWorkout.coach) {
                    setValue('coach', getFilterItem(detailedWorkout.coach));
                }
                if (detailedWorkout.workout_type) {
                    setValue('workout_type', getFilterItem(detailedWorkout.workout_type));
                }
                if (detailedWorkout.level) {
                    setValue('level', getFilterItem(detailedWorkout.level));
                }
                // to validate form initial state
                trigger();
            }
        }
    }, [detailedWorkout])

    useEffect(() => {
        if (isEdit) {
            if (equipmentOptions && Object.keys(detailedWorkout).length) {
                const equipmentDict = {};
                equipmentOptions.forEach((eq: FilterType) => {
                    if (detailedWorkout.equipments.find((oldEq: number) => oldEq === eq.value)) {
                        equipmentDict[eq.value] = true
                    } else {
                        equipmentDict[eq.value] = false
                    }
                })
                setValue('equipment', equipmentDict);
                // to validate form initial state
                trigger();
            }
        }
    }, [equipmentOptions, detailedWorkout])

    console.log(formData)

    return (
        <div className={`${isEdit ? 'editWorkoutContainer' : '' } editAddWorkoutContainer`}>
            <div className={`${isEdit ? 'editWorkoutForm' : 'addWorkoutForm'}`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`${isEdit ? '' : 'addWorkoutFormInputs'}`}>
                        <InputWithIcon
                            label="title"
                            register={register}
                            isFormInput={true}
                            placeholder="Введите название"
                            title="Название"
                            pattern={{}}
                            autoComplete="off"
                            errorText={errors?.title?.message as string}
                        />
                        <InputWithIcon
                            label="description"
                            register={register}
                            isFormInput={true}
                            placeholder="Введите описание"
                            title="Описание"
                            pattern={{}}
                            autoComplete="off"
                            errorText={errors?.description?.message as string}
                        />
                        {isEdit ? <></> : <>
                            <InputWithIcon
                                label="previewTimecode"
                                register={register}
                                isFormInput={true}
                                placeholder="Введите таймкод"
                                title="Таймкод (значение в секундах)"
                                pattern={{}}
                                autoComplete="off"
                                type='number'
                                errorText={errors?.previewTimecode?.message as string}
                            />
                            <InputWithIcon
                                label="outputFile"
                                register={register}
                                isFormInput={true}
                                placeholder="Введите название видеофайла"
                                title="Название видеофайла"
                                pattern={{}}
                                autoComplete="off"
                                errorText={errors?.outputFile?.message as string}
                            />
                            <InputWithIcon
                                label="video_url"
                                register={register}
                                isFormInput={true}
                                placeholder="Введите ссылку на видео файл"
                                title="Ссылка"
                                pattern={{}}
                                autoComplete="off"
                                errorText={errors?.video_url?.message as string}
                            />
                        </>}

                        <CustomSelect
                            selectedOption={formData.coach}
                            handleChange={(value) => onCustomSelectChange('coach', value)}
                            options={coachesOptions}
                            title="Тренер"
                            errorText={errors?.coach?.message as string}
                        />
                        <CustomSelect
                            selectedOption={formData.workout_type}
                            handleChange={(value) => onCustomSelectChange('workout_type', value)}
                            options={workoutTypesOptions}
                            title="Тип"
                            errorText={errors?.workout_type?.message as string}
                        />
                        <CustomSelect
                            selectedOption={formData.level}
                            handleChange={(value) => onCustomSelectChange('level', value)}
                            options={workoutLevelOptions}
                            title="Уровень"
                            errorText={errors?.level?.message as string}
                        />

                        <div>
                            <div className='inputWithIconTitle'>
                                Оборудование
                            </div>
                            <div className='equipmentContainer'>
                                {equipmentOptions.map((equipment: FilterType) => (
                                    <CheckBox
                                        key={equipment.value}
                                        label={equipment.label}
                                        value={formData.equipment ? formData.equipment[equipment.value] : false}
                                        setValue={(value) => onCustomSelectChange('equipment', { ...formData.equipment, [equipment.value]: value })}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="saveWorkout">
                        <DefaultButton
                            title="Сохранить"
                            style={
                                !isValid
                                    ? { opacity: 0.5, width: '118px', margin: '16px 0px' } : { width: '118px', margin: '16px 0px' }}
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </form>
            </div>
            {isEdit ? <div className='playerEditContainer'>
                <Player detailedWorkout={detailedWorkout} isSmall={true} />
            </div> : <></>}
        </div>
    )
}

export default EditAddWorkout;