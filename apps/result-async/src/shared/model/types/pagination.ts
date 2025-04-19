import { AxiosResponse } from 'axios';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMetadata {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface PaginationResponse<T> {
  items: T[];
  meta: PaginationMetadata;
}

export interface ApiPaginationResponse<T> {
  data: {
    items: T[];
    meta: PaginationMetadata;
  };
  message: string;
  status: number;
}

export const transformApiResponse = <T>(
  response: AxiosResponse<ApiPaginationResponse<T>>['data']
): PaginationResponse<T> => {
  return {
    items: response.data.items,
    meta: response.data.meta,
  };
}; 