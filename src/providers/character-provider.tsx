"use client";
import { useState, createContext } from "react";
import { DEFAULT_CHARACTER } from "@/assets/character";

export const CharacterContext = createContext(null as any);

export const MiiCharacterProvider = ({ children }: any) => {
    const [character, setCharacter] = useState(DEFAULT_CHARACTER);

    return (
        <CharacterContext.Provider value={[character, setCharacter]}>
            {children}
        </CharacterContext.Provider>
    )
}