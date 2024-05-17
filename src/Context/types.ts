import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ContextProviderProps {
    children: ReactNode
}

export interface ContextType {
    filter: string,
    setFilter: Dispatch<SetStateAction<string>>;
}