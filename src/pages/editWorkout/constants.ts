import * as Yup from 'yup';

export const objectValidationShema = Yup.object().shape({
    title: Yup.string()
        .required('Please enter title'),
    description: Yup.string()
        .required('Please enter the description'),
    coach: Yup.object()
        .required('Please choose the coach'),
    workout_type: Yup.object()
        .required('Please choose the workout type'),
    level: Yup.object()
        .required('Please choose the level'),
})