"use client";

import React from "react";
import Image from "next/image";

// Interface de acordo com os dados do backend
export interface Game {
  _id: string;
  title: string;
  genre: string;
  releaseYear: number;
  imageUrl: string;
}

// Componente GameCard que recebe props no formato Game
const GameCard: React.FC<Game> = ({
  title,
  imageUrl,
  genre,
  releaseYear,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
      <Image
        src={imageUrl}
        alt={title}
        width={500} // Adjust the width based on your design
        height={200} // Adjust the height based on your design
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-white text-lg font-bold mt-2">{title}</h3>
      <p className="text-gray-400 text-sm">
        {genre} • {releaseYear}
      </p>
    </div>
  );
};

export default GameCard;
