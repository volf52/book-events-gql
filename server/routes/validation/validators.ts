import * as Yup from 'yup';
import { StringIndexed, RegisterData } from '../types';
import { RegisterSchema } from './schemas';

const validateInput = <T extends {}>(
    schema: Yup.ObjectSchema<Yup.Shape<object, T>>
) => async (data: T) => {
    let ret = {
        isValid: true,
        errors: {} as T,
    };

    await schema.validate(data, { abortEarly: false }).catch(err => {
        const newErrors = {} as StringIndexed;
        const { inner } = err;
        (inner as Array<Yup.ValidationError>).map(
            vErr => (newErrors[vErr.path] = vErr.message)
        );
        ret = {
            isValid: false,
            errors: newErrors as T,
        };
    });

    return ret;
};

export const validateRegister = validateInput<RegisterData>(RegisterSchema);
