import HomeScreen from "@/components/home/home-screen";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="h-full">
      <Header />
      <HomeScreen />
    </div>
  );
}
