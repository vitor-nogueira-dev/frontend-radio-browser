import { useContext } from "react";

import { UiContext } from "@/context/UIContext/Ui.Context";

export const useUI = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
