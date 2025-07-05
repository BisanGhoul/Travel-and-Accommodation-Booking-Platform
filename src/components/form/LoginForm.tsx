import { type FC } from 'react';

import { Formik, Form, type FormikProps, type FormikHelpers } from 'formik';
import { Button, Box } from '@mui/material';

import CustomInput from './CustomInput';
import { loginValidationSchema } from '../../schemas/loginValidationSchema';
import type { LoginRequest, LoginResponse, LoginFormValues } from '../../types/login';
import { useAuth } from '../../context/AuthContext';


const initialValues: LoginFormValues = {
    username: '',
    password: '',
};

const LoginForm: FC = () => {
    const { login } = useAuth();

    const onSubmit = async (
        values: LoginFormValues,
        actions: FormikHelpers<LoginFormValues>
    ) => {
        try {
            const payload = {
                userName: values.username,
                password: values.password,
            };
            await login(payload);
        } catch (error) {
            actions.setFieldError('username', 'Invalid credentials');
        } finally {
            actions.setSubmitting(false);
            actions.resetForm();
        }
    };
    // Formik will call this function with its internal state and helper methods every render

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, values, errors, touched }: FormikProps<LoginFormValues>) => ( //Formik will call thhis function with its internal state and helper methods every render
                // <Form> automates onSubmit + prevents default, noValidate disables browsers validation
                <Form noValidate>
                    <CustomInput // didnt use Formik <Field> to customize the component however i like
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                    />
                    <CustomInput
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                    />

                    <Box mt={2}>
                        <Button
                            type="submit" // triggers Formik submit
                            variant="contained"
                            color="primary"
                            size='large'
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in…' : 'Login'}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
export default LoginForm;
