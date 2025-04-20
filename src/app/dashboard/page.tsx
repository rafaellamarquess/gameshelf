"use client";
import React from "react";
import GameCard from "@/components/GameCards";
import { Game } from "@/lib/games";

async function fetchGames(): Promise<Game[]> {
  const res = await fetch("/api/games");
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
<main className="bg-black-100 min-h-screen">
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
    <h2 className="text-2xl font-bold text-white-800 mb-6">Jogos em Destaque</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  </div>
</main>

  );
}
