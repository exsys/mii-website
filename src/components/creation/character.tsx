"use client";
import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext, useEffect, useState } from "react";
import { ITEM_Z_INDEX } from "@/assets/character";

type zlayer = keyof typeof ITEM_Z_INDEX;

export default function Character() {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (character) {
            getGeneratedCharacterImage(character);
        }

        async function getGeneratedCharacterImage(items: any) {
            try {
                const res = await fetch("/api/image", {
                    method: "POST",
                    body: JSON.stringify(items),
                    headers: { "Content-Type": "application/json" },
                });
                const blob = await res.blob();
                const objectURL = URL.createObjectURL(blob);
                setImageUrl(objectURL);
            } catch (error) {
                console.log(error)
            }
        }
    }, [character]);

    return (
        <div>
            <img src={imageUrl} alt="" />
        </div>
    )
}