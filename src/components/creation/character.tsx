import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext, useEffect } from "react";
import sharp from "sharp";

export default function Character() {
    const [character, setCharacter] = useContext(MiiCharacterContext);

    useEffect(() => {
        if (character) {
            console.log(character);
        }
    }, [character]);
    
    return (
        <div>
            
        </div>
    )
}