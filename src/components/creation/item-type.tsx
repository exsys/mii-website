"use client";
import { useState } from "react";

type Props = {
    selectedItemType: string;
    setSelectedItemType: (itemType: string) => void;
}

export default function ItemType({ selectedItemType, setSelectedItemType }: Props) {
    return (
        <div className="grid grid-cols-7 text-center">
            <div className={`border-2 border-green-700 p-2 bg-green-200 cursor-pointer
                ${selectedItemType === "head" && "bg-green-100"}`}
                onClick={() => setSelectedItemType("head")}>
                Head
            </div>
            <div className={`border-2 border-green-700 p-2 bg-green-200 cursor-pointer
                ${selectedItemType === "hair" && "bg-green-100"}`}
                onClick={() => setSelectedItemType("hair")}>
                Hair
            </div>
            <div className={`border-2 border-green-700 p-2 bg-green-200 cursor-pointer
                ${selectedItemType === "eyes" && "bg-green-100"}`}
                onClick={() => setSelectedItemType("eyes")}>
                Eyes
            </div>
            <div className={`border-2 border-green-700 p-2 bg-green-200 cursor-pointer
                ${selectedItemType === "nose" && "bg-green-100"}`}
                onClick={() => setSelectedItemType("nose")}>
                Nose
            </div>
            <div className={`border-2 border-green-700 p-2 bg-green-200 cursor-pointer
                ${selectedItemType === "mouth" && "bg-green-100"}`}
                onClick={() => setSelectedItemType("mouth")}>
                Mouth
            </div>
            <div className={`border-2 border-green-700 p-2 bg-green-200 cursor-pointer
                ${selectedItemType === "eyebrows" && "bg-green-100"}`}
                onClick={() => setSelectedItemType("eyebrows")}>
                Eyebrows
            </div>
            <div className={`border-2 border-green-700 p-2 bg-green-200 cursor-pointer
                ${selectedItemType === "glasses" && "bg-green-100"}`}
                onClick={() => setSelectedItemType("glasses")}>
                Glasses
            </div>
        </div>
    )
}