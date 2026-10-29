export default function GameDetails({ game, loading, error, onClose }) {
  return (
    <section className="game-details" aria-label="Detalhes do jogo">
      <button type="button" onClick={onClose}>
        Fechar detalhes
      </button>
      {loading && <p role="status">Carregando detalhes...</p>}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {!loading && !error && game && (
        <>
          <h2>{game.nome}</h2>
          <p>
            Plataforma: {game.plataforma} · Gênero: {game.genero}
          </p>
          <p>
            Lançamento: {game.ano} · Nota: {game.nota.toFixed(1)}
          </p>
          <p>{game.descricao}</p>
          <p>
            Preço:{' '}
            {game.preco.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
        </>
      )}
    </section>
  );
}
