import Image from "next/image";
import Link from "next/link";

export default function InfoSection() {
    return (
        <div className="h-fit lg:h-full pt-8 pb-2">
            <div className="h-full flex flex-col justify-center items-center gap-12">
                <div className="flex flex-col lg:flex-row gap-20 items-center lg:w-3/4 lg:mx-auto">
                    <div className="md:w-[50%] lg:w-[40%]">
                        <Image src={"/images/mii-chars.png"} width={800} height={776} alt="miis" priority />
                    </div>
                    <div className="lg:w-[40%] text-center lg:text-left">
                        <h1 className="text-5xl bold mb-16">Create your own Mii</h1>
                        <div className="text-xl leading-8 mb-5">
                            Welcome to Mii on Solana. Dive into nostalgia as you craft your own personalized Mii character!
                        </div>
                        <Link href={"/creator"} className="item-button !w-fit !h-11 px-5">
                            Try it out
                        </Link>
                    </div>
                </div>
                <h1 className="text-xl font-medium">
                    Token Address: 6yaVaoVREVoTt5euoSFpsxLEia1JnzM6fqZj6UWFok1F
                </h1>
            </div>
        </div>
    )
}