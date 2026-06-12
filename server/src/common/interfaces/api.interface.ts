// API response interface
export interface IApiResponse<T = any> {
    success: boolean;
    message: string;
    body: T | null;
}

// Error details interface
export type IErrorDetails = {
  code?: string;
  details?: Record<string, any>;
  stack?: string;
};