export interface IApiResponse<T = any> {
    success: boolean;
    message: string;
    body: T | null;
}

export interface IErrorDetails {
  code?: string;
  details?: Record<string, any>;
  stack?: string;
};