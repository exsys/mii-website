"use client";
import { ITEMS_MALE, ITEMS_FEMALE } from "@/assets/items"
import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext, useState } from "react";

type Props = {
    itemType: string;
    setLastChangeWasItemOrColor: (item: string) => void;
}

type MaleItem = keyof typeof ITEMS_MALE;
type FemaleItem = keyof typeof ITEMS_FEMALE;
const TOTAL_COLORS = {
    skin_color: 4,
    hair_color: 7,
    eye_color: 7,
    outfit_color: 9,
    accessory_color: 7,
};
const MAX_ITEMS_PER_PAGE = 20;

export default function ItemSelection({ itemType, setLastChangeWasItemOrColor }: Props) {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [currentItemTypePage, setCurrentItemTypePage] = useState({
        hair: 1,
        eyes: 1,
        nose: 1,
        mouth: 1,
        eyebrows: 1,
        glasses: 1,
        hat: 1,
        accessory: 1,
    });
    const itemsWithPagination = ["hair", "eyes", "nose", "mouth", "eyebrows", "glasses", "hat", "accessory"];

    const changeItem = (item: any) => {
        let newCharacter = { ...character };
        newCharacter[item.itemType] = item.id;
        setLastChangeWasItemOrColor("item");
        setCharacter(newCharacter);
    };

    const nextItem = (item: any) => {
        if (item.includes("color")) {
            let newCharacter = { ...character };
            newCharacter[item] += 1;
            if (newCharacter[item] > TOTAL_COLORS[item as keyof typeof TOTAL_COLORS]) {
                newCharacter[item] = 1;
            }
            setCharacter(newCharacter);
            setLastChangeWasItemOrColor("color");
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

        setLastChangeWasItemOrColor("item");
        setCharacter(newCharacter); // character component will pick up on the change and call the backend to generate the new image
    }

    const prevItem = (item: any) => {
        if (item.includes("color")) {
            let newCharacter = { ...character };
            newCharacter[item] -= 1;
            if (newCharacter[item] < 1) {
                newCharacter[item] = TOTAL_COLORS[item as keyof typeof TOTAL_COLORS];
            }
            setLastChangeWasItemOrColor("color");
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

        setLastChangeWasItemOrColor("item");
        setCharacter(newCharacter); // character component will pick up on the change and call the backend to generate the new image
    }

    const prevItemPage = (itemType: string) => {
        const currentPageOfItemType = currentItemTypePage[itemType as keyof typeof currentItemTypePage];
        const clickAudio = document.getElementById("click-sound") as HTMLAudioElement;
        clickAudio.play();
        if (currentPageOfItemType === 1) return;
        setCurrentItemTypePage({
            ...currentItemTypePage,
            [itemType]: currentItemTypePage[itemType as keyof typeof currentItemTypePage] - 1,
        });
    };

    const nextItemPage = (itemType: string) => {
        const currentPageOfItemType = currentItemTypePage[itemType as keyof typeof currentItemTypePage];
        const clickAudio = document.getElementById("click-sound") as HTMLAudioElement;
        clickAudio.play();
        if (character.gender === "male") {
            if (currentPageOfItemType * MAX_ITEMS_PER_PAGE >= ITEMS_MALE[itemType as MaleItem].length) return; // if last page has been reached

            setCurrentItemTypePage({
                ...currentItemTypePage,
                [itemType]: currentPageOfItemType + 1,
            });
        }

        if (character.gender === "female") {
            if (currentPageOfItemType * MAX_ITEMS_PER_PAGE >= ITEMS_FEMALE[itemType as FemaleItem].length) return; // if last page has been reached

            setCurrentItemTypePage({
                ...currentItemTypePage,
                [itemType]: currentPageOfItemType + 1,
            });
        }
    };

    return (
        <div className="flex flex-col items-center sm:block">
            <audio id="click-sound" src="/sounds/click.wav" />
            {itemType === "face" ? (
                <div className="border-4 border-gray-400 bg-black/20">
                    <div className="border-b-2 border-gray-400 py-1.5 px-8">
                        <div className="flex flex-col gap-1.5">
                            <div>
                                <h2 className="text-2xl mb-1">
                                    Skin Color
                                </h2>
                                <div className="w-3/4 mx-auto flex items-center justify-between gap-2">
                                    <div className="arrow-button" onClick={() => prevItem("skin_color")}>
                                        <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                    </div>
                                    <div>
                                        <img src="/items/skin-color.png" alt="" />
                                    </div>
                                    <div className="arrow-button" onClick={() => nextItem("skin_color")}>
                                        <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl mb-1">
                                    Shirt Color
                                </h2>
                                <div className="w-3/4 mx-auto flex items-center justify-between gap-2">
                                    <div className="arrow-button" onClick={() => prevItem("outfit_color")}>
                                        <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                    </div>
                                    <div>
                                        <img src={`/items/placeholder/colors/outfitcolor${character.outfit_color}.svg`} alt="" />
                                    </div>
                                    <div className="arrow-button" onClick={() => nextItem("outfit_color")}>
                                        <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-1.5 px-8">
                        <h2 className="text-2xl mb-1">
                            Facial Features
                        </h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-center gap-3">
                                <div className="arrow-button" onClick={() => prevItem("head")}>
                                    <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                </div>
                                <div>
                                    <img src="/items/placeholder/face-smile.svg" alt="" className="w-[50px] h-[45px]" />
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
                                    <img src="/items/placeholder/makeup.svg" alt="" className="w-[50px] h-[45px]" />
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
                                    <img src="/items/placeholder/wrinkles.svg" alt="" className="w-[50px] h-[45px]" />
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
                    {itemsWithPagination.includes(itemType) && (
                        <div className="flex gap-2 mb-3 items-center">
                            <div className="arrow-button !w-8 !h-8" onClick={() => prevItemPage(itemType)}>
                                <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                            </div>
                            {character.gender === "male" && (
                                <div className="font-medium text-2xl">
                                    {currentItemTypePage[itemType as keyof typeof currentItemTypePage]}/{Math.ceil(ITEMS_MALE[itemType as MaleItem].length / MAX_ITEMS_PER_PAGE)}
                                </div>
                            )}
                            {character.gender === "female" && (
                                <div className="font-medium text-2xl">
                                    {currentItemTypePage[itemType as keyof typeof currentItemTypePage]}/{Math.ceil(ITEMS_FEMALE[itemType as FemaleItem].length / MAX_ITEMS_PER_PAGE)}
                                </div>
                            )}
                            <div className="arrow-button !w-8 !h-8" onClick={() => nextItemPage(itemType)}>
                                <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-5 gap-2 flex-wrap">
                        {character.gender === "male" && (
                            <>
                                {ITEMS_MALE[itemType as MaleItem].map((item: any, index: number) => (
                                    <div key={index}>
                                        {(index + 1 > MAX_ITEMS_PER_PAGE * (currentItemTypePage[itemType as keyof typeof currentItemTypePage] - 1) && index + 1 <= MAX_ITEMS_PER_PAGE * currentItemTypePage[itemType as keyof typeof currentItemTypePage]) && (
                                            <div key={index} onClick={() => changeItem(item)}
                                                className={`item-button ${item.id === character[itemType] && "active"}`}>
                                                <span className="absolute top-0 left-0 bg-[#CCD8FF] px-1 rounded-tl-md text-sm
                                                border border-black">
                                                    {index + 1}
                                                </span>
                                                <img src={item.placeholder} alt=""
                                                    className={`${(itemType === "hat" || itemType === "accessory") && "h-full"}`} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}

                        {character.gender === "female" && (
                            <>
                                {ITEMS_FEMALE[itemType as FemaleItem].map((item: any, index: number) => (
                                    <div key={index}>
                                        {(index + 1 > MAX_ITEMS_PER_PAGE * (currentItemTypePage[itemType as keyof typeof currentItemTypePage] - 1) && index + 1 <= MAX_ITEMS_PER_PAGE * currentItemTypePage[itemType as keyof typeof currentItemTypePage]) && (
                                            <div key={index} onClick={() => changeItem(item)}
                                                className={`item-button ${item.id === character[itemType] && "active"}`}>
                                                <span className="absolute top-0 left-0 bg-[#CCD8FF] px-1 rounded-tl-md text-sm
                                                border border-black">
                                                    {index + 1}
                                                </span>
                                                <img src={item.placeholder} alt=""
                                                    className={`${(itemType === "hat" || itemType === "accessory") && "h-full"}`} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="flex gap-2 items-center mt-4">
                        {itemType === "hair" && (
                            <div className="w-full bg-black/20 border-2 border-black/30 py-1 px-3 flex gap-5 items-center
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

                        {itemType === "eyes" && (
                            <div className="w-full bg-black/20 border-2 border-black/30 py-1 px-3 flex gap-5 items-center
                            justify-center">
                                <h3 className="text-xl">
                                    Eye Color
                                </h3>
                                <div className="flex gap-2 items-center">
                                    <div className="arrow-button !w-8 !h-8" onClick={() => prevItem("eye_color")}>
                                        <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                    </div>
                                    <div>
                                        {/** this is using the haircolor images since both got the same colors */}
                                        <img src={`/items/placeholder/colors/haircolor${character.eye_color}.svg`} alt="" />
                                    </div>
                                    <div className="arrow-button !w-8 !h-8" onClick={() => nextItem("eye_color")}>
                                        <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {itemType === "accessory" && (
                            <div className="w-full bg-black/20 border-2 border-black/30 py-1 px-3 flex gap-5 items-center
                            justify-center">
                                <h3 className="text-xl">
                                    Accessory Color
                                </h3>
                                <div className="flex gap-2 items-center">
                                    <div className="arrow-button !w-8 !h-8" onClick={() => prevItem("accessory_color")}>
                                        <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                                    </div>
                                    <div className="arrow-button !w-8 !h-8" onClick={() => nextItem("accessory_color")}>
                                        <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}