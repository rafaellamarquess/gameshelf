export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  name: string;
}

export async function login({ email, password }: LoginCredentials): Promise<AuthResponse> {
  if (email === 'admin@gameshelf.com' && password === '123') {
    return { token: 'fake-token-admin', name: 'Admin' };
  }

  throw new Error('Credenciais inválidas');
}