"use client";
import { ITEMS_MALE, ITEMS_FEMALE } from "@/assets/items"
import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext } from "react";

type Props = {
    itemType: string;
}

type MaleItem = keyof typeof ITEMS_MALE;
type FemaleItem = keyof typeof ITEMS_FEMALE;

const TOTAL_COLORS = {
    skin_color: 4,
    hair_color: 7,
    eye_color: 7,
    shirt_color: 9
};

export default function ItemSelection({ itemType }: Props) {
    const [character, setCharacter] = useContext(MiiCharacterContext);

    const changeItem = (item: any) => {
        let newCharacter = { ...character };
        newCharacter[item.itemType] = item.id;
        setCharacter(newCharacter);
    };

    const nextItem = async (item: any) => {
        if (item.includes("color")) {
            let newCharacter = { ...character };
            newCharacter[item] += 1;
            if (newCharacter[item] > TOTAL_COLORS[item as keyof typeof TOTAL_COLORS]) {
                newCharacter[item] = 1;
            }
            setCharacter(newCharacter);
            return;
        }

        let newCharacter = { ...character };
        newCharacter[item] += 1;

        // reset item id if it's out of bounds
        if (character.gender === "male") {
            if (newCharacter[item] > ITEMS_MALE[item as MaleItem].length) {
                newCharacter[item] = 1;
            }
        }
        if (character.gender === "female") {
            if (newCharacter[item] > ITEMS_FEMALE[item as FemaleItem].length) {
                newCharacter[item] = 1;
            }
        }

        setCharacter(newCharacter); // character component will pick up on the change and call the backend to generate the new image
    }

    const prevItem = (item: any) => {
        if (item.includes("color")) {
            let newCharacter = { ...character };
            newCharacter[item] -= 1;
            if (newCharacter[item] < 1) {
                newCharacter[item] = TOTAL_COLORS[item as keyof typeof TOTAL_COLORS];
            }
            setCharacter(newCharacter);
            return;
        }

        let newCharacter = { ...character };
        newCharacter[item] -= 1;

        // reset item id if it's out of bounds
        if (character.gender === "male") {
            if (newCharacter[item] < 1) {
                newCharacter[item] = ITEMS_MALE[item as MaleItem].length;
            }
        }
        if (character.gender === "female") {
            if (newCharacter[item] < 1) {
                newCharacter[item] = ITEMS_FEMALE[item as FemaleItem].length;
            }
        }

        setCharacter(newCharacter); // character component will pick up on the change and call the backend to generate the new image
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
                                    <img src="/items/placeholder/face-smile.svg" alt="" />
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
                                    <img src="/items/placeholder/makeup.svg" alt="" />
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
                                    <img src="/items/placeholder/wrinkles.svg" alt="" />
                                </div>
                                <div className="arrow-button" onClick={() => nextItem("wrinkles")}>
                                    <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-5 gap-2 flex-wrap">
                        {character.gender === "male" && (
                            <>
                                {ITEMS_MALE[itemType as keyof typeof ITEMS_MALE].map((item: any, index: number) => (
                                    <div key={index} className="item-button" onClick={() => changeItem(item)}>
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
                                    <div key={index} className="item-button" onClick={() => changeItem(item)}>
                                        <span className="absolute top-0 left-1">
                                            {index + 1}
                                        </span>
                                        <img src={item.placeholder} alt="" />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    {itemType === "hair" && (
                        <div className="bg-black/20 border-2 border-black/30 py-1 px-3 mt-4 flex gap-5 items-center
                        justify-center">
                            <h3 className="text-xl">
                                Hair Color
                            </h3>
                            <div className="flex gap-2 items-center">
                                <div className="arrow-button !w-8 !h-8" onClick={() => prevItem("hair_color")}>
                                    <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                                <div>
                                    <img src={`/items/placeholder/colors/haircolor${character.hair_color}.svg`} alt="" />
                                </div>
                                <div className="arrow-button !w-8 !h-8" onClick={() => nextItem("hair_color")}>
                                    <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}