import Link from "next/link";
import styles from "./home.module.css";

export default function HomeScreen() {
    return (
        <div className="h-full">
            <div className={`w-full h-full ${styles["mii-background"]}`}></div>
        </div>
    )
}