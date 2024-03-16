"use client";
import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext } from "react";

export default function ExtraSelection() {
    const [character, setCharacter] = useContext(MiiCharacterContext);

    return (
        <div className="border-4 border-gray-400 bg-black/20 p-3">
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center justify-center">
                    <div>
                        <img src="/items/placeholder/shirt.svg" alt="" />
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <div className="arrow-button !w-8 !h-8">
                                <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                            </div>
                            <div>
                                <img src={`/items/placeholder/colors/haircolor${character.eye_color}.svg`} alt="" />
                            </div>
                            <div className="arrow-button !w-8 !h-8">
                                <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 items-center justify-center">
                    <div>
                        <img src="/items/placeholder/shirt.svg" alt="" />
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <div className="arrow-button !w-8 !h-8">
                                <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                            </div>
                            <div>
                                <img src={`/items/placeholder/colors/haircolor${character.eye_color}.svg`} alt="" />
                            </div>
                            <div className="arrow-button !w-8 !h-8">
                                <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 items-center justify-center">
                    <div>
                        <img src="/items/placeholder/shirt.svg" alt="" />
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <div className="arrow-button !w-8 !h-8">
                                <img src="/icons/left-arrow.svg" alt="" className="w-full h-full" />
                            </div>
                            <div>
                                <img src={`/items/placeholder/colors/haircolor${character.eye_color}.svg`} alt="" />
                            </div>
                            <div className="arrow-button !w-8 !h-8">
                                <img src="/icons/right-arrow.svg" alt="" className="w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}