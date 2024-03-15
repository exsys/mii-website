"use client";
import { useState } from "react";

type Props = {
    selectGender: (gender: string) => void;
}

export default function Selection({ selectGender }: Props) {
    const [currentSelection, setCurrentSelection] = useState<number>(0);

    return (
        <>
            {currentSelection === 0 && (
                <>
                    <div className="border-8 border-gray-300 rounded-3xl w-[200px] h-[200px] bg-[#CCFFE7] hover:scale-95"
                        onClick={() => setCurrentSelection(1)}>
                        <div className="flex h-full items-center justify-center">
                            Create new Mii
                        </div>
                    </div>
                    <div className="border-8 border-gray-300 rounded-3xl w-[200px] h-[200px] bg-[#CCFFE7] hover:scale-95">
                        <div className="flex h-full items-center justify-center">
                            Load Mii
                        </div>
                    </div>
                </>
            )}

            {currentSelection === 1 && (
                <>
                    <div className="border-8 border-gray-300 rounded-3xl w-[200px] h-[200px] bg-[#CCFFE7] hover:scale-95"
                        onClick={() => selectGender("male")}>
                        <div className="flex h-full items-center justify-center">
                            Male
                        </div>
                    </div>
                    <div className="border-8 border-gray-300 rounded-3xl w-[200px] h-[200px] bg-[#CCFFE7] hover:scale-95"
                        onClick={() => selectGender("female")}>
                        <div className="flex h-full items-center justify-center">
                            Female
                        </div>
                    </div>
                </>
            )}
        </>
    )
}