import Appbar from "@/components/Appbar";
import VideoHero from "@/components/VideoHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Appbar />
      <main>
        <VideoHero />
      </main>
    </div>
  );
}
