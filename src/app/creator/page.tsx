"use client";
import CharacterCreation from "@/components/creation/character-creation";
import Selection from "@/components/home/selection";
import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext, useState } from "react";
import styles from "./page.module.css";

export default function MiiCreator() {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [currentView, setCurrentView] = useState<string>("selection");

    const selectGender = (gender: string) => {
        const char = {...character};
        char.gender = gender;
        setCurrentView("creation");
        setCharacter(char);
    }

    return (
        <div className={`h-full ${styles["wii-cursor"]}`}>
            <div className="h-full flex justify-center items-center gap-10">
                {currentView === "selection" && (
                    <Selection selectGender={selectGender} />
                )}

                {currentView === "creation" && (
                    <CharacterCreation />
                )}
            </div>
        </div>
    )
}