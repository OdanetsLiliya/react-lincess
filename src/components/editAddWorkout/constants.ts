import * as Yup from 'yup';

export const commonShema = Yup.object().shape({
    title: Yup.string()
        .required('Введите название'),
    description: Yup.string()
        .required('Введите описание'),
    coach: Yup.object()
        .required('Выберите тренера'),
    workout_type: Yup.object()
        .required('Выберите тип'),
    level: Yup.object()
        .required('Выберите уровень'),
})

export const addShema = commonShema.concat(
    Yup.object().shape({
        previewTimecode: Yup.number()
            .typeError('Таймкод должен быть цифрой')
            .required('Введите таймкод'),
        outputFile: Yup.string()
            .required('Введите название видеофайла'),
        video_url: Yup.string()
            .required('Введите ссылку на видеофайл'),
    }))