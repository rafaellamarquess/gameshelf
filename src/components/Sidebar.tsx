"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart, Library, Users, Calendar, Star, TrendingUp, List, Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} className="text-white" />
      </button>

      <aside
        className={`bg-gray-900 text-white w-64 h-screen p-6 fixed top-0 left-0 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative z-40`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Image src="/images/profile.jpg" alt="User" width={50} height={50} className="rounded-full" />
          <span className="text-lg font-semibold">Usuário</span>
        </div>

        <nav className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
            <Heart size={20} /> <span>Wishlist</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
            <Library size={20} /> <span>Library</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
            <Users size={20} /> <span>Followers</span>
          </div>
        </nav>

        <div className="mt-6">
          <h2 className="text-gray-400 text-sm uppercase mb-2">Releases</h2>
          <nav className="flex flex-col gap-3">
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
              <Calendar size={20} /> <span>Last Year</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
              <Calendar size={20} /> <span>This Month</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
              <Calendar size={20} /> <span>Next Month</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
              <Calendar size={20} /> <span>Calendar</span>
            </div>
          </nav>
        </div>

        <div className="mt-6">
          <h2 className="text-gray-400 text-sm uppercase mb-2">Top</h2>
          <nav className="flex flex-col gap-3">
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
              <Star size={20} /> <span>Best of the Year</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
              <TrendingUp size={20} /> <span>Popular in 2025</span>
            </div>
          </nav>
        </div>

        <nav className="flex flex-col gap-3 mt-6">
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
            <List size={20} /> <span>Reviews</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-400">
            <List size={20} /> <span>All Games</span>
          </div>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
