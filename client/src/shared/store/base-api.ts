// base-api.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../common/axios/base.axios";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Auth", "User"],
  endpoints: () => ({}),
});
