"use client";
import { useState } from "react";
import Character from "./character";
import ItemSelection from "./item-selection";
import ItemTypeSelection from "./item-type-selection";
import ExtraSelection from "./extra-selection";

export default function CharacterCreation() {
    const [selectedItemType, setSelectedItemType] = useState<string>("face");
    const [currentStage, setCurrentStage] = useState<number>(1);

    return (
        <div className="h-full flex justify-center items-center gap-10">
            <div className="h-full w-full max-w-[600px]">
                <div className="h-full flex justify-center items-center flex-col gap-10">
                    {currentStage === 1 && (
                        <>
                            <div>
                                <ItemTypeSelection selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} />
                            </div>

                            <div className="flex gap-5 justify-between w-full">
                                <Character />
                                <ItemSelection itemType={selectedItemType} goToExtraSelection={setCurrentStage} />
                            </div>
                        </>
                    )}

                    {currentStage === 2 && (
                        <>
                            <div className="flex gap-5 justify-between w-full">
                                <Character />
                                <ExtraSelection />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}