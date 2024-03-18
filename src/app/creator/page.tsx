"use client";
import CharacterCreation from "@/components/creation/character-creation";
import Selection from "@/components/home/selection";
import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext, useState } from "react";
import styles from "./page.module.css";

export default function MiiCreator() {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [currentView, setCurrentView] = useState<string>("selection");

    // TODO: sort by z-index
    const selectGender = (gender: string, miiString?: string) => {
        const char = { ...character };
        if (gender === "load") {
            char.gender = miiString?.charAt(0) === "0" ? "male" : "female";
            miiString = miiString?.substring(1);
            for (let i = 0; i < miiString!.length; i+=2) {
                const hex = parseInt(miiString!.substring(i, i + 2), 16);
                char[i / 2] = hex;
            }
            console.log(char)
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
                    <div className={`h-full ${styles["mii-background"]}`} data-aos="zoom-out">
                        <Selection selectGender={selectGender} />
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