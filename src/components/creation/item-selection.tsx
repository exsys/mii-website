"use client";
import { ITEMS_MALE, ITEMS_FEMALE } from "@/assets/items"
import { MiiCharacterContext } from "@/providers/character-provider";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";

type Props = {
    itemType: string;
}

export default function ItemSelection({ itemType }: Props) {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [currentItems, setCurrentItems] = useState<any[]>([]);

    const changeItem = (item: any) => {
        console.log(item.itemType, item.id);
    };

    const nextItem = (item: any) => {
        console.log(item + " next item");
    }

    const prevItem = (item: any) => {
        console.log(item + " previous item");
    }

    return (
        <div>
            {itemType === "face" ? (
                <div className="border-4 border-gray-400">
                    <div className="border-b-2 border-gray-400">
                        <h2 className="text-3xl px-2 pt-2">
                            Skin Color
                        </h2>
                        <div className="px-2 pb-2">
                            <div className="flex items-center justify-center gap-2">
                                <div className="arrow-button" onClick={() => prevItem("skin_color")}>
                                    <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                                <div>
                                    <img src="/items/skin-color.png" alt="" className="scale-75" />
                                </div>
                                <div className="arrow-button" onClick={() => nextItem("skin_color")}>
                                    <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <h2 className="text-3xl">
                            Facial Features
                        </h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-center gap-3">
                                <div className="arrow-button" onClick={() => prevItem("head")}>
                                    <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                                <div>
                                    <img src="/images/placeholder/face-smile.svg" alt="" />
                                </div>
                                <div className="arrow-button" onClick={() => nextItem("head")}>
                                    <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <div className="arrow-button" onClick={() => prevItem("makeup")}>
                                    <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                                <div>
                                    <img src="/images/placeholder/makeup.svg" alt="" />
                                </div>
                                <div className="arrow-button" onClick={() => nextItem("makeup")}>
                                    <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <div className="arrow-button" onClick={() => prevItem("wrinkles")}>
                                    <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                                <div>
                                    <img src="/images/placeholder/wrinkles.svg" alt="" />
                                </div>
                                <div className="arrow-button" onClick={() => nextItem("wrinkles")}>
                                    <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-5 gap-2 flex-wrap">
                    {character.gender === "male" && (
                        <>
                            {ITEMS_MALE[itemType as keyof typeof ITEMS_MALE].map((item: any, index: number) => (
                                <div key={index} className="item-button"
                                onClick={() => changeItem(item)}>
                                    <span className="absolute top-0 left-1">
                                        {index + 1}
                                    </span>
                                    <img src={item.placeholder} alt="" />
                                </div>
                            ))}
                        </>
                    )}

                    {character.gender === "female" && (
                        <>
                            {ITEMS_FEMALE[itemType as keyof typeof ITEMS_FEMALE].map((item: any, index: number) => (
                                <div key={index} className="item-button">
                                    <span className="absolute top-0 left-1">
                                        {index + 1}
                                    </span>
                                    <img src={item.placeholder} alt="" />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}