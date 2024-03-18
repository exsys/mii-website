import HomeScreen from "@/components/home/home-screen";
import InfoSection from "@/components/home/info-section";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="h-full">
      <Header />
      <HomeScreen />
      <InfoSection />
      <Footer />
    </div>
  );
}
