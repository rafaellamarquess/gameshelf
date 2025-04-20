import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 text-gray-900 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vindo ao <span className="text-blue-600">GameShelf</span></h1>
      <p className="text-gray-600 mb-6 text-lg">Sua coleção de jogos, organizada e acessível</p>
      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
      >
        Entrar
      </Link>
    </div>
  );
}
