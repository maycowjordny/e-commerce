"use client";

import { createContext, useState } from "react";
import { ContextProviderProps, ContextType } from "./types";

export const FilterContext = createContext({} as ContextType);

export function ContextProvider({ children }: ContextProviderProps) {
    const [filter, setFilter] = useState("");

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
}