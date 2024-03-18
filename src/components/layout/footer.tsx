import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="flex flex-col items-center gap-6 w-3/5 mx-auto pb-10">
                <div className="font-medium">FOLLOW US ON OUR SOCIALS</div>
                <div>
                    <nav className="flex items-center gap-20">
                        <Link href={"https://dexscreener.com/solana/4jscfktnaxfzyuykqgufnguwzqacazhwmdsfth6wnmhl"}
                        target="_blank">
                            <Image src={"/icons/dexscreener.png"} width={40} height={40} alt="dexscreener" />
                        </Link>
                        <Link href={"https://t.me/MiiSolana"} target="_blank">
                            <Image src={"/icons/telegram.png"} width={33} height={33} alt="telegram" />
                        </Link>
                        <Link href={"https://twitter.com/Mii_onSolona"} target="_blank">
                            <Image src={"/icons/twitter.png"} width={45} height={45} alt="twitter" />
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}