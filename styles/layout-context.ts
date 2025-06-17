import { createContext,useContext } from "react";

interface SideBarContext {
    collapsed : boolean,
    setCollapsed: () => void
}

interface ToggleContextType {
  toggle: boolean;
  setToggle: (val: boolean) => void;
}

export const Sidebarcontext = createContext<SideBarContext>({
    collapsed: false,
    setCollapsed: () => {}
})

export const useSidebarcontext = () => {
    return useContext(Sidebarcontext)
}

export const ToggleContext = createContext<ToggleContextType>({
  toggle: false,
  setToggle: () => {},
});

export const useTogglecontext = () => {
  return useContext(ToggleContext);
};
