import { type FC } from 'react';
import { Formik, Form, type FormikProps, type FormikHelpers } from 'formik';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import CustomInput from '../form/CustomInput';
import DateRangePicker from '../datePickers/DateRangePicker';
import { bookingValidationSchema } from '../../schemas/bookingValidationSchema';
import type { BookingFormValues } from '../../types/bookingFormValues';

export interface BookingFormProps {
  roomPrice: number;
  onSubmit: (values: BookingFormValues) => Promise<void>;
}

const initialValues: BookingFormValues = {
  reserverName: '',
  phoneNumber: '',
  nationalId: '',
  dateRange: {
    startDate: null,
    endDate: null,
  },
};

const BookingForm: FC<BookingFormProps> = ({ roomPrice, onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Formik<BookingFormValues>
      initialValues={initialValues}
      validationSchema={bookingValidationSchema}
      onSubmit={async (
        values: BookingFormValues,
        actions: FormikHelpers<BookingFormValues>
      ) => {
        await onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        isSubmitting,
      }: FormikProps<BookingFormValues>) => {
        let total = 0;
        if (values.dateRange.startDate && values.dateRange.endDate) {
          const nights = values.dateRange.endDate.diff(
            values.dateRange.startDate,
            'day'
          );
          total = nights * roomPrice;
        }

        return (
          <Form noValidate>
            <Box
              component="section"
              role="form"
              aria-labelledby="booking-form-heading"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 500,
                mx: 'auto',
                p: 2,
              }}
            >
              <Typography
                id="booking-form-heading"
                variant="h6"
                component="h2"
              >
                Make a Reservation
              </Typography>

              <CustomInput
                name="reserverName"
                label="Your Name"
                placeholder="Enter your full name"
                required
              />

              <CustomInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="e.g. 5551234567"
                required
                type="tel"
                InputProps={{ inputMode: 'numeric' }}
              />

              <CustomInput
                name="nationalId"
                label="National ID"
                placeholder="ID / Passport number"
                required
              />

              <DateRangePicker
                space={isMobile ? 1 : 2}
                checkIn={values.dateRange.startDate}
                checkOut={values.dateRange.endDate}
                setCheckIn={(d) =>
                  setFieldValue('dateRange.startDate', d, true)
                }
                setCheckOut={(d) =>
                  setFieldValue('dateRange.endDate', d, true)
                }
              />

              {/* inline date errors */}
              {touched.dateRange?.startDate && errors.dateRange?.startDate && (
                <Typography color="error" variant="body2">
                  {errors.dateRange.startDate}
                </Typography>
              )}
              {touched.dateRange?.endDate && errors.dateRange?.endDate && (
                <Typography color="error" variant="body2">
                  {errors.dateRange.endDate}
                </Typography>
              )}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Typography variant="subtitle1">
                  Total: ${total.toFixed(2)}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: 'secondaryButton.main' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding…' : 'Add to Cart'}
                </Button>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BookingForm;
