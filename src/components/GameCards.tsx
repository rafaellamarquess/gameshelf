interface GameCardProps {
    title: string;
    image: string;
    genre: string;
  }
  
  const GameCard: React.FC<GameCardProps> = ({ title, image, genre }) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
        <h3 className="text-white text-lg font-bold mt-2">{title}</h3>
        <p className="text-gray-400 text-sm">{genre}</p>
      </div>
    );
  };
  
  export default GameCard;