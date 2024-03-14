"use client";
import { useContext, useState } from "react";
import Character from "./character";
import ItemSelection from "./item-selection";
import ItemTypeSelection from "./item-type-selection";
import { MiiCharacterContext } from "@/providers/character-provider";

export default function CharacterCreation() {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [selectedItemType, setSelectedItemType] = useState<string>("head");

    return (
        <div className="h-full">
            <div className="h-full flex justify-center items-center flex-col gap-10">
                <div>
                    <ItemTypeSelection selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} />
                </div>

                <div className="flex gap-5 justify-between w-full">
                    <Character />
                    <ItemSelection itemType={selectedItemType} />
                </div>
            </div>
        </div>
    );
}