import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface ValidationErrorPayload {
  path: string;
  message: string;
}

interface ErrorResponse {
  status: number;
  message: string;
  payload: ValidationErrorPayload[];
}

export type ServerError = AxiosError<ErrorResponse>;

export const displayValidationErrors = (error: ServerError) => {
  const errorResponse = error?.response?.data;

  errorResponse?.payload.forEach(error =>
    toast.error(`Error at ${error.path}: ${error.message}`)
  );
};
