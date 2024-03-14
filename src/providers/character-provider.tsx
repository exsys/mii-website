"use client";
import { useState, createContext } from "react";
import { DEFAULT_CHARACTER } from "@/assets/character";

export const MiiCharacterContext = createContext(null as any);

export const MiiCharacterProvider = ({ children }: any) => {
    const [character, setCharacter] = useState(DEFAULT_CHARACTER);

    return (
        <MiiCharacterContext.Provider value={[character, setCharacter]}>
            {children}
        </MiiCharacterContext.Provider>
    )
}