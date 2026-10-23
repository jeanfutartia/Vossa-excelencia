// ================= MUNDO, ELEITORADO, DECISÕES E JORNAL =================
const ISS={
 seguranca:{n:'Segurança',ev:['Uma onda de assaltos {L} domina as conversas','Um tiroteio perto de uma escola {L} assusta os moradores','Roubos de celular batem recorde {L}'],
  st:[{l:'Defender mais polícia na rua e penas duras',fx:{am:2,apo:1,'o:seguranca':8,'s:evang':3,'s:media':2,'s:jovens':-2}},
      {l:'Propor prevenção: iluminação, escola integral e emprego',fx:{am:1,apo:2,'o:seguranca':6,'s:jovens':3,'s:serv':2,'s:evang':-1}},
      {l:'Evitar o tema',fx:{'o:seguranca':-6,'s:media':-2}}]},
 saude:{n:'Saúde',ev:['A fila por cirurgias {L} chegou a {num} mil pessoas','Falta remédio nos postos de saúde {L}','Pronto-socorro lotado {L}: pacientes esperam no corredor'],
  st:[{l:'Cobrar mutirão de cirurgias e mais médicos',fx:{apo:3,'o:saude':8,'s:idosos':4,'s:per':2}},
      {l:'Defender parceria com hospitais privados',fx:{aa:2,am:1,'o:saude':5,'s:elite':3,'s:serv':-3}},
      {l:'Visitar o posto e filmar a situação',fx:{am:2,'o:saude':4,'s:idosos':2}}]},
 educacao:{n:'Educação',ev:['Avaliação nacional coloca as escolas {L} entre as piores','Escolas {L} estão sem professor de matemática há meses','Evasão escolar dispara {L}'],
  st:[{l:'Defender escola em tempo integral',fx:{am:2,'o:educacao':8,'s:serv':3,'s:jovens':2}},
      {l:'Defender escolas cívico-militares',fx:{am:1,'o:educacao':5,'s:evang':3,'s:media':2,'s:serv':-4,'s:jovens':-3}},
      {l:'Propor bolsa e internet para os alunos',fx:{apo:1,'o:educacao':6,'s:jovens':4}}]},
 transporte:{n:'Transporte',ev:['Ônibus lotados e atrasados revoltam passageiros {L}','A tarifa de ônibus vai subir {L}','Engarrafamentos {L} batem recorde'],
  st:[{l:'Defender tarifa zero',fx:{apo:3,'o:transporte':8,'s:per':4,'s:jovens':3,'s:elite':-3}},
      {l:'Defender metrô e corredores de ônibus',fx:{am:2,'o:transporte':6,'s:media':2}},
      {l:'Defender concessão e aplicativos',fx:{aa:2,'o:transporte':4,'s:elite':2,'s:per':-2}}]},
 emprego:{n:'Emprego',ev:['Fechamento de fábrica deixa {num} mil desempregados {L}','Desemprego entre jovens bate recorde {L}','Filas de emprego dão volta no quarteirão {L}'],
  st:[{l:'Defender frentes de trabalho públicas',fx:{apo:3,'o:emprego':7,'s:per':3}},
      {l:'Defender incentivos para empresas contratarem',fx:{aa:3,'o:emprego':6,'s:elite':3}},
      {l:'Propor cursos técnicos para jovens',fx:{am:1,'o:emprego':6,'s:jovens':4}}]},
 custo:{n:'Custo de vida',ev:['O preço da comida dispara {L}','A conta de luz sobe {num}% e revolta moradores {L}','O gás de cozinha fica mais caro {L}'],
  st:[{l:'Defender auxílio e controle de preços',fx:{apo:3,'o:custo':7,'s:per':3,'s:idosos':2,'s:elite':-3}},
      {l:'Defender corte de impostos sobre alimentos',fx:{am:2,aa:1,'o:custo':6,'s:media':3}},
      {l:'Culpar o governo de cima',fx:{am:1,ip:-1,'o:custo':2}}]},
 corrupcao:{n:'Corrupção',ev:['Operação policial revela desvio na merenda {L}','Escândalo de contratos superfaturados {L}','Servidores fantasmas são descobertos {L}'],
  st:[{l:'Cobrar CPI e transparência total',fx:{aa:2,am:3,et:2,ip:-2,'o:corrupcao':8,'s:media':3}},
      {l:'Defender a presunção de inocência',fx:{ip:2,'o:corrupcao':-4,'s:media':-2}},
      {l:'Propor uma lei anticorrupção',fx:{et:2,'o:corrupcao':6,'s:media':2,'s:elite':1}}]},
 ambiente:{n:'Meio ambiente',ev:['O rio amanhece cheio de peixes mortos {L}','Desmatamento perto de nós bate recorde {L}','Lixão a céu aberto ameaça mananciais {L}'],
  st:[{l:'Multar e fiscalizar as empresas',fx:{aa:1,'o:ambiente':8,'s:jovens':4,'s:agro':-4}},
      {l:'Conciliar produção e preservação',fx:{'o:ambiente':4,'s:agro':2,'s:jovens':1}},
      {l:'Dizer que é exagero',fx:{aa:-1,'o:ambiente':-6,'s:agro':3,'s:jovens':-4}}]},
 costumes:{n:'Costumes',ev:['A polêmica sobre um livro na escola divide os moradores {L}','Projeto sobre linguagem neutra incendeia o debate {L}','Festa LGBT na praça central gera protestos {L}'],
  st:[{l:'Defender a família tradicional',fx:{'o:costumes':6,'s:evang':5,'s:idosos':2,'s:jovens':-4,'s:serv':-2}},
      {l:'Defender liberdade e respeito',fx:{'o:costumes':5,'s:jovens':4,'s:serv':2,'s:evang':-5}},
      {l:'Dizer que há prioridades maiores',fx:{'o:costumes':1,'s:media':1}}]},
 impostos:{n:'Impostos',ev:['Aumento de imposto revolta contribuintes {L}','Empresários ameaçam deixar a região por causa dos tributos {L}','A guerra fiscal com os vizinhos esquenta {L}'],
  st:[{l:'Defender corte de impostos',fx:{aa:3,'o:impostos':7,'s:elite':4,'s:media':2,f:-2}},
      {l:'Defender cobrar mais de quem ganha mais',fx:{apo:2,'o:impostos':6,'s:per':3,'s:elite':-5}},
      {l:'Propor simplificar a cobrança',fx:{aa:1,am:1,'o:impostos':5}}]},
 moradia:{n:'Moradia',ev:['Despejo de {num} famílias vira caso nacional {L}','O aluguel sobe {num}% em um ano {L}','Ocupações se multiplicam {L}'],
  st:[{l:'Defender habitação popular',fx:{apo:4,'o:moradia':8,'s:per':4}},
      {l:'Propor regularizar terrenos e cortar burocracia',fx:{aa:1,am:1,'o:moradia':5,'s:elite':2}},
      {l:'Apoiar a reintegração de posse',fx:{aa:2,'o:moradia':-2,'s:elite':2,'s:per':-5}}]},
};
const ISS_KEYS=Object.keys(ISS);
const SEG={
 per:{n:'Periferia urbana',mix:[0,.25,.75],care:{seguranca:.3,transporte:.2,custo:.3,emprego:.2}},
 media:{n:'Classe média',mix:[.15,.75,.1],care:{seguranca:.25,impostos:.2,corrupcao:.25,saude:.15,educacao:.15}},
 elite:{n:'Empresários e elite',mix:[.85,.15,0],care:{impostos:.4,emprego:.3,seguranca:.2,corrupcao:.1}},
 serv:{n:'Servidores e professores',mix:[.1,.7,.2],care:{educacao:.35,saude:.25,custo:.2,corrupcao:.2}},
 evang:{n:'Evangélicos',mix:[.05,.35,.6],care:{costumes:.45,seguranca:.25,custo:.15,emprego:.15}},
 jovens:{n:'Jovens',mix:[.15,.45,.4],care:{emprego:.3,educacao:.2,ambiente:.2,transporte:.15,moradia:.15}},
 idosos:{n:'Aposentados',mix:[.2,.4,.4],care:{saude:.45,custo:.3,seguranca:.25}},
 agro:{n:'Agro e interior',mix:[.3,.3,.4],care:{impostos:.25,seguranca:.2,emprego:.2,costumes:.2,transporte:.15}},
};
const SEG_SIZE={
 sertao:{per:.12,media:.1,elite:.04,serv:.1,evang:.18,jovens:.14,idosos:.12,agro:.2},
 colinas:{per:.22,media:.18,elite:.05,serv:.12,evang:.14,jovens:.14,idosos:.1,agro:.05},
 guanabara:{per:.24,media:.22,elite:.07,serv:.1,evang:.13,jovens:.14,idosos:.08,agro:.02},
 estado:{per:.18,media:.16,elite:.05,serv:.11,evang:.15,jovens:.14,idosos:.1,agro:.11},
 brasil:{per:.19,media:.16,elite:.04,serv:.1,evang:.16,jovens:.14,idosos:.11,agro:.1},
};
const HEAT_BASE={
 sertao:{saude:58,emprego:60,custo:55,seguranca:38,transporte:28,costumes:52,ambiente:42,impostos:35,moradia:30,educacao:46,corrupcao:44},
 colinas:{emprego:58,seguranca:52,transporte:50,custo:50,saude:48,educacao:44,corrupcao:42,ambiente:40,impostos:44,moradia:42,costumes:38},
 guanabara:{seguranca:70,transporte:62,moradia:56,custo:52,saude:50,corrupcao:48,educacao:44,ambiente:40,costumes:44,impostos:42,emprego:48},
 estado:{seguranca:56,saude:52,emprego:52,custo:50,corrupcao:46,educacao:46,transporte:44,impostos:44,ambiente:40,moradia:40,costumes:42},
 brasil:{custo:58,seguranca:56,emprego:54,saude:52,corrupcao:52,impostos:46,educacao:46,ambiente:44,costumes:46,moradia:40,transporte:36},
};
const SHOCKS=[
 {n:'Crise financeira internacional derruba as bolsas no mundo todo',pib:-1.2,infl:.4,heat:{emprego:15}},
 {n:'Seca histórica encarece os alimentos em todo o país',infl:.8,heat:{custo:15,ambiente:10}},
 {n:'Boom das commodities enche o caixa do país',pib:1,heat:{emprego:-10}},
 {n:'Surto de dengue lota hospitais em vários estados',heat:{saude:20}},
 {n:'Onda de violência de facções atinge várias capitais',heat:{seguranca:20}},
 {n:'Escândalo de corrupção em estatal domina o noticiário',heat:{corrupcao:20}},
 {n:'Enchentes deixam milhares de desabrigados no Sul',heat:{moradia:15,ambiente:10}},
 {n:'Greve nacional de professores fecha escolas',heat:{educacao:18}},
 {n:'Gasolina sobe 12% em um mês e caminhoneiros ameaçam parar',infl:.5,heat:{custo:15,transporte:12}},
 {n:'Polêmica nacional sobre costumes toma conta das redes',heat:{costumes:20}},
];
const INST=['Instituto Vértice','Pulso Pesquisas','Opinião & Dados','Instituto Mirante'];
const VEIC=['a Rádio Cidade','a TV Regional','o Jornal do Estado','o podcast Papo de Bar','o canal Política Sem Filtro','a revista Panorama','o telejornal da noite'];
const BILLS={
 mun:[{n:'lei que proíbe fogos de artifício com estampido',iss:'ambiente',pro:['idosos','media'],con:['jovens']},{n:'regulamentação dos mototaxistas',iss:'transporte',pro:['per','jovens'],con:['media']},{n:'isenção de IPTU para templos religiosos',iss:'costumes',pro:['evang'],con:['serv','media']},{n:'câmeras de reconhecimento facial no centro',iss:'seguranca',pro:['media','idosos','elite'],con:['jovens']},{n:'hortas comunitárias em terrenos públicos',iss:'ambiente',pro:['per','jovens'],con:[]},{n:'reajuste dos professores municipais',iss:'educacao',pro:['serv','jovens'],con:['elite']},{n:'fim da taxa do lixo',iss:'impostos',pro:['per','media'],con:['serv']},{n:'Lei do Silêncio para bares e festas',iss:'costumes',pro:['idosos','evang'],con:['jovens']},{n:'concessão do estacionamento rotativo',iss:'transporte',pro:['elite'],con:['media','per']},{n:'programa de aluguel social',iss:'moradia',pro:['per'],con:['elite']}],
 est:[{n:'privatização da companhia de saneamento',iss:'impostos',pro:['elite','media'],con:['serv','per']},{n:'reajuste salarial da Polícia Militar',iss:'seguranca',pro:['media','idosos'],con:['elite']},{n:'cotas na universidade estadual',iss:'educacao',pro:['jovens','per'],con:['media']},{n:'redução do ICMS sobre o diesel',iss:'custo',pro:['agro','elite'],con:['serv']},{n:'escolas cívico-militares no estado',iss:'educacao',pro:['evang','media'],con:['serv','jovens']},{n:'novo código ambiental estadual',iss:'ambiente',pro:['jovens'],con:['agro']},{n:'passe livre intermunicipal para estudantes',iss:'transporte',pro:['jovens','per'],con:['elite']},{n:'programa estadual de casas populares',iss:'moradia',pro:['per'],con:[]}],
 fed:[{n:'fim da escala de trabalho 6x1',iss:'emprego',pro:['per','jovens','serv'],con:['elite','agro']},{n:'redução da maioridade penal',iss:'seguranca',pro:['evang','media','idosos'],con:['jovens','serv']},{n:'taxação de grandes fortunas',iss:'impostos',pro:['per','serv'],con:['elite','agro']},{n:'marco legal da inteligência artificial',iss:'emprego',pro:['media','elite'],con:[]},{n:'reforma administrativa',iss:'impostos',pro:['elite','media'],con:['serv']},{n:'novo licenciamento ambiental',iss:'ambiente',pro:['agro','elite'],con:['jovens']},{n:'PEC da segurança pública',iss:'seguranca',pro:['media','idosos'],con:[]},{n:'regras mais duras para as casas de apostas',iss:'costumes',pro:['evang','idosos','serv'],con:['jovens']},{n:'isenção de imposto de renda até R$ 5 mil',iss:'impostos',pro:['per','media','serv'],con:['elite']},{n:'porte de armas na zona rural',iss:'seguranca',pro:['agro','evang'],con:['serv','jovens','media']},{n:'plano nacional de habitação popular',iss:'moradia',pro:['per','jovens'],con:[]}],
};
const THEMES=[{k:'ruas',n:'Ruas',d:'Eleitorado e pautas',ic:'base'},{k:'imprensa',n:'Imprensa',d:'Mídia e opinião',ic:'midia'},{k:'bastidores',n:'Bastidores',d:'Partido, aliados e dinheiro',ic:'partido'},{k:'gabinete',n:'Gabinete',d:'Mandato e governo',ic:'exec'}];
const THEME_MAP={};
'enchente greve_prof ocupacao pulpito apagao queimada familiar_doente torcida jogo_bicho onibus uber padroeira castracao dengue garis tarifa merenda festa fabrica_fecha creches enchente_est caminhoneiros amazonia ong'.split(' ').forEach(k=>THEME_MAP[k]='ruas');
'audio fakenews sonho reality hacker reporter meme podcast_ext deepfake premio comentarista vazou_volta nepotismo_ex rachadinha_ex cota motorista bets foto_suspeita'.split(' ').forEach(k=>THEME_MAP[k]='imprensa');
'empresario arlindo_cobra op_sacola emprego morte_lider escandalo_partido celebridade coronel assessor_rival op_colega delegado delegado_cai lobista_cobra tse_contas pix_tcu licitacao_pf aije desistir irmao forum convite_sec burnout'.split(' ').forEach(k=>THEME_MAP[k]='bastidores');
const RES_INFO={
 ap:['Aprovação','Média ponderada do quanto cada grupo do eleitorado gosta de você. É o principal motor do voto e o escudo das ruas contra impeachment e cassação.','Sobe com presença na base, decisões alinhadas às pautas quentes e bons resultados de governo. Cai sozinha com o tempo e com economia ruim se você governa.'],
 cp:['Capital político','Seu peso dentro da política: respeito dos colegas, cargos-chave e capacidade de pautar.','Sobe com mandatos, relatorias, comissões e vitórias. Ajuda a ganhar eleições e libera ações como presidir a Casa.'],
 ip:['Articulação','Quantos votos fiéis você tem no plenário. No Executivo segue o tamanho da sua base aliada.','Sobe com acordos, emendas e cargos para aliados. É o escudo do plenário contra cassação e impeachment.'],
 et:['Ética','Sua reputação de honestidade.','Abaixo de 55 gera rejeição nas urnas. Ações ilegais derrubam; transparência recupera.'],
 rj:['Risco judicial','Inquéritos e provas acumulados contra você.','Acima de 55 pode abrir processo de cassação ou impeachment. Sem mandato, com 85+ e ética baixa, a Polícia Federal prende.'],
 pt:['Partido','Sua relação com a direção da legenda.','Abaixo de 30 o partido nega candidatura majoritária; abaixo de 8 você é expulso. Sobe obedecendo a cúpula.'],
 f:['Saúde fiscal','Contas do seu governo (só no Executivo).','Abaixo de 25 os salários atrasam e a aprovação despenca. Programas e obras gastam; cortes e impostos recuperam.'],
 money:['Caixa político','Dinheiro para campanhas, equipe e ações, em R$ mil.','Entra com salário, doações e fundo partidário. Os custos crescem com o tamanho do cargo.'],
};

function jurOf(k){return (k==='ver'||k==='pref'||k==='none')?S.city:(k==='pres'?'brasil':'estado')}
function jurKey(){return jurOf(S.campaign?S.campaign.off:S.office)}
function jurName(){const j=jurKey(); return j==='brasil'?'no país':j==='estado'?'no Estado de '+CITIES[S.city].uf:'em '+CITIES[S.city].n}
function issueTerm(sk){const c=SEG[sk].care, w=S.world; let t=0; for(const i in c) t+=c[i]*((w.own[i]-50)*0.35)*(0.5+w.heat[i]/100); return t}
function segAP(sk){return clamp((S.seg[sk]??30)+issueTerm(sk),0,100)}
function classAP(i){const sz=SEG_SIZE[jurKey()];let t=0,w=0;for(const k in sz){const x=sz[k]*SEG[k].mix[i];t+=x*segAP(k);w+=x}return w?t/w:30}
function AP(){if(!S.world) return 30; const sz=SEG_SIZE[jurKey()];let t=0;for(const k in sz)t+=sz[k]*segAP(k);return t}
function topCare(sk){return Object.entries(SEG[sk].care).sort((a,b)=>b[1]*S.world.heat[b[0]]-a[1]*S.world.heat[a[0]])[0][0]}
function hotIssues(){return ISS_KEYS.slice().sort((a,b)=>S.world.heat[b]-S.world.heat[a])}
function pickIssue(){const hs=hotIssues().slice(0,5); const ws=hs.map(i=>S.world.heat[i]); let r=rnd()*ws.reduce((a,b)=>a+b,0); for(let i=0;i<hs.length;i++){r-=ws[i]; if(r<=0) return hs[i]} return hs[0]}

// ---------- mundo ----------
function initWorld(){
  const b=HEAT_BASE[S.city], heat={}, own={}; ISS_KEYS.forEach(k=>{heat[k]=clamp((b[k]??12)+randn()*6,5,100); own[k]=50});
  S.world={eco:{infl:4.6,desemp:8.2,pib:2.1,selic:11.5,dolar:5.4},ecoPrev:null,heat,own,shock:null};
  S.seg={}; for(const k in SEG) S.seg[k]=30; S.polls=[]; S.papers=[]; S.qNews=[]; S.lastGen={};
}
function worldStep(){
  const w=S.world, e=w.eco; w.ecoPrev=Object.assign({},e);
  const sh=rnd()<.16?pick(SHOCKS):null; w.shock=sh?sh.n:null; const pu=w.push||{pib:0,infl:0};
  e.infl=clamp(e.infl+(4.5-e.infl)*0.15+randn()*0.35+(sh&&sh.infl||0)+pu.infl*0.6,0.5,25);
  e.pib=clamp(e.pib+(2-e.pib)*0.25+randn()*0.55+(sh&&sh.pib||0)+pu.pib*0.6,-8,9);
  w.push={pib:pu.pib*0.4,infl:pu.infl*0.4};
  e.desemp=clamp(e.desemp+(8-e.desemp)*0.08-(e.pib-2)*0.12+randn()*0.25,3,20);
  e.selic=clamp(e.selic+((e.infl*1.5+4.5)-e.selic)*0.3,2,30);
  e.dolar=clamp(e.dolar*(1+randn()*0.03+(e.infl-4.5)*0.004),3,12);
  const base=HEAT_BASE[jurKey()];
  ISS_KEYS.forEach(i=>{ w.heat[i]=clamp(w.heat[i]+((base[i]??12)+govPressure(i)-w.heat[i])*0.12+randn()*5+((sh&&sh.heat&&sh.heat[i])||0),5,100); w.own[i]+=(50-w.own[i])*0.03; });
  w.heat.emprego=clamp(w.heat.emprego+(e.desemp-8)*1.5,5,100); w.heat.custo=clamp(w.heat.custo+(e.infl-4.5)*2,5,100);
  const lvl={pres:1,gov:.5,pref:.3}[S.office];
  if(lvl){ const d=(-(e.desemp-8)*0.25-(e.infl-4.5)*0.3+(e.pib-2)*0.2)*lvl; for(const k in S.seg) S.seg[k]=clamp(S.seg[k]+d*(k==='elite'?0.6:k==='per'?1.3:1),0,100); }
}

// ---------- pesquisas ----------
function nextElec(){let y=S.year; while(!(elecType(y)&&(y>S.year||S.q<=2))) y++; return y}
function targetOffice(y){
  const t=elecType(y), el=ORDER.filter(k=>OFF[k].el===t&&eligible(k,y).ok);
  if(!el.length) return ORDER.find(k=>OFF[k].el===t);
  if(el.includes(S.office)&&OFF[S.office].type==='exec') return S.office;
  const up=el.filter(k=>OFF[k].lvl>OFF[S.office].lvl);
  return up[0]||(el.includes(S.office)?S.office:el[el.length-1]);
}
function ensurePre(){
  const y=nextElec(), off=targetOffice(y);
  if(S.pre&&S.pre.y===y&&S.pre.off===off) return;
  S.pre={y,off,field:genField(off)};
}
function publishPoll(){
  if(inCampaign()) return; ensurePre();
  const ap=AP(), k=S.pre.off, p={y:S.year,q:S.q,inst:pick(INST),ap:clamp(ap+randn()*1.5,0,100),seg:{},off:k,ey:S.pre.y};
  for(const s in SEG_SIZE[jurKey()]) p.seg[s]=segAP(s);
  if(S.office!=='none'){ const b=clamp(ap*0.8+randn()*2,2,90), r=clamp((100-ap)*0.55+randn()*2,2,90); p.aval={bom:b,ruim:r,reg:Math.max(0,100-b-r)}; }
  const cc={camp:25,spend:15,effort:regionsFor(k).map(()=>3)};
  if(sys(k)==='prop'){ const r=propResult(k,S.pre.field,cc,false); p.scen={prop:true,votes:r.votes*(1+randn()*.06),cut:r.cut}; }
  else { const r=fieldShares(k,S.pre.field,cc,false); p.scen={s:r.alive.map((c,i)=>({id:c.id,name:c.name,party:c.party,isMe:!!c.isMe,seed:c.seed,gen:c.gen,v:clamp(r.tot[i]+randn()*.015,.005,.95)})).sort((a,b)=>b.v-a.v)}; }
  S.polls.push(p); if(S.polls.length>48) S.polls.shift();
}

// ---------- decisões ----------
function L(t){return String(t).replace('{L}',jurName()).replace('{num}',String(Math.round(4+rnd()*26)))}
function segFx(pro,con,v){const o={};(pro||[]).forEach(s=>o['s:'+s]=v);(con||[]).forEach(s=>o['s:'+s]=-v);return o}
function billLevel(){const o=S.office; return (o==='ver'||o==='pref')?'mun':(o==='dest'||o==='gov')?'est':'fed'}
const GENS={
 pauta:{th:'ruas',w:2.2,ok:()=>true,prm:()=>({i:pickIssue(),v:Math.floor(rnd()*3)}),build:p=>{const I=ISS[p.i]; return {id:'_g_pauta',scene:SCENE_ISS[p.i],tag:'Pauta em alta · '+I.n,t:L(I.ev[p.v]),txt:`A pauta ${I.n.toLowerCase()} está entre as mais quentes ${jurName()}. Todos querem saber de que lado você está.`,ch:I.st.map((s,j)=>({l:s.l,fx:Object.assign({},s.fx,j<2?{['h:'+p.i]:-8}:{}),r:/^(Evitar|Dizer que)/.test(s.l)?'Sua esquiva foi notada por quem se importa com o tema.':'Sua posição repercutiu entre os grupos que acompanham o tema.'}))}}},
 protesto:{th:'ruas',w:1,ok:()=>true,prm:()=>{const sz=SEG_SIZE[jurKey()];const ks=Object.keys(sz);return {s:pick(ks)}},build:p=>{const sg=SEG[p.s], i=topCare(p.s); return {id:'_g_protesto',scene:'protesto',tag:'Protesto · '+sg.n,t:`${sg.n} vão às ruas`,txt:`Lideranças de ${sg.n.toLowerCase()} fazem ato ${jurName()} cobrando respostas sobre ${ISS[i].n.toLowerCase()}. Querem ser recebidas por você.`,ch:[
   {l:'Receber as lideranças e assumir compromissos',fx:{['s:'+p.s]:5,['o:'+i]:4,cp:1},r:'As lideranças saíram satisfeitas e com fotos ao seu lado.'},
   {l:'Mandar um assessor anotar as demandas',fx:{['s:'+p.s]:1},r:'Ninguém ficou bravo. Ninguém ficou feliz.'},
   {l:'Criticar o ato como político',fx:{['s:'+p.s]:-6,'s:elite':2,am:-1},r:'O grupo prometeu lembrar disso na eleição.'}]}}},
 convite:{th:'ruas',w:1,ok:()=>true,prm:()=>({s:pick(Object.keys(SEG_SIZE[jurKey()])),c:Math.floor(rnd()*3)}),build:p=>{const sg=SEG[p.s]; const lugar=['almoço de domingo','festa da comunidade','reunião da associação'][p.c]; return {id:'_g_convite',scene:{evang:'igreja',agro:'campo',idosos:'hospital',jovens:'comicio',serv:'protesto',elite:'skyline',per:'comicio',media:'skyline'}[p.s],tag:'Agenda · '+sg.n,t:`Convite de ${sg.n.toLowerCase()}`,txt:`Você foi convidado para o ${lugar} de um grupo de ${sg.n.toLowerCase()}. É um bom público, mas sua agenda está apertada.`,ch:[
   {l:'Ir pessoalmente e ficar até o fim',fx:{['s:'+p.s]:4,$:-2},r:'Você foi recebido com carinho.'},
   {l:'Passar rápido e fazer uma foto',fx:{['s:'+p.s]:1,cp:1},r:'A foto rendeu, a pressa foi notada.'},
   {l:'Recusar o convite',fx:{['s:'+p.s]:-2},r:'O grupo convidou outro político.'}]}}},
 entrevista:{th:'imprensa',w:1.6,ok:()=>true,prm:()=>({i:pickIssue(),v:pick(VEIC)}),build:p=>{const I=ISS[p.i]; return {id:'_g_entrevista',scene:'imprensa',tag:'Entrevista',t:`Entrevista para ${p.v}`,txt:`Você deu entrevista para ${p.v}. A pergunta que todos esperavam veio: qual é sua posição sobre ${I.n.toLowerCase()}?`,ch:[
   {l:'Responder: '+I.st[0].l.toLowerCase(),fx:Object.assign(scaleFx(I.st[0].fx,0.7),{am:1}),r:'A resposta virou manchete.'},
   {l:'Responder: '+I.st[1].l.toLowerCase(),fx:Object.assign(scaleFx(I.st[1].fx,0.7),{am:1}),r:'A resposta virou manchete.'},
   {l:'Desviar e mudar de assunto',fx:{['o:'+p.i]:-3,aa:-1},r:'O entrevistador insistiu três vezes. O corte circulou.'},
   {l:'Atacar o entrevistador',fx:{am:2,aa:-3,et:-1},r:'Seus apoiadores adoraram. Os jornalistas, não.'}]}}},
 pesquisa_div:{th:'imprensa',w:1,ok:()=>S.polls.length>=2,prm:()=>({}),build:()=>{const a=S.polls[S.polls.length-1],b=S.polls[S.polls.length-2],up=a.ap>=b.ap; return {id:'_g_pesq',scene:'urna',tag:'Pesquisa · '+a.inst,t:`Sua aprovação ${up?'sobe':'cai'} para ${Math.round(a.ap)}%`,txt:`O ${a.inst} divulgou nova pesquisa: aprovação de ${Math.round(a.ap)}%, ${up?'acima':'abaixo'} dos ${Math.round(b.ap)}% anteriores. A imprensa quer sua reação.`,ch:up?[
   {l:'Comemorar nas redes',fx:{am:2,cp:1,pt:-1},r:'A comemoração animou a militância e irritou os rivais.'},
   {l:'Agradecer com humildade',fx:{et:1,aa:1},r:'A postura agradou.'},
   {l:'Dizer que pesquisa não ganha eleição',fx:{pt:1},r:'Frase segura, nenhum risco.'}]:[
   {l:'Anunciar mudança de rota',fx:{ap:2,cp:-1},r:'A promessa de mudança foi bem recebida.'},
   {l:'Dizer que pesquisa não ganha eleição',fx:{am:-1},r:'A frase soou como negação.'},
   {l:'Atacar o instituto',fx:{am:1,aa:-3,et:-1},r:'O instituto respondeu com a metodologia completa.'}]}}},
 viral:{th:'imprensa',w:1,ok:()=>true,prm:()=>({good:rnd()<S.stats.et/100}),build:p=>p.good?{id:'_g_viral',scene:'imprensa',tag:'Redes sociais',t:'Seu vídeo viraliza',txt:'Um vídeo seu ajudando uma senhora a carregar compras na chuva passou de dois milhões de visualizações.',ch:[
   {l:'Compartilhar e agradecer',fx:{am:3,apo:2},r:'A onda de simpatia durou dias.'},
   {l:'Transformar em campanha de doações',fx:{apo:3,et:1,$:-2},r:'A campanha arrecadou cestas básicas para o bairro.'},
   {l:'Não falar do assunto',fx:{et:1},r:'A discrição também foi elogiada.'}]}:{id:'_g_viral2',scene:'imprensa',tag:'Redes sociais',t:'Flagrado de cabeça quente',txt:'Um vídeo mostra você discutindo de forma ríspida com um eleitor numa padaria. Já são milhões de visualizações.',ch:[
   {l:'Pedir desculpas ao eleitor publicamente',fx:{et:2,am:-1},r:'As desculpas encerraram o caso.'},
   {l:'Dizer que o vídeo foi editado',fx:{am:-2,et:-2},r:'O vídeo completo apareceu no dia seguinte.'},
   {l:'Convidar o eleitor para um café com câmeras',p:.6,fx:{am:3},r:'O café virou o vídeo mais simpático da semana.',fail:{fx:{am:-3},r:'O eleitor recusou e postou a recusa.'}}]}},
 rival_midia:{th:'imprensa',w:1,ok:()=>!!S.nemesis,prm:()=>({a:Math.floor(rnd()*ACUSA.length)}),build:p=>({id:'_g_rivalm',scene:'tv',who:S.nemesis,tag:'Imprensa · '+S.nemesis.name,t:`${S.nemesis.name} ataca você`,txt:`Em entrevista, ${S.nemesis.name} disse que você ${genderize(ACUSA[p.a])}. A frase está em todos os portais.`,ch:[
   {l:'Responder com dados',fx:{aa:2,am:1},r:'A resposta técnica convenceu quem leu.'},
   {l:'Contra-atacar no mesmo tom',grudge:1,fx:{am:2,et:-1},fn:()=>{S.nemesis.elo=(S.nemesis.elo||0)-0.5},r:'A troca de farpas esquentou o clima político.'},
   {l:'Processar por difamação',grudge:1,fx:{$:-5,aa:-1},fn:()=>{S.nemesis.elo=(S.nemesis.elo||0)-0.5},r:'O processo deve levar anos.'},
   {l:'Ignorar',fx:{am:-2},r:'Muita gente acreditou no ataque.'}]})},
 colunista:{th:'imprensa',w:.8,ok:()=>true,prm:()=>({good:AP()>45||S.stats.et>65}),build:p=>({id:'_g_coluna',scene:'imprensa',tag:'Opinião',t:p.good?'Coluna elogia você':'Coluna dura contra você',txt:p.good?'A colunista mais lida do estado escreveu que você é “a revelação da política local”.':'A colunista mais lida do estado escreveu que você é “promessa que virou rotina”.',ch:p.good?[
   {l:'Agradecer publicamente',fx:{aa:2,cp:1},r:'O elogio rodou entre os formadores de opinião.'},
   {l:'Convidar para um café reservado',fx:{aa:1,ip:1},r:'Uma fonte a mais nos bastidores.'}]:[
   {l:'Enviar uma resposta com números',fx:{aa:2},r:'O jornal publicou sua resposta.'},
   {l:'Ligar para o dono do jornal',fx:{rj:1,aa:-2,et:-1},r:'A ligação virou nota na própria coluna.'},
   {l:'Ignorar',fx:{aa:-1},r:'A coluna foi lida e esquecida.'}]})},
 aliado_pede:{th:'bastidores',w:1.5,ok:()=>S.allies.length>0,prm:()=>({a:pick(S.allies).id}),build:p=>{const a=S.allies.find(x=>x.id===p.a)||S.allies[0]; const d=ALLY_DEF[a.t]; const ped={cacique:['que você apoie o sobrinho dele para a presidência do diretório',{pt:5,et:-1}],prefeito:['uma emenda para asfaltar a rua da casa dele',{ip:2,et:-2,apo:1}],empresario:['uma reunião com o secretário para destravar uma licença',{$:8,rj:3}],religioso:['apoio a um projeto de isenção para igrejas',{'s:evang':4,'s:serv':-2}],sindicalista:['que você suba no carro de som da greve',{'s:serv':4,'s:elite':-3,am:1}],jornalista:['uma entrevista exclusiva antes de todo mundo',{aa:2,am:-1}],parlamentar:['seu voto num projeto do interesse dele',{ip:3,pt:1,et:-1}],advogado:['que você pague uma dívida antiga de honorários',{$:-8}],influencer:['patrocínio para uma série de vídeos',{$:-6,am:3}]}[a.t];
   return {id:'_g_aliado',scene:'skyline',who:a,tag:'Aliados · '+genderize(d.n,a.gen),t:`${a.name} pede um favor`,txt:`${a.name} pede ${ped[0]}. A lealdade dele está em ${Math.round(a.loy)}.`,ch:[
    {l:'Atender o pedido',fx:ped[1],fn:()=>{a.loy=clamp(a.loy+15,0,100)},r:`${a.name} ficou muito agradecido.`},
    {l:'Negociar uma parte',fx:scaleFx(ped[1],0.4),fn:()=>{a.loy=clamp(a.loy+5,0,100)},r:'Vocês chegaram a um meio-termo.'},
    {l:'Recusar',fx:{et:1},fn:()=>{a.loy=clamp(a.loy-15,0,100)},r:`${a.name} saiu da conversa calado.`}]}}},
 doador:{th:'bastidores',w:1,ok:()=>true,prm:()=>({s:pick(['um empresário do transporte','uma construtora','um grande produtor rural','uma rede de farmácias','um banqueiro'])}),build:p=>({id:'_g_doador',scene:'dinheiro',tag:'Financiamento',t:'Uma oferta de dinheiro',txt:`Representantes de ${p.s} querem “ajudar” no seu projeto político. Podem doar dentro da lei ou por fora.`,ch:[
   {l:'Aceitar só a doação declarada',fx:{$:10,'s:elite':1},r:'Tudo com recibo.'},
   {l:'Aceitar por fora',fx:{$:30,rj:8,et:-6},set:'caixa2',r:'O dinheiro chegou em espécie.'},
   {l:'Recusar',fx:{et:2,'s:media':1},r:'Eles foram procurar outro político.'}]})},
 partido_cobra:{th:'bastidores',w:1.2,ok:()=>true,prm:()=>({v:Math.floor(rnd()*4)}),build:p=>{const P=PARTIES[S.party]; const ped=['apoie o candidato da cúpula ao comando do diretório','abra mão de espaço para um aliado do cacique','contribua com o fundo do partido','não critique o governo aliado do partido'][p.v]; return {id:'_g_partido',scene:'skyline',tag:'Partido · '+P.sig,t:`A direção do ${P.sig} cobra fidelidade`,txt:`A direção do ${P.sig} quer que você ${ped}. Sua relação com o partido está em ${Math.round(S.stats.pt)}.`,ch:[
   {l:'Obedecer',fx:Object.assign({pt:6},p.v===2?{$:-8}:p.v===1?{cp:-2}:p.v===3?{am:-1}:{}),r:'A cúpula anotou sua lealdade.'},
   {l:'Negociar contrapartidas',fx:{pt:2,cp:1},r:'Você cedeu em parte e ganhou algo em troca.'},
   {l:'Desafiar a cúpula',fx:{pt:-8,cp:3,aa:1},r:'Você virou o nome da dissidência interna.'}]}}},
 rival_acordo:{th:'bastidores',w:.8,ok:()=>!!S.nemesis,prm:()=>({}),build:()=>({id:'_g_pacto',scene:'skyline',who:S.nemesis,tag:'Bastidores',t:`${S.nemesis.name} propõe um pacto`,txt:`${S.nemesis.name} manda recado: um pacto de não agressão até a próxima eleição.`,ch:[
   {l:'Aceitar o pacto',fx:{ip:3,et:-1},fn:()=>{S.nemesis.elo=(S.nemesis.elo||0)-1},r:'Os ataques pararam. Por enquanto.'},
   {l:'Recusar',fx:{cp:1},r:'A guerra continua.'},
   {l:'Expor a proposta na imprensa',grudge:2,fx:{am:2,ip:-2},fn:()=>{S.nemesis.elo=(S.nemesis.elo||0)+1},r:'Você ganhou manchete e um inimigo mais motivado.'}]})},
 conflito:{th:'bastidores',w:1,ok:()=>S.allies.length>=2,prm:()=>{const s=S.allies.slice().sort(()=>rnd()-.5);return {a:s[0].id,b:s[1].id}},build:p=>{const A=S.allies.find(x=>x.id===p.a)||S.allies[0],B=S.allies.find(x=>x.id===p.b)||S.allies[1]; return {id:'_g_conflito',scene:'skyline',who:A,tag:'Aliados em guerra',t:`${A.name} contra ${B.name}`,txt:`Seus aliados ${A.name} e ${B.name} brigaram por espaço no seu grupo. Os dois querem que você escolha um lado.`,ch:[
   {l:`Ficar com ${A.name}`,fx:{},fn:()=>{A.loy=clamp(A.loy+12,0,100);B.loy=clamp(B.loy-15,0,100)},r:`${B.name} ficou ressentido.`},
   {l:`Ficar com ${B.name}`,fx:{},fn:()=>{B.loy=clamp(B.loy+12,0,100);A.loy=clamp(A.loy-15,0,100)},r:`${A.name} ficou ressentido.`},
   {l:'Mediar com um jantar caro',fx:{$:-6},fn:()=>{A.loy=clamp(A.loy+4,0,100);B.loy=clamp(B.loy+4,0,100)},r:'Os dois saíram do jantar conversando.'}]}}},
 votacao:{th:'gabinete',w:2,ok:()=>OFF[S.office].type==='leg',prm:()=>{const lv=billLevel(); return {lv,b:Math.floor(rnd()*BILLS[lv].length),or:rnd()<.5?'SIM':'NÃO'}},build:p=>{const B=BILLS[p.lv][p.b], P=PARTIES[S.party]; const sup=clamp(Math.round(50+10*B.pro.length-8*B.con.length+randn()*6),15,85); return {id:'_g_votacao',scene:{ver:'camara',dest:'assembleia'}[S.office]||'congresso',tag:'Votação nominal',t:`Votação: ${B.n}`,txt:`O painel abre para votar ${B.n}. A orientação do ${P.sig} é ${p.or}. Pesquisas indicam ${sup}% de apoio entre os eleitores.`,ch:[
   {l:'Votar SIM',fx:Object.assign(segFx(B.pro,B.con,3),{pt:p.or==='SIM'?4:-6,['o:'+B.iss]:3,am:sup>55?1:-1}),r:`Você votou SIM. ${p.or==='SIM'?'A liderança agradeceu.':'A liderança anotou a traição.'}`},
   {l:'Votar NÃO',fx:Object.assign(segFx(B.con,B.pro,3),{pt:p.or==='NÃO'?4:-6,['o:'+B.iss]:3,am:sup<45?1:-1}),r:`Você votou NÃO. ${p.or==='NÃO'?'A liderança agradeceu.':'A liderança anotou a traição.'}`},
   {l:'Negociar uma emenda antes de votar',p:clamp(S.stats.cp/100+.3,.2,.9),fx:{cp:2,ip:2,['o:'+B.iss]:4},r:'Sua emenda foi incorporada ao texto.',fail:{fx:{ip:-2},r:'Ninguém deu bola para a sua emenda.'}},
   {l:'Sair do plenário na hora do voto',fx:{pt:-2,am:-1},r:'A ausência foi notada.'}]}}},
 sancao:{th:'gabinete',w:1.4,ok:()=>OFF[S.office].type==='exec',prm:()=>{const lv=billLevel(); return {lv,b:Math.floor(rnd()*BILLS[lv].length)}},build:p=>{const B=BILLS[p.lv][p.b]; return {id:'_g_sancao',scene:HOUSE_SCENE[S.office],tag:'Sanção ou veto',t:`Sancionar ou vetar: ${B.n}`,txt:`O Legislativo aprovou o projeto: ${B.n}. Você tem 15 dias úteis para sancionar ou vetar.`,ch:[
   {l:'Sancionar',fx:Object.assign(segFx(B.pro,B.con,3),{ip:2,['o:'+B.iss]:4}),r:'A lei foi publicada no Diário Oficial.'},
   {l:'Vetar',fx:Object.assign(segFx(B.con,B.pro,3),{ip:-3,cp:1}),r:'O veto voltou para o Legislativo, que pode derrubá-lo.'},
   {l:'Sancionar com vetos parciais',fx:{ip:1,cp:1,['o:'+B.iss]:2},r:'Ninguém ficou totalmente satisfeito.'}]}}},
 orcamento:{th:'gabinete',w:1.6,ok:()=>OFF[S.office].type==='exec',prm:()=>({i:hotIssues().slice(0,3),sobra:S.stats.f>=50,v:Math.round(20+rnd()*80)}),build:p=>{const mv=p.v*OFF[S.office].sc*(S.office==='pres'?40:1); const mil=mv>=1000?num1(mv/1000)+' bilhões':fmt(mv)+' milhões'; return p.sobra?{id:'_g_orc',scene:HOUSE_SCENE[S.office],tag:'Orçamento',t:`Sobram R$ ${mil}`,txt:'A arrecadação veio acima do previsto. Onde investir o dinheiro extra?',ch:p.i.map(i=>({l:`Investir em ${ISS[i].n.toLowerCase()}`,fx:Object.assign({f:-4,apo:1,['o:'+i]:8,['h:'+i]:-12},segFx(Object.entries(SEG).filter(([k,s])=>s.care[i]).map(([k])=>k),[],2)),r:`O dinheiro foi para ${ISS[i].n.toLowerCase()}.`})).concat([{l:'Guardar no caixa',fx:{f:4,aa:1},r:'As contas agradecem.'}])}:{id:'_g_orc2',scene:HOUSE_SCENE[S.office],tag:'Orçamento',t:`É preciso cortar R$ ${mil}`,txt:'As contas não fecham. Algo precisa ser cortado.',ch:p.i.map(i=>({l:`Cortar em ${ISS[i].n.toLowerCase()}`,fx:Object.assign({f:5,['o:'+i]:-6,['h:'+i]:6},segFx([],Object.entries(SEG).filter(([k,s])=>s.care[i]).map(([k])=>k),3)),r:`O corte atingiu ${ISS[i].n.toLowerCase()}.`})).concat([{l:'Aumentar impostos',fx:{f:5,aa:-3,am:-2,'o:impostos':-4},r:'O aumento passou, com protestos.'}])}}},
 crise:{th:'gabinete',w:1.2,ok:()=>OFF[S.office].type==='exec',prm:()=>({i:pickIssue()}),build:p=>{const txt={saude:'O hospital principal ficou sem oxigênio por seis horas.',transporte:'Os motoristas de ônibus pararam e a cidade travou.',seguranca:'Uma chacina numa comunidade choca o país.',educacao:'Uma escola desabou parcialmente durante a madrugada.',emprego:'Uma grande empresa anunciou demissão em massa.',custo:'O preço do botijão de gás dobrou em um mês.',corrupcao:'Um secretário foi flagrado com dinheiro na cueca.',ambiente:'Um vazamento químico contaminou o rio.',costumes:'Um evento cultural financiado pelo governo virou polêmica nacional.',impostos:'A Justiça suspendeu a cobrança de um imposto e o caixa sentiu.',moradia:'Um prédio ocupado pegou fogo e deixou centenas sem teto.'}[p.i]; return {id:'_g_crise',scene:SCENE_ISS[p.i],tag:'Crise · '+ISS[p.i].n,t:'Crise no seu governo',txt,ch:[
   {l:'Gastar o que for preciso para resolver',fx:{f:-5,apo:2,am:1,['o:'+p.i]:6},r:'A resposta foi rápida e cara.'},
   {l:'Culpar a gestão anterior',fx:{am:1,['o:'+p.i]:-3,et:-1},r:'Parte do eleitorado aceitou a explicação.'},
   {l:'Chamar a iniciativa privada para ajudar',fx:{f:-1,aa:2,['o:'+p.i]:3,rj:1},r:'Empresas assumiram parte do problema.'}]}}},
 ministro:{th:'gabinete',w:1,ok:()=>!!S.cabinet&&cabSlots().some(k=>S.cabinet[k]),prm:()=>({k:pick(cabSlots().filter(k=>S.cabinet[k]))}),build:p=>{const a=S.cabinet[p.k]; return {id:'_g_min',scene:HOUSE_SCENE[S.office],who:a,tag:cabTitle(p.k),t:`${a.name} propõe um programa`,txt:`${a.name}, de ${cabTitle(p.k)}, propõe um programa ambicioso para a área. Custa caro, mas pode render bons resultados.`,ch:[
   {l:'Aprovar o programa',fx:Object.assign(scaleFx(PORTF[p.k].fx,3),{f:-3}),r:'O programa foi lançado com festa.'},
   {l:'Pedir mais estudos',fx:{},r:'O projeto voltou para a gaveta.'},
   {l:'Recusar e cobrar resultados',fx:{f:1},fn:()=>{a.comp=clamp(a.comp+3,0,100)},r:'O titular voltou ao trabalho pressionado.'}]}}},
 carreira:{th:'gabinete',w:1.5,ok:()=>S.office==='none',prm:()=>{S.carU=S.carU||[]; let v,t=0; do{v=Math.floor(rnd()*CARREIRA.length)}while(S.carU.includes(v)&&t++<20); S.carU.push(v); if(S.carU.length>5) S.carU.shift(); return {v}},build:p=>{const o=CARREIRA[p.v]||[['Universidade oferece aula','Uma universidade convida você para dar aulas de gestão pública.',{aa:2,$:6,cp:1}],['Programa de rádio','Uma rádio oferece um programa semanal com seu nome.',{am:2,apo:2,$:4}],['Voluntariado','Uma ONG pede ajuda para coordenar um mutirão de saúde.',{apo:3,et:2}],['Consultoria internacional','Um organismo internacional oferece seis meses de consultoria fora do país.',{aa:3,$:15,cp:-3,apo:-2}]][p.v]; return {id:'_g_carreira',scene:'skyline',tag:'Vida fora do mandato',t:o[0],txt:o[1],ch:[{l:'Aceitar',fx:o[2],r:'Você manteve o nome em evidência.'},{l:'Recusar e focar na política',fx:{pt:2,cp:1},r:'Você seguiu nos bastidores do partido.'}]}}},
};
const CARREIRA=[['Universidade oferece aula','Uma universidade convida você para dar aulas de gestão pública.',{aa:2,$:6,cp:1}],['Programa de rádio','Uma rádio oferece um programa semanal com seu nome.',{am:2,apo:2,$:4}],['Voluntariado','Uma ONG pede ajuda para coordenar um mutirão de saúde.',{apo:3,et:2}],['Consultoria internacional','Um organismo internacional oferece seis meses de consultoria fora do país.',{aa:3,$:15,cp:-3,apo:-2}],['Núcleo de pré-campanha','Militantes querem montar um núcleo permanente nos bairros para a próxima eleição.',{apo:2,pt:2,$:-4}],['Livro de bastidores','Uma editora quer um livro com os bastidores do seu último mandato.',{aa:2,cp:2,pt:-3}],['Escola de formação política','O partido pede que você coordene a escola de formação de jovens militantes.',{pt:4,'s:jovens':3}],['Comentários na TV','Uma emissora quer você como comentarista nas noites de debate.',{am:3,aa:1}]];
const SCENE_ISS={seguranca:'pf',saude:'hospital',educacao:'protesto',transporte:'estrada',emprego:'fabrica',custo:'dinheiro',corrupcao:'pf',ambiente:'fumaca',costumes:'igreja',impostos:'skyline',moradia:'enchente'};
function themeOf(e){ if(THEME_MAP[e.id]) return THEME_MAP[e.id]; if(e.who&&e.who!=='*') return 'gabinete'; return 'bastidores'; }
function chooseDecision(th,used){
  const fixed=EVENTS.filter(e=>!e.o.camp&&themeOf(e)===th&&whoMatch(e.who)&&!S.seen[e.id]&&!used[e.id]&&(!e.o.req||e.o.req(S.stats)));
  const gens=Object.keys(GENS).filter(g=>GENS[g].th===th&&GENS[g].ok());
  const opts=fixed.map(e=>({kind:'fixed',id:e.id,w:(e.o.w||1)*(e.o.req?2.5:1.1)}));
  gens.forEach(g=>opts.push({kind:'gen',g,w:GENS[g].w*(S.lastGen[th]===g?0.15:1)*(used['g:'+g]?0.05:1)}));
  if(!opts.length) return {kind:'gen',g:'pauta',prm:GENS.pauta.prm()};
  let r=rnd()*opts.reduce((a,o)=>a+o.w,0), ch=opts[opts.length-1];
  for(const o of opts){ r-=o.w; if(r<=0){ ch=o; break; } }
  if(ch.kind==='fixed'){ used[ch.id]=1; S.seen[ch.id]=(S.seen[ch.id]||0)+1; return {kind:'fixed',id:ch.id}; }
  S.lastGen[th]=ch.g; used['g:'+ch.g]=1; return {kind:'gen',g:ch.g,prm:GENS[ch.g].prm()};
}
function pendingDecisions(){ return inCampaign()||!S.dec?[]:S.dec.filter(d=>!d.done) }
function openDecision(i){ const d=S.dec[i]; if(!d||d.done) return; const ev=buildDecision(d); if(!ev){ d.done=true; return renderGame(); } S.decOpen=i; showEvent(ev,{back:true,theme:THEMES.find(t=>t.k===d.th),tone:d.tone||'dilema'}); }

// ---------- jornal ----------
const CLUBS=['Ribeira FC','Atlético Guanabara','Cariri EC','União Colinas','Sertão FC','Estrela do Litoral','Ferroviário','Real Capital','Esporte Clube Planalto','Botafogo do Vale'];
const WORLD_NEWS=['Cúpula do clima termina sem acordo sobre metas de emissões','Eleições na {pais} terminam com vitória da oposição','Petróleo {sobecai} {n}% após decisão dos países produtores','Cientistas brasileiros testam vacina de dose única contra a dengue','Lançamento de satélite brasileiro é adiado pela terceira vez','Greve de aeroviários cancela {n}0 voos no fim de semana','Pesquisa aponta que {n}% dos brasileiros já usam IA no trabalho','Onda de calor bate recorde em {cidade}','Exportações do agro batem recorde no trimestre','Nova variante de gripe preocupa autoridades de saúde','Ciclone extratropical atinge o litoral Sul','Plataforma de vídeos é multada por vazar dados de usuários','Missão espacial internacional pousa em asteroide','Acordo de paz é assinado depois de dois anos de conflito no {pais2}','Bolsa de valores fecha o trimestre em {altaqueda}','Brasil sobe {n} posições em ranking mundial de inovação'];
const CULTURE=['Novela das nove bate recorde de audiência','Escola de samba anuncia enredo sobre o sertão','Feira do livro recebe {n}0 mil visitantes','Cantora da periferia estoura nas plataformas de música','Filme nacional é indicado a prêmio internacional','Festival de forró lota a praça central','Museu reabre depois de três anos de reforma'];
const CLASSIF=['Vende-se Fusca 1978, motor revisado. Tratar com Seu Lauro.','Aulas de violão a domicílio. Primeira aula grátis.','Aluga-se sala comercial no centro, ótima para comitê eleitoral.','Procura-se cachorro caramelo atende por Pipoca. Gratifica-se.','Conserto de urna, ops, de máquina de lavar. Preço justo.','Bolos caseiros por encomenda. Aceitamos Pix.'];
const PAISES=['Argentina','França','Índia','México','Chile','Coreia do Sul','Nigéria','Canadá','Portugal','Colômbia'];
function fillNews(t){return t.replace('{pais}',pick(PAISES)).replace('{pais2}',pick(['Cáucaso','Sahel','Sudeste Asiático'])).replace('{sobecai}',pick(['sobe','cai'])).replace('{altaqueda}',pick(['alta','queda'])).replace('{cidade}',pick(['Madri','Délhi','Phoenix','Atenas','Cuiabá','Teresina'])).replace(/\{n\}/g,String(Math.round(3+rnd()*20)))}
function columnText(){
  const st=S.stats, ap=AP();
  if(st.rj>=55) return `O cerco se fecha. ${S.nome} gasta mais tempo com advogados do que com eleitores, e os bastidores já falam em delação.`;
  if(ap>=60) return `${S.nome} vive o melhor momento da carreira. A pergunta nos corredores não é se vai subir, mas quando.`;
  if(st.ip<20&&S.office!=='none') return `Isolamento cobra caro: sem votos fiéis no plenário, ${S.nome} assiste à pauta passar sem conseguir mudar uma vírgula.`;
  if(st.et>=75) return `Numa política de acordos escusos, a ficha limpa de ${S.nome} virou ativo. Resta saber se honestidade ganha eleição.`;
  if(ap<30) return `A popularidade de ${S.nome} derrete. Ou muda o discurso, ou vira nota de rodapé.`;
  return `${S.nome} segue no meio do caminho: nem estrela, nem esquecido. O próximo trimestre dirá para que lado vai.`;
}
function makePaper(){
  const w=S.world, e=w.eco, p=w.ecoPrev||e, news=S.qNews||[];
  const qLog=S.log.filter(l=>l.y===S.year&&l.q===S.q);
  const big=qLog.find(l=>l.k==='elec'&&/ELEIT|Derrota|FIM/.test(l.t));
  const crisis=news.find(n=>n.crise);
  const top=news.slice().sort((a,b)=>b.sc-a.sc)[0];
  let man;
  if(big) man={t:big.t.replace(/^ELEIT[OA]: /,'Eleito: ').split(' (')[0],l:big.t};
  else if(crisis) man={t:crisis.t,l:crisis.r};
  else if(top&&top.sc>=6) man={t:top.t,l:top.r};
  else if(w.shock) man={t:w.shock,l:'O assunto dominou o país e mexeu com o humor do eleitorado.'};
  else if(top) man={t:top.t,l:top.r};
  else man={t:`${ISS[hotIssues()[0]].n} é a maior preocupação ${jurName()}`,l:'Pesquisa mostra que o tema lidera as preocupações dos eleitores.'};
  const games=Array.from({length:3},()=>{const a=pick(CLUBS);let b=pick(CLUBS);while(b===a)b=pick(CLUBS);return `${a} ${Math.floor(rnd()*4)} × ${Math.floor(rnd()*3)} ${b}`});
  const poll=S.polls[S.polls.length-1];
  const paper={y:S.year,q:S.q,man,
    pol:news.filter(n=>n!==top||!man||n.t!==man.t).map(n=>({t:n.t,r:n.r})).concat(qLog.filter(l=>!l.t.includes(': ')&&l!==big).slice(-4).map(l=>({t:l.t,r:''}))).slice(0,7),
    eco:{infl:e.infl,desemp:e.desemp,pib:e.pib,selic:e.selic,dolar:e.dolar,pinfl:p.infl,pdes:p.desemp,ppib:p.pib},
    mundo:[w.shock].filter(Boolean).concat(Array.from({length:3},()=>fillNews(pick(WORLD_NEWS)))).slice(0,3),
    esporte:games.concat([pick([`Seleção vence amistoso por ${1+Math.floor(rnd()*3)} a 0`,`Brasileira conquista ouro no mundial de ${pick(['judô','ginástica','skate','natação','vôlei de praia'])}`,`${pick(CLUBS)} demite técnico após quinta derrota seguida`])]),
    cult:fillNews(pick(CULTURE)), col:columnText(), cls:pick(CLASSIF),
    poll:poll?{inst:poll.inst,ap:poll.ap}:null,
    tempo:['Calor forte e pancadas de chuva no fim da tarde','Temperaturas amenas e céu aberto','Tempo seco e frio de manhã','Primavera com sol e chuvas isoladas'][S.q-1]};
  S.papers.push(paper); if(S.papers.length>30) S.papers.shift();
  S.qNews=[];
}
