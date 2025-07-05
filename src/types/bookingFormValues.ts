import { Dayjs } from 'dayjs';

export interface BookingFormValues {
    reserverName: string;
    phoneNumber: string;
    nationalId: string;
    dateRange: {
        startDate: Dayjs | null;
        endDate: Dayjs | null;
    };
}
