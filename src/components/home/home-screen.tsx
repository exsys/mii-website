import Link from "next/link";
import styles from "./home.module.css";

export default function HomeScreen() {
    return (
        <div className="h-full">
            <div className={`w-full h-full ${styles["mii-background"]}`}>
                <div className="h-full flex justify-center items-center gap-10">
                    <Link href={"/creator"} className="item-button !w-fit !h-fit py-2 px-7 hover:scale-95">
                        Launch Creator
                    </Link>
                </div>
            </div>
        </div>
    )
}