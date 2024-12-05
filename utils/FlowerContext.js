// for passing flower shape and color that user picks
import { createContext, useContext } from "react";
export const FlowerContext = createContext(null);

export const useFlower = () => {
  return useContext(FlowerContext);
};
