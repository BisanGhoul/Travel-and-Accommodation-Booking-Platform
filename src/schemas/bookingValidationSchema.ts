import * as Yup from 'yup';
import type { BookingFormValues } from '../types/bookingFormValues';
import type { Dayjs } from 'dayjs';

export const bookingValidationSchema = Yup.object()
  .shape({
    reserverName: Yup.string()
      .required('Your name is required'),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, 'Phone number can only contain numbers')
      .required('Phone number is required'),
    nationalId: Yup.string()
      .required('National ID is required'),
    dateRange: Yup.object()
      .shape({
        startDate: Yup.mixed<Dayjs>()
          .nullable()
          .required('Check‑in date is required'),
        endDate: Yup.mixed<Dayjs>()
          .nullable()
          .required('Check‑out date is required'),
      })
      .required('Date range is required'),
  }) as Yup.ObjectSchema<BookingFormValues>;
