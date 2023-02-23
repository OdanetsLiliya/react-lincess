import * as Yup from 'yup';

export const objectValidationShema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Please enter an email address'),
    password: Yup.string()
        // eslint-disable-next-line
        .matches(/^[^<>#$@%&*(){}±§`~"\\|/\[\]]*$/)
        .required('Please enter the password')
})