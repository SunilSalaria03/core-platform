export interface IApiResponse<T = any> {
    success: boolean;
    message: string;
    body: T | null;
}

export type IErrorDetails = {
  code?: string;
  details?: Record<string, any>;
  stack?: string;
};