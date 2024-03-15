import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext, useEffect } from "react";
import sharp from "sharp";

export default function Character() {
    const [character, setCharacter] = useContext(MiiCharacterContext);

    useEffect(() => {
        if (character) {
            // TODO: create image with sharp
        }
    }, [character]);
    
    return (
        <div>
            
        </div>
    )
}