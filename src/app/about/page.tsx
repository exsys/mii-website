import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import Image from "next/image"

export default function AboutPage() {
    return (
        <div className="h-full">
            <Header />
            <div className={`w-full h-full flex flex-col justify-center items-center`}>
                <div className="scale-[0.65]">
                    <Image src={"/images/mii-about.png"} width={1484} height={649} alt="miis" priority
                        data-aos="fade-down" data-aos-delay="100" />
                </div>
                <div className="text-center md:w-[46%] mx-auto mb-10"
                    data-aos="fade-up" data-aos-delay="100">
                    <h1 className="text-5xl font-semibold mb-10">
                        Who we are
                    </h1>
                    <p className="text-2xl">
                        We want to make something fun and new on solana with using miimaker we can relive
                        the good ol times by making specific mii that represent ourself
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}