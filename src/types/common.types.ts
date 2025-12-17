export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface AIApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}


export interface ApiError {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
}