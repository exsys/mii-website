import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"

export default function LorePage() {
    return (
        <div className="h-full bg-creator-background">
            <Header />
            <div className="h-full flex justify-center items-center">
                <h1 className="text-5xl font-semibold">Coming soon...</h1>
            </div>
            <div className="-mt-28">
                <Footer />
            </div>
        </div>
    )
}