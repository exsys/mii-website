import Image from "next/image";
import Link from "next/link";

export default function InfoSection() {
    return (
        <div className="h-fit lg:h-full py-8">
            <div className="h-full flex flex-col justify-center items-center gap-12">
                <div className="flex flex-col lg:flex-row gap-20 items-center lg:w-3/4 lg:mx-auto">
                    <div className="md:w-[50%] lg:w-[40%]">
                        <Image src={"/images/mii-chars.png"} width={800} height={776} alt="miis" priority />
                    </div>
                    <div className="lg:w-[40%] text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
                        <h1 className="text-4xl md:text-5xl font-semibold mb-16">
                            Create your own Mii
                        </h1>
                        <div className="text-2xl leading-8 mb-5 font-medium">
                            Welcome to Mii on Solana. Dive into nostalgia as you craft your own personalized Mii character!
                        </div>
                        <Link href={"/creator"} className="item-button !w-fit !h-11 px-6 mt-4 text-lg">
                            Try it out
                        </Link>
                    </div>
                </div>
                <h1 className="text-center text-xl font-medium">
                    Token Address: <span className="text-sm lg:text-xl">6yaVaoVREVoTt5euoSFpsxLEia1JnzM6fqZj6UWFok1F</span>
                </h1>
            </div>
        </div>
    )
}