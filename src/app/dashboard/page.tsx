"use client";
import React from "react";
import GameCard from "@/components/GameCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Game } from "@/components/GameCard";


async function fetchGames(): Promise<Game[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Erro ao carregar os jogos");
  return res.json();
}


export default function Dashboard() {
  const [games, setGames] = React.useState<Game[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadGames() {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch {
        setError("Erro ao carregar os jogos.");
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
<div className="flex flex-col min-h-screen bg-black-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="bg-black-100 min-h-screen w-full ml-4">
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
    <h2 className="text-2xl font-bold text-white-800 mb-6">Jogos em Destaque</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game._id} {...game} />
      ))}
    </div>
  </div>
</main>

</div>
      <Footer />
    </div>

  );
}
