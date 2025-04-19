import { AxiosError } from 'axios';

export type StatusType = {
  [key: number]: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, originalError?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = 500;

    if (originalError instanceof AxiosError) {
      this.status = originalError.response?.status || 500;
    }
  }
}

const createApiError = (status: number, message: string): ApiError => {
  const error = new ApiError(message);
  error.status = status;
  return error;
};

export const handleApiError = (error: unknown) => {
  const defaultMessage = '서버 요청 중 오류가 발생했습니다.';
  let apiError: ApiError;

  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || defaultMessage;
    
    apiError = createApiError(status, message);
  } else if (error instanceof Error) {
    apiError = createApiError(500, error.message || defaultMessage);
  } else {
    apiError = createApiError(500, defaultMessage);
  }

  return {
    status: (customMessages: StatusType) => {
      if (customMessages[apiError.status]) {
        apiError.message = customMessages[apiError.status];
      }
      return { default: () => apiError };
    },
    default: (defaultMsg?: string) => {
      if (defaultMsg) {
        apiError.message = defaultMsg;
      }
      return apiError;
    },
  };
}; 