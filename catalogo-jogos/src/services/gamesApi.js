const API_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

export function getGames({ signal } = {}) {
  return request('/jogos', { signal });
}

export function getGameById(id, { signal } = {}) {
  return request(`/jogos/${encodeURIComponent(id)}`, { signal });
}
