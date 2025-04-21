// src/components/Sidebar.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart, Library, Users, Calendar, Star, TrendingUp, List, Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-20 left-4 z-50 bg-gray-800 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} className="text-white" />
      </button>

      <aside
        className={`bg-black-900 text-white w-64 h-full md:h-screen p-6 fixed top-0 left-0 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative z-40 overflow-y-auto`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Image src="/images/profile.jpg" alt="User" width={40} height={40} className="rounded-full" />
          <span className="text-lg font-semibold">Usuário</span>
        </div>

        <nav className="flex flex-col gap-4">
          <SidebarItem icon={<Heart size={20} />} label="Wishlist" />
          <SidebarItem icon={<Library size={20} />} label="Library" />
          <SidebarItem icon={<Users size={20} />} label="Followers" />
        </nav>

        <SidebarSection title="Releases">
          <SidebarItem icon={<Calendar size={20} />} label="Last Year" />
          <SidebarItem icon={<Calendar size={20} />} label="This Month" />
          <SidebarItem icon={<Calendar size={20} />} label="Next Month" />
          <SidebarItem icon={<Calendar size={20} />} label="Calendar" />
        </SidebarSection>

        <SidebarSection title="Top">
          <SidebarItem icon={<Star size={20} />} label="Best of the Year" />
          <SidebarItem icon={<TrendingUp size={20} />} label="Popular in 2025" />
        </SidebarSection>

        <nav className="flex flex-col gap-3 mt-6">
          <SidebarItem icon={<List size={20} />} label="Reviews" />
          <SidebarItem icon={<List size={20} />} label="All Games" />
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 md:hidden z-30 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const SidebarItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 cursor-pointer hover:text-black-400 transition-colors duration-200">
    {icon} <span>{label}</span>
  </div>
);

const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-6">
    <h2 className="text-white-400 text-sm uppercase mb-2">{title}</h2>
    <nav className="flex flex-col gap-3">
      {children}
    </nav>
  </div>
);

export default Sidebar;
