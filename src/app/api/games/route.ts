// src/app/api/games/route.ts

import { NextResponse } from 'next/server';
import { IncomingForm, Fields, Files } from 'formidable';
import path from 'path';
import { getGames, addGame } from '@/lib/games';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Transforma o Request Web em algo próximo do IncomingMessage do Node
const toNodeReadable = async (req: Request): Promise<Readable & { headers: Record<string, string> }> => {
  const reader = req.body?.getReader();
  const stream = new Readable({
    async read() {
      if (!reader) {
        this.push(null);
        return;
      }

      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    },
  });

  // Injeta os headers necessários para o formidable funcionar corretamente
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  return Object.assign(stream, { headers });
};

const parseForm = async (
  req: Request
): Promise<{ fields: Fields; files: Files }> => {
  return new Promise(async (resolve, reject) => {
    const nodeReq = await toNodeReadable(req);

    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), '/public/images/games'),
      keepExtensions: true,
    });

    form.parse(nodeReq as unknown as import('http').IncomingMessage, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

// GET - retorna todos os jogos
export async function GET() {
  return NextResponse.json(getGames());
}

// POST - recebe imagem + dados
export async function POST(req: Request) {
  try {
    interface FormFields {
      title?: string[];
      genre?: string[];
    }

    interface FormFiles {
      image?: { filepath: string }[];
    }

    const { fields, files }: { fields: FormFields; files: FormFiles } = await parseForm(req);

    const title = fields.title?.[0] || '';
    const genre = fields.genre?.[0] || '';
    const image = files.image?.[0];

    const imageUrl = image ? `/images/games/${path.basename(image.filepath)}` : '';

    const newGame = {
      id: getGames().length + 1,
      title,
      genre,
      image: imageUrl,
    };

    addGame(newGame);

    return NextResponse.json({ message: 'Jogo cadastrado com sucesso!', game: newGame });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro no upload:', error.message);
    } else {
      console.error('Erro no upload:', error);
    }
    return NextResponse.json({ error: 'Erro ao processar o formulário' }, { status: 500 });
  }
}
// DELETE - não implementado
// export async function DELETE(req: Request) {
//   const { id } = await req.json();
//   const games = getGames();  