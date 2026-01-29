"use client";

import { Provider } from "react-redux";
import { store } from "../../shared/store/store";

// Redux store provider
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
