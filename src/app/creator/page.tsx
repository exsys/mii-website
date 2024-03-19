"use client";
import CharacterCreation from "@/components/creation/character-creation";
import Selection from "@/components/home/selection";
import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext, useState } from "react";
import styles from "./page.module.css";
import { MII_STRING_ORDER } from "@/assets/character";

export default function MiiCreator() {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [currentView, setCurrentView] = useState<string>("selection");

    const startCreator = (gender: string, miiString?: string) => {
        const char = { ...character };
        // load the hex string (mii string) if user entered load
        if (gender === "load") {
            char.gender = miiString!.charAt(0) === "0" ? "male" : "female";
            const restOfMiiString = MII_STRING_ORDER.slice(1); // slice(1) ignores the first digit because thats the gender
            let index = 1;
            restOfMiiString.forEach((itemType: string) => {
                const hexByte = miiString!.substring(index, index + 2);
                char[itemType] = parseInt(hexByte, 16);
                index += 2;
            });
        } else {
            char.gender = gender;
        }

        setCurrentView("creation");
        setCharacter(char);
    }

    return (
        <div className={`h-full ${styles["wii-cursor"]}`}>
            <div className="h-full relative">
                {currentView === "selection" && (
                    <div className={`h-full ${styles["mii-channel-background"]}`} data-aos="zoom-out">
                        <Selection startCreator={startCreator} />
                    </div>
                )}

                {currentView === "creation" && (
                    <div className="h-full bg-creator-background">
                        <CharacterCreation setCurrentView={setCurrentView} />
                    </div>
                )}
            </div>
        </div>
    )
}