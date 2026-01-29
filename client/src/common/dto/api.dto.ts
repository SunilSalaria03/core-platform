import { HTTP_METHODS } from "../constants/http.constants";

// Api response dto
export interface ApiResponseDto<T> {
  success: boolean;
  message?: string;
  statusCode: number;
  data: T;
};

export interface IAxiosBaseQueryArgs<TBody = unknown, TParams = unknown> {
  url: string;
  method?: typeof HTTP_METHODS[keyof typeof HTTP_METHODS];
  data?: TBody;
  params?: TParams;
}