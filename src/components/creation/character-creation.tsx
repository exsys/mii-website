"use client";
import { useState } from "react";
import Character from "./character";
import ItemSelection from "./item-selection";
import ItemTypeSelection from "./item-type-selection";
import styles from "./page.module.css";
import { ArrowDownTrayIcon, FolderArrowDownIcon } from "@heroicons/react/24/outline";

export default function CharacterCreation() {
    const [selectedItemType, setSelectedItemType] = useState<string>("face");
    const [currentStage, setCurrentStage] = useState<number>(1);
    const [selectedBackground, setSelectedBackground] = useState<number>(0);

    const nextBackground = () => {
        
    };

    const prevBackground = () => {

    };

    return (
        <div className="h-full flex justify-center items-center gap-10">
            <div className="h-full w-full max-w-[600px]">
                <div className="h-full flex justify-center items-center flex-col gap-10">
                    {currentStage === 1 && (
                        <>
                            <div>
                                <ItemTypeSelection selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} />
                            </div>

                            <div className="flex gap-5 justify-between w-full relative">
                                <Character />
                                <ItemSelection itemType={selectedItemType} />
                                <div className="absolute bottom-0 left-[36px] bg-black/40 p-2 border-2 border-black/30 rounded-xl
                                min-w-[180px] text-center hover:scale-95 hover:bg-black/50"
                                    onClick={() => setCurrentStage(2)}>
                                    <h3 className="text-white text-2xl drop-shadow-lg">
                                        Create
                                    </h3>
                                </div>
                            </div>
                        </>
                    )}

                    {currentStage === 2 && (
                        <>
                            <div className="flex gap-10 justify-center w-full">
                                <div className={`flex items-center`}>
                                    <div className={`${styles["switch-button-wrapper"]}`}>
                                        <div className={`${styles["switch-button-left"]}`}></div>
                                    </div>
                                </div>
                                <Character />
                                <div className={`flex items-center`}>
                                    <div className={`${styles["switch-button-wrapper"]}`}>
                                        <div className={`${styles["switch-button-right"]}`}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-10 mt-8">
                                <div className="wii-button flex gap-3 w-[280px]">
                                    <ArrowDownTrayIcon className="w-6 h-6" />
                                    <span>
                                        Download Image
                                    </span>
                                </div>
                                <div className="wii-button flex gap-3 w-[280px]">
                                    <FolderArrowDownIcon className="w-6 h-6" />
                                    <span>
                                        Save Mii
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}