"use client";
import { useState } from "react";
import Character from "./character";
import ItemSelection from "./item-selection";
import ItemType from "./item-type";

type Props = {
    gender: string;
}

export default function CharacterCreation({ gender }: Props) {
    const [selectedItemType, setSelectedItemType] = useState<string>("head");

    return (
        <div className="h-full">
            <div className="h-full flex justify-center items-center flex-col gap-10">
                <div>
                    <ItemType selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} />
                </div>

                <div className="flex gap-5 justify-between w-full">
                    <Character />
                    <ItemSelection itemType={selectedItemType} />
                </div>
            </div>
        </div>
    );
}