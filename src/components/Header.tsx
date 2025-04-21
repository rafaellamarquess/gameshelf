// src/components/Header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<header className="bg-gray-900 text-white px-4 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
  <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    {/* Linha 1: título/input à esquerda - botão menu à direita */}
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">GameShelf</h1>
        <input
          type="text"
          placeholder="Pesquisar jogos..."
          className="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-44 sm:w-64"
        />
      </div>

      <button
        className="sm:hidden p-2 rounded hover:bg-gray-800"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu size={22} />
      </button>
    </div>

    {/* Linha 2: Menu e perfil alinhados à direita */}
    <div className={`w-full sm:w-auto flex-col sm:flex-row sm:items-center sm:gap-4 mt-2 sm:mt-0 ${menuOpen ? "flex" : "hidden"} sm:flex justify-end`}>
      <div className="flex items-center gap-2 mb-2 sm:mb-0 justify-end">
        <Image
          src="/images/profile.jpg"
          alt="Usuário"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-sm font-medium">Usuário</span>
      </div>

      <nav>
        <ul className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-sm justify-end items-end sm:items-center">
          <li><Link href="/dashboard" className="hover:text-gray-400">Home</Link></li>
          <li><Link href="/add-game" className="hover:text-gray-400">Adicionar Games</Link></li>
          <li><Link href="/login" className="hover:text-gray-400">Login</Link></li>
        </ul>
      </nav>
    </div>
  </div>
</header>

  );
};

export default Header;
