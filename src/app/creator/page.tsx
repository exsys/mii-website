"use client";
import CharacterCreation from "@/components/creation/character-creation";
import Selection from "@/components/home/selection";
import { useState } from "react";

export default function MiiCreator() {
    const [currentView, setCurrentView] = useState<string>("selection");
    const [selectedGender, setSelectedGender] = useState<string>("");

    const selectGender = (gender: string) => {
        setSelectedGender(gender);
        setCurrentView("creation");
    }

    return (
        <div className="h-full">
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