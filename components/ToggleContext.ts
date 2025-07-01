import { useContext, useState, createContext } from "react";

interface ToggleContextType {
  toggle: boolean;
  setToggle: (val: boolean) => void;
}

export const ToggleContext = createContext<ToggleContextType>({
  toggle: false,
  setToggle: () => {},
});

export const useTogglecontext = () => {
  return useContext(ToggleContext);
};
