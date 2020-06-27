import { useContext, createContext } from 'react';

const StateContext = createContext();

export const useStore = () => useContext(StateContext);

export const Provider = StateContext.Provider;