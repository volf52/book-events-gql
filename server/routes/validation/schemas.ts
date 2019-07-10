import * as Yup from 'yup';
import { RegisterData } from '../types';

export const RegisterSchema: Yup.ObjectSchema<
    Yup.Shape<object, RegisterData>
> = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(2, 'Too short')
        .max(30, 'Too long')
        .matches(/\d/, 'Password must contain atleast one number')
        .matches(/[a-zA-Z]/, 'Password must contain atleast one letter')
        .matches(
            /[!@#$%^&*()_+]/,
            'Password must contain atleast one special character'
        ),
    confirmpass: Yup.string()
        .required('Confirm password is required')
        .test('pass-match', 'Passwords do not match', function(value) {
            return this.parent.password === value;
        }),
});
