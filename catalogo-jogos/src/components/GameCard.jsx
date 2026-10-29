export default function GameCard({ game, onViewDetails }) {
  return (
    <article className="game-card">
      <h2>{game.nome}</h2>
      <p>
        {game.plataforma} · {game.genero}
      </p>
      <strong>
        {game.preco.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })}
      </strong>
      <button type="button" onClick={() => onViewDetails(game.id)}>
        Ver detalhes
      </button>
    </article>
  );
}
