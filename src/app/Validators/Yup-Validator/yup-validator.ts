import * as yup from 'yup';

export async function YupValidator(values: any, schema: yup.Schema, formErrors: any = {}) {
    try {
        await schema.validate(values, { abortEarly: false });
        // clear existing properties
        Object.keys(formErrors).forEach(key => delete formErrors[key]);
    } catch (err: any) {
        // clear old errors first
        Object.keys(formErrors).forEach(key => delete formErrors[key]);

        if (err.inner) {
            err.inner.forEach((e: any) => {
                formErrors[e.path] = e.message;
            });
        }
    }
}