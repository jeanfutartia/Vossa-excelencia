// ================= DECISÕES: 1 CRISE, 2 DILEMAS, 1 OPORTUNIDADE =================
const TONES={crise:{n:'Crise',d:'Todas as saídas custam algo: escolha o mal menor',col:'var(--red)'},dilema:{n:'Dilema',d:'Cada opção ganha de um lado e perde de outro',col:'var(--slate)'},oport:{n:'Oportunidade',d:'Todas as opções ajudam: escolha quem ganha',col:'var(--green)'}};
function isBad(k,v){ if(k==='rj') return v>0; if(k.startsWith('h:')) return false; return v<0; }
function toneFx(fx,tone){ if(tone==='dilema') return fx; const o={}; for(const k in fx){ const v=fx[k]; if(!v||k.startsWith('h:')){ if(k.startsWith('h:')) o[k]=v; continue; } if((tone==='crise')===isBad(k,v)) o[k]=v; } return o; }
function segsHere(){ return Object.keys(SEG_SIZE[jurKey()]).sort((a,b)=>SEG_SIZE[jurKey()][b]-SEG_SIZE[jurKey()][a]); }
function three(a){ const b=a.slice(); for(let i=b.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [b[i],b[j]]=[b[j],b[i]]; } return b.slice(0,3); }
function segIn(k){ return SEG[k].n.toLowerCase(); }
const ISS_CRISE={saude:'Uma paciente morreu esperando atendimento no pronto-socorro',transporte:'Um ônibus lotado tombou na avenida principal',seguranca:'Uma bala perdida atingiu uma criança na porta de casa',educacao:'O teto de uma escola desabou durante a madrugada',emprego:'A maior empregadora da região anunciou mil demissões',custo:'O preço do botijão de gás dobrou em um mês',corrupcao:'Um assessor seu foi citado num esquema de desvio',ambiente:'Um vazamento químico contaminou o rio que abastece a cidade',costumes:'Uma polêmica sobre costumes tomou as redes com seu nome no meio',impostos:'Um aumento de tributos que você apoiou virou alvo de revolta',moradia:'Um prédio ocupado pegou fogo e deixou centenas sem teto'};

// ---------- CRISES (todas as opções vermelhas) ----------
const CRISE={
 ruas:[
  ()=>{ const i=pickIssue(); return {scene:SCENE_ISS[i],tag:ISS[i].n,t:ISS_CRISE[i],txt:`A tragédia comove ${jurName()} e as pessoas querem um responsável. Os olhos estão em você.`,ch:[
    {l:'Assumir a responsabilidade publicamente',fx:{cp:-3,am:-2},r:'A honestidade foi respeitada, mas o desgaste ficou.'},
    {l:'Apontar a culpa de outros',fx:{et:-3,'s:media':-3,ip:-2},r:'Pouca gente acreditou e os acusados reagiram.'},
    {l:'Ficar em silêncio até a poeira baixar',fx:{['o:'+i]:-7,apo:-3},r:'Seu sumiço foi a notícia do dia.'}]}; },
  ()=>{ const [a,b]=three(segsHere()); return {scene:'protesto',tag:'Revolta',t:`${SEG[a].n} rompem com você`,txt:`Lideranças de ${segIn(a)} dizem que você abandonou o grupo e convocam um ato contra você. Para acalmá-los, você teria de contrariar ${segIn(b)}.`,ch:[
    {l:`Ceder às exigências de ${segIn(a)}`,fx:{['s:'+b]:-5,$:-6},r:`O ato foi cancelado, mas ${segIn(b)} se sentiram traídos.`},
    {l:'Enfrentar o ato',fx:{['s:'+a]:-7},r:'O ato encheu e as fotos não ajudaram.'},
    {l:'Mandar um recado conciliador e não fazer nada',fx:{['s:'+a]:-3,am:-2,cp:-1},r:'Ninguém ficou satisfeito.'}]}; },
  ()=>{ const s=pick(segsHere()); return {scene:'comicio',tag:'Agenda pública',t:'Vaiado em público',txt:`Num evento cheio de ${segIn(s)}, você foi vaiado do começo ao fim do discurso. Os celulares estão gravando.`,ch:[
    {l:'Discutir com quem vaiava',fx:{am:-3,et:-2},r:'O bate-boca virou vídeo viral.'},
    {l:'Sair pela porta dos fundos',fx:{cp:-2,['s:'+s]:-3},r:'A saída apressada virou piada.'},
    {l:'Ficar e ouvir as reclamações até o fim',fx:{['s:'+s]:-1,$:-2,cp:-1},r:'Você ouviu tudo calado. Saiu menor, mas inteiro.'}]}; },
  ()=>({scene:'protesto',tag:'Greve geral',t:`Greve geral paralisa ${jurName().replace(/^(no|na|em) /,'')}`,txt:'Sindicatos e movimentos param tudo contra a carestia. Comércio fechado, ônibus parados. Qualquer posição custa caro.',ch:[
    {l:'Apoiar os grevistas',fx:{'s:elite':-6,aa:-2,'s:media':-2},r:'Empresários e lojistas não perdoaram.'},
    {l:'Condenar a greve',fx:{'s:serv':-6,'s:per':-4},r:'Os sindicatos colocaram seu rosto nos cartazes.'},
    {l:'Ficar em cima do muro',fx:{am:-3,apo:-2},r:'Os dois lados acharam você fraco.'}]}),
  ()=>({scene:'skyline',tag:'Promessa',t:'Cobrado por promessa de campanha',txt:'Moradores lembram de uma promessa sua que nunca saiu do papel. O vídeo da promessa voltou a circular.',ch:[
    {l:'Pedir desculpas e dar novo prazo',fx:{cp:-2,am:-2},r:'O novo prazo foi recebido com desconfiança.'},
    {l:'Culpar a burocracia',fx:{apo:-3,et:-1},r:'A desculpa soou velha.'},
    {l:'Bancar parte da obra com recursos próprios',fx:{$:-14},r:'Você pagou caro para não ficar sem palavra.'}]}),
 ],
 imprensa:[
  ()=>({scene:'imprensa',tag:'Manchete',t:'Seus gastos viram manchete',txt:`O maior jornal publicou que seu gabinete gastou R$ ${fmt(40+rnd()*200)} mil com ${pick(['passagens aéreas','jantares','combustível','publicidade','consultorias'])} em um ano.`,ch:[
    {l:'Devolver o dinheiro',fx:{$:-10},r:'A devolução encerrou o assunto, e seu caixa sentiu.'},
    {l:'Defender que os gastos foram legais',fx:{am:-4,aa:-2},r:'Legal, mas ninguém achou moral.'},
    {l:'Não comentar',fx:{et:-3,aa:-2},r:'O silêncio pareceu culpa.'}]}),
  ()=>{ const s=pick(segsHere()); return {scene:'imprensa',tag:'Redes sociais',t:'Uma frase sua vira escândalo',txt:`Um trecho seu, tirado de contexto, parece ofender ${segIn(s)}. A hashtag com seu nome está no topo.`,ch:[
    {l:'Pedir desculpas',fx:{cp:-2,pt:-2},r:'As desculpas acalmaram o grupo, mas seus aliados acharam fraqueza.'},
    {l:'Publicar o vídeo completo',fx:{['s:'+s]:-2,$:-3},r:'O contexto ajudou pouco. O corte já tinha viajado.'},
    {l:'Dobrar a aposta',fx:{['s:'+s]:-7,aa:-2},r:'A polêmica cresceu ainda mais.'}]}; },
  ()=>({scene:'imprensa',who:S.nemesis,tag:'Fake news',t:'Uma mentira sobre você viraliza',txt:`Uma corrente diz que você ${pick(['tem conta secreta no exterior','vai acabar com o auxílio dos mais pobres','é investigado por pedofilia','vai fechar igrejas','vendeu terras para estrangeiros'])}. Já chegou a milhões de pessoas.`,ch:[
    {l:'Processar os autores',fx:{$:-9},r:'A Justiça mandou remover. O estrago já estava feito.'},
    {l:'Gravar vídeo desmentindo',fx:{am:-1,apo:-2,$:-2},r:'O desmentido alcançou metade de quem viu a mentira.'},
    {l:'Ignorar',fx:{apo:-4,'s:idosos':-2},r:'Na feira, perguntaram se era verdade.'}]}),
  ()=>({scene:'tv',tag:'Ao vivo',t:'Você trava numa entrevista ao vivo',txt:'Perguntado sobre um número básico do orçamento, você ficou mudo por longos segundos. O corte virou meme.',ch:[
    {l:'Rir de si mesmo nas redes',fx:{aa:-2,cp:-1},r:'Amenizou, mas a imagem de despreparo ficou.'},
    {l:'Culpar a edição da emissora',fx:{am:-3,et:-1},r:'A íntegra mostrou que não houve edição.'},
    {l:'Sumir da mídia por um tempo',fx:{am:-2,apo:-2},r:'Você saiu do noticiário, e da cabeça do eleitor.'}]}),
  ()=>({scene:'imprensa',tag:'Vazamento',t:'Vaza uma conversa sua de bastidor',txt:'Um áudio mostra você negociando cargos em troca de votos. Nada ilegal, mas feio.',ch:[
    {l:'Confirmar e dizer que é a política real',fx:{am:-3,et:-2},r:'A franqueza não convenceu.'},
    {l:'Negar que seja sua voz',fx:{rj:4,et:-3},r:'A perícia confirmou que era você.'},
    {l:'Culpar um assessor',fx:{ip:-3,pt:-2},r:'O assessor foi demitido e contou mais coisas.'}]}),
 ],
 bastidores:[
  ()=>{ const a=S.allies.slice().sort((x,y)=>y.pow-x.pow)[0]; if(!a) return null; return {scene:'skyline',who:a,tag:'Aliados',t:`${a.name} ameaça romper`,txt:`${a.name} diz que foi esquecido(a) e ameaça levar o grupo para ${S.nemesis?S.nemesis.name:'o adversário'}.`,ch:[
    {l:'Pagar o preço que ele pede',fx:{$:-12},fn:()=>{a.loy=clamp(a.loy+10,0,100)},r:'Ele ficou. Por enquanto.'},
    {l:'Entregar um cargo a um indicado dele',fx:{et:-2,ip:-2},fn:()=>{a.loy=clamp(a.loy+8,0,100)},r:'O indicado assumiu, e a imprensa notou.'},
    {l:'Deixar que vá embora',fx:{cp:-3,apo:-1},fn:()=>{S.allies=S.allies.filter(x=>x!==a)},r:`${a.name} rompeu com você.`}]}; },
  ()=>({scene:'skyline',tag:'Partido · '+PARTIES[S.party].sig,t:'O partido corta seu repasse',txt:`A direção do ${PARTIES[S.party].sig} decidiu cortar a verba que iria para o seu grupo.`,ch:[
    {l:'Aceitar calado',fx:{$:-10},r:'Você vai ter que se virar sem esse dinheiro.'},
    {l:'Brigar publicamente com a cúpula',fx:{pt:-9},r:'A briga foi parar nos jornais.'},
    {l:'Ceder espaço a um aliado do cacique',fx:{cp:-3,et:-1},r:'O repasse voltou, mas seu grupo encolheu.'}]}),
  ()=>({scene:'tribunal',tag:'Ministério Público',t:'Abrem um inquérito sobre suas contas',txt:'O Ministério Público abriu inquérito para apurar movimentações nas suas contas de campanha.',ch:[
    {l:'Contratar a melhor banca de advogados',fx:{$:-15},r:'Os advogados estão cuidando de tudo.'},
    {l:'Colaborar e abrir tudo',fx:{cp:-4,pt:-3},r:'Seus aliados não gostaram da transparência.'},
    {l:'Atacar o promotor',fx:{rj:6,aa:-3},r:'O promotor ficou ainda mais motivado.'}]}),
  ()=>({scene:'dinheiro',tag:'Financiamento',t:'Um doador cobra a fatura',txt:`Um grande doador da sua última campanha quer ${pick(['um contrato para a empresa do irmão','uma mudança na lei do setor dele','a nomeação de um sobrinho'])}.`,ch:[
    {l:'Fazer o favor discretamente',fx:{rj:5,et:-3},r:'O favor foi feito. Ficou registrado em algum lugar.'},
    {l:'Recusar e perder o doador',fx:{$:-10,'s:elite':-3},r:'Ele avisou que nunca mais doa.'},
    {l:'Devolver o que ele doou',fx:{$:-16},r:'Caro, mas você ficou livre dele.'}]}),
  ()=>({scene:'skyline',who:S.nemesis,tag:'Rival',t:`${S.nemesis.name} leva seus cabos eleitorais`,txt:`${S.nemesis.name} ofereceu mais dinheiro e levou metade dos seus cabos eleitorais nos bairros.`,ch:[
    {l:'Cobrir a oferta',fx:{$:-10},r:'Alguns voltaram. Custou caro.'},
    {l:'Deixar irem',fx:{apo:-3,'s:per':-2},r:'Sua presença nos bairros diminuiu.'},
    {l:'Espalhar podres do rival',fx:{et:-3,rj:3},r:'O rival respondeu na mesma moeda.'}]}),
 ],
 gabinete:[
  ()=>{ if(OFF[S.office].type!=='leg') return null; return {scene:'camara',tag:'Conselho de Ética',t:'Representação contra você no Conselho de Ética',txt:'Um partido adversário pediu sua punição por quebra de decoro depois de um discurso duro.',ch:[
    {l:'Fazer uma defesa longa e técnica',fx:{cp:-3},r:'O caso foi arquivado, com desgaste.'},
    {l:'Fazer um acordo com o partido adversário',fx:{ip:-4,pt:-2},r:'O processo morreu na gaveta. Você ficou devendo.'},
    {l:'Abrir mão da sua comissão para encerrar o caso',fx:{cp:-5},r:'Você perdeu espaço na Casa.'}]}; },
  ()=>{ if(OFF[S.office].type!=='leg') return null; return {scene:'congresso',tag:'Orçamento',t:'Cortam suas emendas',txt:'O relator do orçamento cortou as emendas que você tinha prometido para suas bases.',ch:[
    {l:'Aceitar o corte',fx:{apo:-3,'s:per':-2},r:'Suas bases ficaram sem a obra.'},
    {l:'Obstruir as votações até recuperar',fx:{ip:-5},r:'Você recuperou uma parte e ganhou inimigos.'},
    {l:'Denunciar o relator na imprensa',fx:{pt:-5,ip:-3},r:'A denúncia irritou a cúpula do partido.'}]}; },
  ()=>{ if(OFF[S.office].type!=='leg') return null; const lv=billLevel(), B=pick(BILLS[lv]); const pro=B.pro[0]||'media', con=B.con[0]||'elite'; return {scene:'congresso',tag:'Votação nominal',t:`Votação sem saída: ${B.n}`,txt:`O painel abre para votar o projeto: ${B.n}. Seu partido e suas bases estão divididos, e qualquer voto vai custar caro.`,ch:[
    {l:'Votar SIM',fx:{['s:'+con]:-6,pt:-3},r:`${SEG[con].n} anotaram seu voto.`},
    {l:'Votar NÃO',fx:{['s:'+pro]:-6,ip:-2},r:`${SEG[pro].n} anotaram seu voto.`},
    {l:'Sair do plenário',fx:{am:-3,pt:-3},r:'A ausência foi notada pelos dois lados.'}]}; },
  ()=>{ if(OFF[S.office].type!=='exec') return null; const mv=Math.round((30+rnd()*70)*OFF[S.office].sc*(S.office==='pres'?40:1)); return {scene:HOUSE_SCENE[S.office],tag:'Caixa',t:`Rombo de R$ ${mv>=1000?num1(mv/1000)+' bilhões':fmt(mv)+' milhões'}`,txt:'A arrecadação desabou e as contas deste trimestre não fecham. Alguém vai pagar.',ch:[
    {l:'Cortar na saúde',fx:{'o:saude':-6,'s:idosos':-5},r:'Postos reduziram o horário.'},
    {l:'Aumentar impostos',fx:{aa:-3,am:-3,'o:impostos':-4},r:'O aumento passou, com protestos.'},
    {l:'Atrasar o pagamento de fornecedores',fx:{f:-7,rj:2},r:'As empresas ameaçam ir à Justiça.'}]}; },
  ()=>{ if(OFF[S.office].type!=='exec') return null; const i=pickIssue(); return {scene:SCENE_ISS[i],tag:'Crise de governo',t:ISS_CRISE[i],txt:'A crise estourou no seu governo e cobra uma resposta imediata.',ch:[
    {l:'Gastar o que for preciso',fx:{f:-8},r:'A resposta foi rápida e caríssima.'},
    {l:'Culpar a gestão anterior',fx:{et:-2,am:-3},r:'Parte do eleitorado não engoliu.'},
    {l:'Pedir socorro ao governo de cima',fx:{cp:-3,ip:-2},r:'A ajuda veio com condições.'}]}; },
  ()=>{ if(OFF[S.office].type!=='exec') return null; return {scene:'protesto',tag:'Servidores',t:'Servidores entram em greve',txt:'Professores, médicos e técnicos param por reajuste. Serviços essenciais estão parados.',ch:[
    {l:'Conceder o reajuste',fx:{f:-7},r:'A greve acabou. O caixa sentiu.'},
    {l:'Cortar o ponto dos grevistas',fx:{'s:serv':-7},r:'Os servidores viraram oposição.'},
    {l:'Parcelar o reajuste',fx:{'s:serv':-3,f:-3},r:'Ninguém comemorou.'}]}; },
  ()=>{ if(S.office!=='none') return null; return {scene:'dinheiro',tag:'Vida pessoal',t:'As dívidas apertam',txt:'Sem salário de mandato, as dívidas da última campanha chegaram todas de uma vez.',ch:[
    {l:'Vender bens da família',fx:{$:-10},r:'Você ficou sem o carro e sem a casa de praia.'},
    {l:'Pedir empréstimo a um aliado',fx:{pt:-3,et:-1},r:'O aliado emprestou, e agora você deve um favor.'},
    {l:'Assumir publicamente que está quebrado',fx:{cp:-3,aa:-2},r:'A franqueza custou prestígio.'}]}; },
  ()=>{ if(S.office!=='none') return null; return {scene:'skyline',tag:'Esquecimento',t:'Seu nome some das pesquisas',txt:'Sem mandato, você deixou de ser citado. Os institutos nem colocam seu nome nos cenários.',ch:[
    {l:'Bancar uma pesquisa para aparecer',fx:{$:-8},r:'Você reapareceu com 3%.'},
    {l:'Fazer barulho com declarações polêmicas',fx:{et:-2,aa:-2},r:'Você voltou ao noticiário pelo lado errado.'},
    {l:'Aceitar a geladeira por um tempo',fx:{cp:-4},r:'Os aliados começam a procurar outros nomes.'}]}; },
 ],
};

// ---------- OPORTUNIDADES (todas as opções verdes) ----------
const OPP_CATS={ruas:['base'],imprensa:['midia'],bastidores:['partido','dinheiro'],gabinete:['leg','exec','pres']};
const OPP_HEAD={ruas:['Agenda livre nos bairros','A comunidade abre as portas','Uma semana para estar com o povo'],imprensa:['Os holofotes estão em você','A imprensa quer ouvir você','Uma semana boa para aparecer'],bastidores:['Portas abertas nos bastidores','Hora de fortalecer o grupo','Os caciques querem conversar'],gabinete:['Uma janela no mandato','Espaço na pauta','O gabinete tem fôlego']};
function oppFromActions(th){
  const cats=S.office==='none'&&th==='gabinete'?['dinheiro','base']:OPP_CATS[th];
  const pool=ACTIONS.filter(a=>cats.includes(a.cat)&&whoMatch(a.who)&&!a.o.camp&&!a.o.special&&!a.o.illegal&&!a.o.req&&!(a.fx.rj>0)&&!((a.fx.et||0)<=-2)&&!(S.onceDone[a.id]));
  const ws=three(pool.filter(a=>!S.oppUsed||!S.oppUsed.includes(a.id))); if(ws.length<3) return null;
  S.oppUsed=(S.oppUsed||[]).concat(ws.map(a=>a.id)).slice(-24);
  return {scene:th==='imprensa'?'imprensa':th==='bastidores'?'skyline':th==='ruas'?'comicio':HOUSE_SCENE[S.office],tag:'Agenda',t:pick(OPP_HEAD[th]),txt:'O trimestre abriu espaço para uma iniciativa. Todas as opções rendem frutos: escolha onde investir seu tempo.',ch:ws.map(a=>({l:genderize(a.n),d:genderize(a.d),fx:toneFx(a.fx,'oport'),r:'Deu certo: '+genderize(a.n).toLowerCase()+'.'}))};
}
const OPP={
 ruas:[
  ()=>{ const ss=three(segsHere()); return {scene:'comicio',tag:'Convites',t:'Três grupos querem você',txt:'Três grupos diferentes convidaram você para o mesmo fim de semana. Dá para ir a um só.',ch:ss.map(s=>({l:`Ir ao encontro de ${segIn(s)}`,fx:{['s:'+s]:6,cp:1},r:`${SEG[s].n} receberam você de braços abertos.`}))}; },
  ()=>{ const is=hotIssues().slice(0,3); return {scene:'comicio',tag:'Pautas',t:'O eleitor quer ouvir propostas',txt:`Uma rodada de audiências públicas ${jurName()} abriu espaço para você apresentar um projeto.`,ch:is.map(i=>({l:`Apresentar proposta sobre ${ISS[i].n.toLowerCase()}`,fx:Object.assign({['o:'+i]:8},Object.fromEntries(Object.entries(SEG).filter(([k,s])=>s.care[i]&&SEG_SIZE[jurKey()][k]).slice(0,2).map(([k])=>['s:'+k,3]))),r:`Sua proposta sobre ${ISS[i].n.toLowerCase()} foi bem recebida.`}))}; },
  ()=>oppFromActions('ruas'),
 ],
 imprensa:[
  ()=>({scene:'tv',tag:'Convites da mídia',t:'Três convites de entrevista',txt:'Três veículos querem entrevista exclusiva com você nesta semana.',ch:three(VEIC).map((v,i)=>({l:`Falar com ${v}`,fx:[{am:3,'s:media':2},{apo:3,'s:per':2},{aa:3,'s:elite':2}][i],r:`A entrevista para ${v} repercutiu bem.`}))}),
  ()=>({scene:'imprensa',tag:'Redes',t:'Seu vídeo viraliza do jeito certo',txt:'Um vídeo seu explicando um problema da cidade passou de um milhão de visualizações. Como aproveitar?',ch:[
    {l:'Fazer uma live respondendo perguntas',fx:{am:3,'s:jovens':3},r:'A live bateu recorde de audiência no seu perfil.'},
    {l:'Transformar em campanha de doações',fx:{apo:3,et:2},r:'A campanha arrecadou cestas para os bairros.'},
    {l:'Usar para pressionar por uma votação',fx:{cp:3,ip:2},r:'A pressão das redes destravou a pauta.'}]}),
  ()=>oppFromActions('imprensa'),
 ],
 bastidores:[
  ()=>({scene:'dinheiro',tag:'Financiamento',t:'Doações legais chegam',txt:'Depois de um bom trimestre, novos doadores pessoas físicas procuraram sua equipe. Tudo declarado.',ch:[
    {l:'Aceitar a doação de empresários locais',fx:{$:12,'s:elite':2},r:'O caixa cresceu com recibo.'},
    {l:'Lançar uma vaquinha popular',fx:{$:6,apo:2,'s:per':2},r:'Milhares de pequenas doações chegaram.'},
    {l:'Usar o dinheiro para contratar equipe',fx:{$:4,cp:2},r:'Sua estrutura ficou mais profissional.'}]}),
  ()=>({scene:'skyline',tag:'Partido · '+PARTIES[S.party].sig,t:'O partido quer você na linha de frente',txt:`A direção do ${PARTIES[S.party].sig} gostou do seu trabalho e oferece espaço.`,ch:[
    {l:'Assumir uma vice-presidência do partido',fx:{pt:6,cp:3},r:'Você agora fala em nome do partido.'},
    {l:'Pedir mais verba para o seu grupo',fx:{$:10,pt:2},r:'O repasse foi aprovado.'},
    {l:'Pedir apoio para a próxima candidatura',fx:{pt:4,cp:2,apo:1},r:'A cúpula prometeu apoio.'}]}),
  ()=>{ const ts=three(Object.keys(ALLY_DEF).filter(t=>!S.allies.some(a=>a.t===t))); if(ts.length<3||S.allies.length>=maxAllies()) return oppFromActions('bastidores'); return {scene:'skyline',tag:'Aliados',t:'Gente importante quer se juntar a você',txt:'Três nomes de peso procuraram sua equipe querendo fazer parte do seu grupo. Só cabe um agora.',ch:ts.map(t=>({l:`Trazer um(a) ${genderize(ALLY_DEF[t].n,'m').toLowerCase()}`,fx:{cp:1},ally:{t,shady:false,loy:60},r:`Um novo aliado: ${genderize(ALLY_DEF[t].n,'m').toLowerCase()}.`}))}; },
  ()=>oppFromActions('bastidores'),
 ],
 gabinete:[
  ()=>{ if(OFF[S.office].type!=='exec') return null; const is=hotIssues().slice(0,3); const mv=Math.round((20+rnd()*60)*OFF[S.office].sc*(S.office==='pres'?40:1)); return {scene:HOUSE_SCENE[S.office],tag:'Orçamento',t:`Verba extra de R$ ${mv>=1000?num1(mv/1000)+' bilhões':fmt(mv)+' milhões'}`,txt:'Uma transferência inesperada caiu no caixa. Onde investir?',ch:is.map(i=>({l:`Investir em ${ISS[i].n.toLowerCase()}`,fx:Object.assign({['o:'+i]:8,f:2,apo:1,['h:'+i]:-10},Object.fromEntries(Object.entries(SEG).filter(([k,s])=>s.care[i]&&SEG_SIZE[jurKey()][k]).slice(0,2).map(([k])=>['s:'+k,3]))),r:`O dinheiro foi para ${ISS[i].n.toLowerCase()}.`}))}; },
  ()=>{ if(OFF[S.office].type!=='leg') return null; const B=three(BILLS[billLevel()]); return {scene:'congresso',tag:'Relatoria',t:'Você pode relatar um projeto',txt:'A presidência da Casa ofereceu a você a relatoria de um destes projetos.',ch:B.map(b=>({l:`Relatar: ${b.n}`,fx:Object.assign({cp:3,['o:'+b.iss]:4},Object.fromEntries(b.pro.slice(0,2).map(s=>['s:'+s,3]))),r:'Seu relatório foi aprovado.'}))}; },
  ()=>oppFromActions('gabinete'),
 ],
};
function buildTone(th,tone){
  const L=tone==='crise'?CRISE[th]:OPP[th];
  const opts=L.slice().sort(()=>rnd()-.5);
  for(const f of opts){ const ev=f(); if(ev){ ev.ch=ev.ch.slice(0,3).map(c=>Object.assign({},c,{fx:toneFx(c.fx,tone)})); return ev; } }
  return null;
}
function genDecisions(){
  const used={};
  const order=['crise','dilema','dilema','oport'].sort(()=>rnd()-.5);
  S.dec=THEMES.map((T,i)=>{ const tone=order[i];
    if(tone==='dilema') return Object.assign({th:T.k,tone,done:false,head:''},chooseDecision(T.k,used));
    const ev=buildTone(T.k,tone); if(!ev) return Object.assign({th:T.k,tone:'dilema',done:false,head:''},chooseDecision(T.k,used));
    ev.id='_t_'+tone+'_'+T.k; return {th:T.k,tone,kind:'built',ev,done:false,head:''}; });
}
function buildDecisionBase(d){ if(d.kind==='built') return d.ev; if(d.kind==='fixed') return EVENTS.find(e=>e.id===d.id); return GENS[d.g].build(d.prm); }
function buildDecision(d){
  const ev=buildDecisionBase(d); if(!ev) return ev;
  if(d.tone==='dilema'&&!d._fixed){ d._fixed=true; }
  if(d.tone==='dilema'){ const e2=Object.assign({},ev); let ch=ev.ch.slice(0,3); if(ch.length<3) ch=ch.concat([{l:'Adiar e esperar a poeira baixar',fx:{cp:-1,am:-1},r:'Você empurrou o problema para frente.'}]); e2.ch=ch; return e2; }
  return ev;
}

// ---------- SONS (Web Audio, sem arquivos) ----------
const SFX=(()=>{ let ctx=null, on=true; try{ on=localStorage.getItem('vossa-som')!=='0' }catch(e){}
  function ac(){ if(!on) return null; if(!ctx){ try{ ctx=new (window.AudioContext||window.webkitAudioContext)() }catch(e){ return null } } if(ctx.state==='suspended') ctx.resume(); return ctx; }
  function tone(f,d,o){ o=o||{}; const c=ac(); if(!c) return; const t=c.currentTime+(o.at||0), g=c.createGain(), osc=c.createOscillator(); osc.type=o.type||'sine'; osc.frequency.setValueAtTime(f,t); if(o.to) osc.frequency.exponentialRampToValueAtTime(o.to,t+d); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(o.v||0.12,t+0.012); g.gain.exponentialRampToValueAtTime(0.0001,t+d); osc.connect(g).connect(c.destination); osc.start(t); osc.stop(t+d+0.05); }
  function noise(d,o){ o=o||{}; const c=ac(); if(!c) return; const t=c.currentTime+(o.at||0), n=Math.floor(c.sampleRate*d), b=c.createBuffer(1,n,c.sampleRate), x=b.getChannelData(0); for(let i=0;i<n;i++) x[i]=(Math.random()*2-1)*(1-i/n); const s=c.createBufferSource(); s.buffer=b; const f=c.createBiquadFilter(); f.type=o.ft||'bandpass'; f.frequency.value=o.f||1200; const g=c.createGain(); g.gain.value=o.v||0.15; s.connect(f).connect(g).connect(c.destination); s.start(t); }
  return {
    get on(){return on}, toggle(){ on=!on; try{localStorage.setItem('vossa-som',on?'1':'0')}catch(e){} if(on) this.good(); return on; },
    click(){ tone(660,.05,{type:'triangle',v:.05}); },
    open(){ tone(392,.12,{type:'triangle',v:.07}); tone(523,.16,{type:'triangle',v:.07,at:.07}); },
    good(){ tone(523,.14,{type:'triangle',v:.1}); tone(659,.14,{type:'triangle',v:.1,at:.09}); tone(784,.22,{type:'triangle',v:.1,at:.18}); },
    bad(){ tone(220,.28,{type:'sawtooth',v:.05,to:150}); tone(164,.34,{type:'sine',v:.1,at:.06,to:110}); },
    alarm(){ tone(880,.14,{type:'square',v:.04}); tone(660,.14,{type:'square',v:.04,at:.16}); tone(880,.14,{type:'square',v:.04,at:.32}); },
    coin(){ tone(988,.07,{type:'square',v:.04}); tone(1319,.18,{type:'square',v:.04,at:.07}); },
    page(){ noise(.25,{f:2400,v:.12}); },
    whoosh(){ noise(.5,{f:600,v:.12,ft:'lowpass'}); tone(200,.45,{v:.04,to:600}); },
    tick(){ tone(1200+Math.random()*300,.025,{type:'square',v:.018}); },
    stamp(){ noise(.12,{f:300,v:.35,ft:'lowpass'}); tone(90,.2,{v:.2,to:50}); },
    win(){ [523,659,784,1047].forEach((f,i)=>tone(f,.3,{type:'triangle',v:.11,at:i*.12})); tone(1047,.7,{type:'sine',v:.08,at:.5}); noise(.8,{f:5000,v:.05,at:.45}); },
    lose(){ [392,349,311,262].forEach((f,i)=>tone(f,.38,{type:'triangle',v:.09,at:i*.2})); },
  };
})();

// ---------- AVATAR CUSTOMIZADO ----------
const HAIR_STYLES=[['short','Curto'],['side','Lateral'],['buzz','Raspado'],['bald','Calvo'],['curly','Cacheado'],['long','Longo'],['bob','Chanel'],['bun','Coque'],['pony','Rabo de cavalo']];
const HAIR_COLORS=['#15100C','#2B1D14','#45301F','#6A4A2C','#9C6E44','#C9A266','#9A9A9A','#D7D7D7'];
function randomLook(gen,seed){ const R=rng('look'+seed); const r=a=>a[Math.floor(R()*a.length)]; const fem=['long','bob','bun','curly','pony'], mas=['short','side','bald','buzz','curly'];
  return {skin:Math.floor(R()*SKIN.length),st:r(gen==='f'?fem:mas),hc:r(HAIR_COLORS.slice(0,6)),glasses:R()<.3,beard:gen==='m'&&R()<.3,tie:gen==='m'?R()<.6:false,ear:gen==='f'&&R()<.6}; }
