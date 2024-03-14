import { useState, createContext } from "react";
import { DEFAULT_CHARACTER } from "@/assets/character";

export const CharacterContext = createContext(null as any);

export const CharacterProvider = ({ children }: any) => {
    const [character, setCharacter] = useState(DEFAULT_CHARACTER);

    return (
        <CharacterContext.Provider value={[character, setCharacter]}>
            {children}
        </CharacterContext.Provider>
    )
}