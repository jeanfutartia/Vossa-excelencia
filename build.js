// Monta o jogo em public/index.html + public/game.js. Uso: node build.js
const fs=require('fs'), path=require('path');
const dir=__dirname, src=path.join(dir,'src'), out=path.join(dir,'public');
const JS=['2_data.js','2d_parties.js','2b_data.js','2c_art.js','3_events.js','4_engine2.js','4b_world.js','2e_cities.js','4c_tones.js','4d_v5.js','4e_bio.js','4f_v7.js','5_ui2.js','5b_ui3.js','5d_v6ui.js','5e_v7ui.js','5c_v5ui.js'];
fs.mkdirSync(out,{recursive:true});
const game=JS.map(f=>fs.readFileSync(path.join(src,f),'utf8')).join('\n');
new Function(game); // falha aqui se houver erro de sintaxe
fs.writeFileSync(path.join(out,'game.js'),game);
const shell=fs.readFileSync(path.join(src,'shell.html'),'utf8'), cut=shell.indexOf('</style>')+'</style>'.length;
const head=`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Vossa Excelência: simulador de carreira política brasileira, de vereador a presidente.">
<meta name="theme-color" content="#090E1A">
<style>:root{color-scheme:dark;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px/1.5 system-ui,-apple-system,'Segoe UI',sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
`;
fs.writeFileSync(path.join(out,'index.html'),head+shell.slice(0,cut)+'\n</head>\n<body>\n'+shell.slice(cut).trim()+'\n<script src="game.js"></script>\n</body>\n</html>\n');
console.log('ok: public/index.html e public/game.js');
