import { useEffect, useState } from 'react';
import Header from './components/Header';
import GameSearch from './components/GameSearch';
import GameList from './components/GameList';
import GameDetails from './components/GameDetails';
import { getGames, getGameById } from './services/gamesApi';
import './App.css';

export default function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedId, setSelectedId] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadGames() {
      setLoading(true);
      setError('');

      try {
        const data = await getGames({ signal: controller.signal });
        if (!Array.isArray(data)) {
          throw new Error('A API não retornou uma lista de jogos.');
        }
        setGames(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadGames();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (selectedId === null) return;

    const controller = new AbortController();

    async function loadDetails() {
      setDetailsLoading(true);
      setDetailsError('');
      setSelectedGame(null);

      try {
        const data = await getGameById(selectedId, {
          signal: controller.signal
        });
        setSelectedGame(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setDetailsError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setDetailsLoading(false);
        }
      }
    }

    loadDetails();
    return () => controller.abort();
  }, [selectedId]);

  function closeDetails() {
    setSelectedId(null);
    setSelectedGame(null);
    setDetailsError('');
    setDetailsLoading(false);
  }

  const filteredGames = games.filter((game) =>
    game.nome.toLocaleLowerCase('pt-BR').includes(
      search.toLocaleLowerCase('pt-BR')
    )
  );

  return (
    <main className="container">
      <Header />
      <GameSearch value={search} onSearchChange={setSearch} />
      {loading && <p role="status">Carregando jogos...</p>}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {!loading && !error && (
        <>
          <p>{filteredGames.length} jogo(s) encontrado(s).</p>
          <GameList games={filteredGames} onViewDetails={setSelectedId} />
        </>
      )}
      {selectedId !== null && (
        <GameDetails
          game={selectedGame}
          loading={detailsLoading}
          error={detailsError}
          onClose={closeDetails}
        />
      )}
    </main>
  );
}
