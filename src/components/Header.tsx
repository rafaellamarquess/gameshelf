import Image from 'next/image'

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h1 className="text-xl font-bold">GameShelf</h1>
          <input
            type="text"
            placeholder="Pesquisar jogos..."
            className="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 w-full sm:w-56"
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start mt-4 sm:mt-0">
          <div className="flex items-center gap-2">
            <Image
              src="/images/profile.png"
              alt="Usuário"
              width={800}
              height={500}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">Usuário</span>
          </div>

          <nav>
            <ul className="flex gap-4">
              <li><a href="#" className="hover:text-gray-400">Home</a></li>
              <li><a href="#" className="hover:text-gray-400">Games</a></li>
              <li><a href="/login" className="hover:text-gray-400">Login</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;