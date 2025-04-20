import { login } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const result = await login(body); // Chama a função de login
    return Response.json(result); // Retorna a resposta com o token
  } catch {
    return new Response('Unauthorized', { status: 401 }); // Retorna erro caso o login falhe
  }
}
