// ================= 10 PARTIDOS =================
// pos: -1 esquerda … +1 direita. aff: afinidade inicial com grupos do eleitorado.
const PARTIES={
 fps:{sig:'FPS',n:'Frente Popular Social',esp:'Esquerda',ideo:'Trabalhismo, movimentos sociais e serviço público forte',pos:-.7,seats:15,
  bon:'Ações e decisões populares rendem 30% mais',pen:'Mercado e elite reagem 30% pior',mult:{apo:1.3,aa:.7},fit:{prop:1,maj:2},aff:{per:6,serv:6,elite:-8,agro:-5}},
 mrs:{sig:'MRS',n:'Movimento Revolução Socialista',esp:'Esquerda radical',ideo:'Ruptura com o sistema, taxar os ricos, poder popular',pos:-.95,seats:3,
  bon:'Militância aguerrida: jovens e servidores começam muito a favor',pen:'Partido nanico: corte eleitoral alto e elite e agro hostis',mult:{apo:1.15,aa:.55},fit:{prop:-3,maj:-4},aff:{jovens:7,serv:6,per:3,elite:-14,agro:-10,evang:-4}},
 ptd:{sig:'PTD',n:'Partido Trabalhista Democrático',esp:'Centro-esquerda',ideo:'Emprego, sindicatos e desenvolvimento nacional',pos:-.45,seats:9,
  bon:'Popular e servidores rendem 15% mais',pen:'Imagem de partido antigo: classe média reage 10% pior',mult:{apo:1.15,am:.9},fit:{prop:1,maj:0},aff:{serv:5,per:4,idosos:3,elite:-4}},
 verde:{sig:'REDE VERDE',n:'Rede Verde Progressista',esp:'Centro-esquerda ambientalista',ideo:'Transição ecológica, ciência e transparência',pos:-.3,seats:5,
  bon:'Ética e classe alta rendem 20% mais; imprensa favorável',pen:'Legenda pequena e mal vista no agro',mult:{et:1.2,aa:1.2},catMult:{midia:1.15},fit:{prop:-2,maj:-2},aff:{jovens:7,media:2,agro:-9}},
 pcn:{sig:'PCN',n:'Partido do Centro Nacional',esp:'Centro fisiológico',ideo:'Pragmatismo: apoia quem estiver no governo em troca de cargos',pos:0,seats:18,
  bon:'Articulação parlamentar rende 35% mais; maior bancada',pen:'A cúpula cobra cargos: a relação com o partido cai todo trimestre',mult:{ip:1.35},fit:{prop:3,maj:-3},aff:{}},
 unir:{sig:'UNIR',n:'União Municipalista',esp:'Centro',ideo:'Prefeitos do interior, obras e verbas para os municípios',pos:.15,seats:10,
  bon:'Começa com um chefe político do interior como aliado; articulação +15%',pen:'Cheiro de velha política: classe média reage 15% pior',mult:{ip:1.15,am:.85},fit:{prop:2,maj:0},aff:{agro:6,idosos:3,jovens:-3}},
 avanca:{sig:'AVANÇA',n:'Avança — Partido Liberal Reformista',esp:'Centro-direita liberal',ideo:'Reformas de mercado, menos Estado e austeridade',pos:.5,seats:11,
  bon:'Doações legais rendem 50% mais; classe alta +25%',pen:'Pouca penetração na periferia (popular −20%)',mult:{aa:1.25,apo:.8},fit:{prop:0,maj:0},aff:{elite:8,media:3,per:-4,serv:-4}},
 pac:{sig:'PAC',n:'Partido da Aliança Cristã',esp:'Direita conservadora',ideo:'Família, fé e costumes tradicionais',pos:.6,seats:10,
  bon:'Ações de base rendem 15% mais; evangélicos começam muito a favor',pen:'Rejeição entre jovens e servidores',mult:{apo:1.1},catMult:{base:1.15},fit:{prop:1,maj:1},aff:{evang:10,idosos:3,jovens:-6,serv:-4}},
 pan:{sig:'PAN',n:'Partido Agrário Nacional',esp:'Direita ruralista',ideo:'Agronegócio, propriedade privada e infraestrutura no campo',pos:.7,seats:7,
  bon:'Classe alta rende 20% mais; agro muito fiel',pen:'Ambientalistas e jovens contra',mult:{aa:1.2},fit:{prop:0,maj:1},aff:{agro:12,elite:3,jovens:-5,serv:-3}},
 pfn:{sig:'PFN',n:'Partido Força Nacional',esp:'Direita populista',ideo:'Segurança, ordem e confronto com o “sistema”',pos:.85,seats:12,
  bon:'Ações de mídia e redes rendem 40% mais',pen:'Tensão com o Judiciário: risco judicial sobe 15% mais rápido',mult:{am:1.1,aa:.75,rj:1.15},catMult:{midia:1.4},fit:{prop:0,maj:3},aff:{evang:5,media:3,jovens:-3,serv:-6}},
};
const PCOLOR={fps:'#EF5350',mrs:'#B71C1C',ptd:'#F06292',verde:'#4DD0B4',pcn:'#E0A43A',unir:'#A1887F',avanca:'#3D8BFD',pac:'#9575CD',pan:'#9CCC65',pfn:'#26A65B'};
const PARTY_ORDER=Object.keys(PARTIES).sort((a,b)=>PARTIES[a].pos-PARTIES[b].pos);
