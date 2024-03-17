"use client";
import { useState } from "react";

type Props = {
    selectGender: (gender: string) => void;
}

export default function Selection({ selectGender }: Props) {
    const [currentSelection, setCurrentSelection] = useState<number>(0);

    return (
        <div className={`w-full h-full`}>
            {currentSelection === 0 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-20">
                    <div onClick={() => setCurrentSelection(1)} data-aos="fade-right" data-aos-delay="200">
                        <div className="wii-button">
                            New Mii
                        </div>
                    </div>
                    <div data-aos="fade-left" data-aos-delay="200">
                        <div className="wii-button">
                            Load Mii
                        </div>
                    </div>
                </div>
            )}

            {currentSelection === 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-20">
                    <div className="hover:scale-95" onClick={() => selectGender("male")} data-aos="fade-right">
                        <div className="wii-button">
                            Male
                        </div>
                    </div>
                    <div className="hover:scale-95" onClick={() => selectGender("female")} data-aos="fade-left">
                        <div className="wii-button">
                            Female
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}