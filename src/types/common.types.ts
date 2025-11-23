export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface PaginatedResponse<T> {
  code: number;
  message: string;
  result: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}

export interface ApiError {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
}