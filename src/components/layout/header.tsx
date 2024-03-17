"use client";
import Link from "next/link";
import styles from "./header.module.css";
import { useState } from "react";

export default function Header() {
    const [active, setActive] = useState(false);

    return (
        <header className="absolute top-0 left-0 w-full z-30">
            <div className="flex items-center justify-end w-3/4 mx-auto py-6">

                {/** mobile navbar */}
                <div className="inline-block sm:hidden">
                    <div className="relative cursor-pointer z-30 p-1.5" onClick={() => setActive(!active)}>
                        <div className={`${styles["menu-icon-line"]} ${active ? `${styles["line1"]} !bg-white` : ""}`}></div>
                        <div className={`${styles["menu-icon-line"]} ${active ? `${styles["line2"]} !bg-white` : ""}`}></div>
                        <div className={`${styles["menu-icon-line"]} ${active ? `${styles["line3"]} !bg-white` : ""}`}></div>
                    </div>

                    <div className={`${active ? styles.active : ""} ${styles.menu} fixed w-screen h-screen inset-0 bg-black`}>
                        <nav className="flex flex-col gap-8 text-xl text-white">
                            <Link href={"/about"}>About</Link>
                        </nav>
                    </div>
                </div>

                {/** non-mobile navbar */}
                <div className="hidden sm:flex">
                    <nav className="flex gap-12 text-xl items-center">
                        <Link href={"/about"} className="hover:text-slate-500">About</Link>
                        <Link href={"/creator"} className="item-button !w-fit !h-fit py-2 px-7 hover:scale-95">
                            Launch Creator
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}