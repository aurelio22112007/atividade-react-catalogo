# Catálogo de Jogos (React + Vite)

Atividade Prática de React: SPA que lista jogos, pesquisa por nome e consulta os detalhes de cada jogo em uma API REST.

## Como executar

Pré-requisito: Node.js (versão compatível com o Vite 7, ou seja, 20.19+ ou 22.12+).

```bash
npm install
cp .env.example .env     # no Windows: copy .env.example .env
npm run api              # terminal 1: API em http://localhost:3000
npm run dev              # terminal 2: front-end (endereço mostrado no terminal)
```

Reinicie `npm run dev` sempre que alterar o `.env`.

## Configuração da API

O front-end lê o endereço da API em `VITE_API_URL` (arquivo `.env`).

| Método | Rota          | Resposta                              |
| ------ | ------------- | ------------------------------------- |
| GET    | `/jogos`      | Array de jogos                        |
| GET    | `/jogos/:id`  | Um jogo (`404` se o id não existir)   |

Campos de cada jogo: `id`, `nome`, `preco`, `plataforma`, `genero`, `nota`, `ano`, `descricao`.

A pasta `server/` traz uma API local sem dependências (só Node.js) para a aplicação funcionar de imediato. Para usar a API da turma, altere `VITE_API_URL` e, se necessário, os caminhos em `src/services/gamesApi.js` e os nomes dos campos nos componentes. A API precisa liberar CORS para o endereço do Vite.

Variáveis opcionais da API local: `PORT` (padrão 3000) e `DELAY_MS` (latência simulada, padrão 400 ms).

## Árvore de componentes

```
App
├── Header
├── GameSearch
├── GameList
│   └── GameCard (repetido para cada jogo)
└── GameDetails (aparece quando há um jogo selecionado)
```

Estrutura de arquivos:

```
src/
├── main.jsx
├── App.jsx
├── App.css
├── components/  Header, GameSearch, GameList, GameCard, GameDetails
├── services/    gamesApi.js   (fetch para a API)
└── data/        games.js      (dados locais da Parte 1)
server/          API local (server.js + games.json)
```

## Fluxo de dados

`App` concentra os estados: lista de jogos, texto da pesquisa, carregando/erro e o jogo selecionado com seus próprios estados de carregamento e erro. Ao montar, um `useEffect` chama `getGames` e guarda o resultado em `games`. `GameSearch` recebe `value` e `onSearchChange` por props; ao digitar, chama `setSearch` em `App`, que recalcula `filteredGames` (valor derivado, sem estado extra). `GameList` recebe `filteredGames` e `onViewDetails`, percorre o array com `map` (usando `key={game.id}`) e entrega cada jogo a um `GameCard`. Ao clicar em "Ver detalhes", `GameCard` chama `onViewDetails(game.id)`, que é `setSelectedId` de `App`. A mudança de `selectedId` dispara outro `useEffect`, que chama `getGameById` e atualiza `selectedGame`. `App` repassa o resultado, o carregando e o erro para `GameDetails`, que só aparece enquanto `selectedId` não é `null`. "Fechar detalhes" limpa esses estados.

## Testes manuais

Marque após executar e anexe os prints na pasta `evidencias/`.

- [ ] A aplicação abre sem erros no console.
- [ ] Os jogos são carregados da API.
- [ ] A busca por nome funciona (ex.: "zelda", depois apagar o texto).
- [ ] A mensagem "Nenhum jogo encontrado." aparece quando a busca não tem resultado (ex.: "xyz").
- [ ] Com a API parada, a tela mostra mensagem de erro; ao reiniciar a API e recarregar, a lista volta.
- [ ] "Ver detalhes" faz `GET /jogos/:id` (conferir na aba Rede do navegador).
- [ ] "Fechar detalhes" oculta o painel.
- [ ] Nada recarrega a página durante a navegação.

Evidências: _inserir aqui os prints (ex.: `evidencias/01-lista.png`, `02-busca.png`, `03-vazio.png`, `04-erro.png`, `05-detalhes.png`)._
