# Vossa Excelência: A Arte do Possível

Simulador de carreira política brasileira no navegador. Site estático: HTML, CSS e JavaScript puros, sem servidor.

## Estrutura
- `src/` código-fonte (dados, arte, histórias, motor e interface)
- `build.js` junta os arquivos de `src/` em `public/index.html` e `public/game.js` (rode `node build.js` ou `npm run build`)
- `public/` site pronto (já vem montado)
- `render.yaml` configuração do Render

## Publicar no Render
1. Crie um repositório no GitHub e envie esta pasta inteira.
2. No Render: **New → Blueprint**, escolha o repositório. Ele lê o `render.yaml` sozinho.
   Ou: **New → Static Site**, escolha o repositório, Build Command `node build.js`, Publish Directory `public`.
3. Clique em Deploy. O endereço fica parecido com `https://vossa-excelencia.onrender.com`.

## Rodar no computador
Abra `public/index.html` no navegador, ou rode `npm start` (usa `npx serve public`). No VS Code, a extensão Live Server também funciona.

## Alterar o jogo
Edite os arquivos em `src/` e rode `node build.js`. Ao enviar para o GitHub, o Render publica de novo automaticamente.

As carreiras ficam salvas no navegador de cada jogador (localStorage).
