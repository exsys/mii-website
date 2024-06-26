"use client";
import Link from "next/link";
import styles from "./header.module.css";
import { useState } from "react";

type Props = {
    hideLaunchButton?: boolean;
};

export default function Header({ hideLaunchButton = false }: Props) {
    const [active, setActive] = useState(false);

    return (
        <header className="absolute top-0 left-0 w-full z-30">
            <div className="flex items-center justify-end w-3/4 mx-auto py-6">

                {/** mobile navbar */}
                <div className="flex justify-between w-full items-center sm:hidden">
                    <Link href={"/"} className="text-2xl font-bold">
                        MII ON SOLANA
                    </Link>
                    <div className="relative cursor-pointer z-30 p-1.5" onClick={() => setActive(!active)}>
                        <div className={`${styles["menu-icon-line"]} ${active ? `${styles["line1"]} !bg-white` : ""}`}></div>
                        <div className={`${styles["menu-icon-line"]} ${active ? `${styles["line2"]} !bg-white` : ""}`}></div>
                        <div className={`${styles["menu-icon-line"]} ${active ? `${styles["line3"]} !bg-white` : ""}`}></div>
                    </div>

                    <div className={`${active ? styles.active : ""} ${styles.menu} fixed w-screen h-screen inset-0 bg-black`}>
                        <nav className="flex flex-col gap-8 text-xl text-white">
                            <Link href={"https://jup.ag/swap/SOL-6yaVaoVREVoTt5euoSFpsxLEia1JnzM6fqZj6UWFok1F"}
                                target="_blank" className="hover:text-slate-500 font-semibold">
                                Buy Token
                            </Link>
                            <Link href={"/lore"} className="hover:text-slate-500 font-semibold">
                                Lore
                            </Link>
                            <Link href={"/about"} className="hover:text-slate-500 font-semibold">
                                About
                            </Link>
                        </nav>
                    </div>
                </div>

                {/** non-mobile navbar */}
                <div className="hidden sm:flex w-full">
                    <nav className="w-full flex gap-12 text-xl items-center justify-between">
                        <Link href={"/"} className="text-4xl font-extrabold">
                            MII ON SOLANA
                        </Link>
                        <div className="flex gap-12 text-xl items-center justify-center">
                            <Link href={"https://jup.ag/swap/SOL-6yaVaoVREVoTt5euoSFpsxLEia1JnzM6fqZj6UWFok1F"}
                                className="hover:text-slate-500 font-semibold" target="_blank">
                                Buy Token
                            </Link>
                            <Link href={"/lore"} className="hover:text-slate-500 font-semibold">
                                Lore
                            </Link>
                            <Link href={"/about"} className="hover:text-slate-500 font-semibold">
                                About
                            </Link>
                            {!hideLaunchButton && (
                                <Link href={"/creator"} className="item-button !w-fit !h-fit py-2 px-7 hover:scale-95 font-medium">
                                    Launch Creator
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}