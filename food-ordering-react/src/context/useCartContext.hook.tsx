import { useContext } from "react";

import GlobalContext from "./GlobalContext";

export const useCartContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useCartContext must be used within a ContextWrapper");
  }
  return context;
};
