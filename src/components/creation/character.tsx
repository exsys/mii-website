"use client";
import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext, useEffect, useState } from "react";
import sharp from "sharp";
import { DEFAULT_CHARACTER, ITEM_Z_INDEX } from "@/assets/character";
import { ITEMS_FEMALE, ITEMS_MALE } from "@/assets/items";

type zlayer = keyof typeof ITEM_Z_INDEX;

export default function Character() {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (character) {
            // ignore color fields 
            const itemIds = DEFAULT_CHARACTER;
            for (const [key, value] of Object.entries(character)) {
                // TODO: once beard or hat is added to the creator, remove them from the ignore list
                if (key.includes("color") || key === "gender" || key === "beard" || key === "hat") {
                    delete itemIds[key as zlayer];
                }
            }

            let allItems: any;
            switch (character.gender) {
                case "male":
                    allItems = ITEMS_MALE;
                    break;
                case "female":
                    allItems = ITEMS_FEMALE;
                    break;
                default:
                    console.log("Error: gender is not defined");
                    break;
            }

            // iterate through each item type (like hair, eyes, etc)
            let items: any[] = [];
            for (let i = 0; i < Object.keys(itemIds).length; i++) {
                const itemType = Object.keys(itemIds)[i] as zlayer;
                const itemId: any = character[itemType];
                const item: any = allItems[itemType].find((item: any) => item.id === itemId); // item object of each item type
                items.push(item);
            }

            getGeneratedCharacterImage(items);
        }

        async function getGeneratedCharacterImage(items: any[]) {
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