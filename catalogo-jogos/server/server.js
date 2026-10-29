import http from 'node:http';
import { readFileSync } from 'node:fs';

const PORT = process.env.PORT || 3000;
const DELAY_MS = Number(process.env.DELAY_MS || 400);
const games = JSON.parse(
  readFileSync(new URL('./games.json', import.meta.url), 'utf-8')
);

function send(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});

  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  setTimeout(() => {
    if (req.method !== 'GET') {
      return send(res, 405, { erro: 'Método não permitido' });
    }

    if (pathname === '/jogos') {
      return send(res, 200, games);
    }

    const match = pathname.match(/^\/jogos\/([^/]+)$/);
    if (match) {
      const game = games.find((g) => String(g.id) === match[1]);
      return game
        ? send(res, 200, game)
        : send(res, 404, { erro: 'Jogo não encontrado' });
    }

    send(res, 404, { erro: 'Rota não encontrada' });
  }, DELAY_MS);
});

server.listen(PORT, () => {
  console.log(`API de jogos em http://localhost:${PORT}/jogos`);
});
