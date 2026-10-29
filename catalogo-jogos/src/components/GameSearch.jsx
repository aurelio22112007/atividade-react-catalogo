export default function GameSearch({ value, onSearchChange }) {
  return (
    <div className="search-box">
      <label htmlFor="game-search">Pesquisar jogo</label>
      <input
        id="game-search"
        type="search"
        placeholder="Digite o nome do jogo"
        value={value}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}
