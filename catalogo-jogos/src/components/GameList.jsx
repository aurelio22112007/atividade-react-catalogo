import GameCard from './GameCard';

export default function GameList({ games, onViewDetails }) {
  if (games.length === 0) {
    return <p>Nenhum jogo encontrado.</p>;
  }

  return (
    <section className="game-grid" aria-label="Lista de jogos">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onViewDetails={onViewDetails} />
      ))}
    </section>
  );
}
