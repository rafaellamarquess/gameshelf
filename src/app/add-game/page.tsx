"use client";

import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function AddGame() {
  const [game, setGame] = useState({
    title: "",
    genre: "",
    releaseYear: "",

  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGame((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!imageFile) {
      alert("Selecione uma imagem para o jogo.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", game.title);
    formData.append("genre", game.genre);
    formData.append("releaseYear", game.releaseYear);
    formData.append("image", imageFile);
  
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    if (!apiUrl) {
      alert("URL da API não configurada.");
      return;
    }
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Erro ao adicionar o jogo");
      }
  
      alert("Jogo adicionado com sucesso!");
      setGame({ title: "", genre: "", releaseYear: "" });
      setImageFile(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Erro: " + error.message);
      } else {
        alert("Erro desconhecido.");
      }
    }
  };
  

  return (
    <>
      <Head>
        <title>Adicionar Novo Jogo | GameShelf</title>
      </Head>

      <div className="flex flex-col min-h-screen bg-black-100">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="bg-black-100 min-h-screen w-full ml-4">
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-black shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-6 text-white-800">Adicionar Novo Jogo</h2>
              <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-white-700">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={game.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-white-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="genre" className="block text-sm font-medium text-white-700">
                    Gênero
                  </label>
                  <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={game.genre}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-white-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="releaseYear" className="block text-sm font-medium text-white-700">
                    Ano de Lançamento
                  </label>
                  <input
                    type="number"
                    id="releaseYear"
                    name="releaseYear"
                    value={game.releaseYear}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-white-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-white-700">
                    Imagem do Jogo
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Adicionar Jogo
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
