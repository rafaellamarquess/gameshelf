import fs from 'fs';
import path from 'path';

// Interface do jogo
export interface Game {
  id: number;
  title: string;
  image: string;
  genre: string;
}

// Caminho do arquivo JSON
const filePath = path.join(process.cwd(), 'data/games.json');

// Lê os jogos do arquivo JSON
export function getGames(): Game[] {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as Game[];
  } catch (error) {
    console.error('Erro ao ler o arquivo games.json:', error);
    return [];
  }
}

// Salva os jogos no arquivo JSON
function saveGames(games: Game[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(games, null, 2), 'utf-8');
  } catch (error) {
    console.error('Erro ao salvar o arquivo games.json:', error);
  }
}

// Adiciona um novo jogo
export function addGame(game: Game): void {
  const games = getGames();
  games.push(game);
  saveGames(games);
}