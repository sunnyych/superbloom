import { createContext, useContext } from "react";
export const PromptContext = createContext(null);

export const usePrompt = () => {
  return useContext(PromptContext);
};
