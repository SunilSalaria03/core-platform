import { IUser } from "./user.interface";

export interface IAxiosBaseQueryArgs {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: IUser;
  params?: IUser;
}

export interface IApiErrorShape {
  status?: number;
  data?: IUser;
  message?: string;
};
