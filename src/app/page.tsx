import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCards";
import Sidebar from "@/components/Sidebar";

const games = [
  { title: "Elden Ring", image: "/images/eldenring.jpg", genre: "RPG" },
  { title: "Cyberpunk 2077", image: "/images/cyberpunk2077.jpg", genre: "Ação" },
  { title: "Hollow Knight", image: "/images/hollow.jpg", genre: "Metroidvania" },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>GameShelf</title>
        <meta name="description" content="Descubra e organize seus jogos favoritos!" />
      </Head>

      <div className="flex">
        <Sidebar /> 
        <div className="flex-1">
          <Header />

          <main className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-white mb-4">Jogos em Destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <GameCard key={index} {...game} />
              ))}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
