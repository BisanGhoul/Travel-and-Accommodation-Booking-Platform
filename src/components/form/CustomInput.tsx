import { type FC } from 'react';
import {
    Box,
    TextField,
    FormControl,
    FormLabel,
    type TextFieldProps,
} from '@mui/material';
import { useField } from 'formik';

interface CustomInputProps extends Omit<TextFieldProps, 'name' | 'label'> {
    name: string;
    label: string;
    required?: boolean;
}

const CustomInput: FC<CustomInputProps> = ({
    name,
    label,
    required = false,
    ...textFieldProps
}) => {
    const [field, meta] = useField<string>(name);
    const showError = Boolean(meta.touched && meta.error);

    return (
        <Box sx={{ mb: 2 }}>
            <FormControl fullWidth error={showError} component="fieldset" variant="standard">
                <FormLabel
                    component="label"
                    htmlFor={name}
                    sx={{
                        mb: 1,
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        color: showError ? 'error.main' : 'text.primary'
                    }}
                >
                    {label}{required && ' *'}
                </FormLabel>

                <TextField
                    {...field}
                    id={name}
                    name={name}
                    required={required}
                    error={showError}
                    helperText={showError ? meta.error : undefined}
                    fullWidth
                    variant="outlined"
                    margin="none"
                    label=""
                    {...textFieldProps}
                />
            </FormControl>
        </Box>
    );
};

export default CustomInput;
