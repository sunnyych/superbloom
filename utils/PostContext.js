// for passing post information (text, media, id stuff)
import { createContext, useContext } from "react";
export const PostContext = createContext(null);

export const usePost = () => {
  return useContext(PostContext);
};
