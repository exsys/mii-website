import Link from "next/link";

export default function HomeScreen() {
    return (
        <div className="h-full">
            <div className={`w-full h-full mii-background`}>
                <div className="sm:hidden h-full w-full flex justify-center items-center">
                    <Link href={"/creator"} className="item-button !w-fit !h-fit py-2 px-7 hover:scale-95">
                        Launch Creator
                    </Link>
                </div>
            </div>
        </div>
    )
}