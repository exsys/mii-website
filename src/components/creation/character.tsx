"use client";
import { MiiCharacterContext } from "@/providers/character-provider";
import { useContext, useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";

export default function Character() {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    /** this will pick up on the changes of the character and update the image on each change */
    useEffect(() => {
        if (character) {
            getGeneratedCharacterImage(character);
        }

        async function getGeneratedCharacterImage(items: any) {
            try {
                let timeoutId = setTimeout(() => {
                    setLoading(true);
                }, 150);
                const res = await fetch("/api/image", {
                    method: "POST",
                    body: JSON.stringify(items),
                    headers: { "Content-Type": "application/json" },
                });
                const blob = await res.blob();
                const objectURL = URL.createObjectURL(blob);
                clearTimeout(timeoutId);
                setImageUrl(objectURL);
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
    }, [character]);

    return (
        <div className="relative min-w-[240px]">
            <Blocks height="60" width="60" color="#4fa94d" ariaLabel="blocks-loading" wrapperStyle={{}}
                visible={loading} wrapperClass="blocks-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <img src={imageUrl} alt="" id="mii-character" />
        </div>
    )
}