"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white px-4 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-4">
        {/* Linha de cima: logo + input + botão de menu */}
        <div className="w-full sm:w-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold whitespace-nowrap">GameShelf</h1>
            <input
              type="text"
              placeholder="Pesquisar jogos..."
              className="bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-44 sm:w-64"
            />
          </div>

          <button
            className="sm:hidden p-2 rounded hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Linha de baixo: menu e perfil */}
        <div className={`w-full sm:w-auto flex-col sm:flex-row flex items-end sm:items-center justify-between gap-4 ${menuOpen ? "flex" : "hidden"} sm:flex`}>
          <nav className="w-full sm:w-auto">
            <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm items-end sm:items-center">
              <li><Link href="/dashboard" className="hover:text-gray-400 transition-colors">Home</Link></li>
              <li>
                <Link
                  href="/add-game"
                  className="hover:text-gray-400 transition-colors"
                >
                  <span className="hidden sm:inline">Adicionar Games</span>
                  <span className="inline sm:hidden">Adicionar</span>
                </Link>
              </li>
              <li><Link href="/login" className="hover:text-gray-400 transition-colors">Login</Link></li>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Image
              src="/images/profile.jpg"
              alt="Usuário"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-medium">Usuário</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
