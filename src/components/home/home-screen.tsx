"use client";
import { useState } from "react";
import Selection from "./selection";
import CharacterCreation from "../creation/character-creation";
import styles from "./home.module.css";

export default function HomeScreen() {
    const [currentView, setCurrentView] = useState<string>("selection");
    const [selectedGender, setSelectedGender] = useState<string>("");

    const selectGender = (gender: string) => {
        setSelectedGender(gender);
        setCurrentView("creation");
    }

    return (
        <div className="h-full">
            <div className={`w-full h-full ${styles["mii-background"]}`}></div>
            <div className="h-full flex justify-center items-center gap-10">
                {currentView === "selection" && (
                    <Selection selectGender={selectGender} />
                )}

                {currentView === "creation" && (
                    <CharacterCreation gender={selectedGender} />
                )}
            </div>
        </div>
    )
}