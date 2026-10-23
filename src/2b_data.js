// ================= DADOS v2 =================
const NF=['Ana','Beatriz','Camila','Daniela','Eliane','Fernanda','Gabriela','Helena','Iara','Joana','Lúcia','Marta','Neide','Patrícia','Raquel','Simone','Tânia','Vera','Yasmin','Rosângela','Cida','Kátia','Luana','Sônia','Marlene','Débora'];
const NM=['Antônio','Bruno','Carlos','Diego','Edson','Fábio','Gilberto','Heitor','Igor','João','Leandro','Marcos','Nelson','Otávio','Paulo','Ricardo','Sérgio','Tadeu','Valdir','Wagner','Zé Maria','Roberto','Márcio','Osvaldo','Juvêncio','Rui'];
const SUR=['Albuquerque','Barbosa','Cavalcanti','Esteves','Ferraz','Gouveia','Holanda','Junqueira','Lacerda','Medeiros','Nogueira','Pimentel','Queiroz','Rezende','Sampaio','Tavares','Uchoa','Valadares','Xavier','Brandão','Moura','Linhares','Sarmento','Rios','Bastos','Coutinho','Figueiredo','Magalhães','Prates','Arruda'];
const NICK=['do Posto','da Farmácia','do Gás','da Saúde','do Povo','da Feira','da Van','do Mercadinho','Motorista','do Sindicato','da Creche','do Açougue'];
const PROFILES=[
 {k:'dinastia',n:'Herdeiro(a) de dinastia',bias:[.25,0,.05],title:[['Dr.','Dra.']]},
 {k:'outsider',n:'Outsider das redes',bias:[0,.3,0]},
 {k:'tecnico',n:'Técnico(a) de carreira',bias:[.3,.1,-.15],title:[['Professor','Professora']]},
 {k:'populista',n:'Populista de TV',bias:[-.1,0,.3]},
 {k:'policial',n:'Ex-policial',bias:[0,.2,.1],title:[['Delegado','Delegada'],['Coronel','Coronel'],['Capitão','Capitã']]},
 {k:'religioso',n:'Líder religioso(a)',bias:[-.1,0,.3],title:[['Pastor','Pastora'],['Bispo','Bispa']]},
 {k:'sindical',n:'Sindicalista',bias:[-.2,.1,.3]},
 {k:'empresario',n:'Empresário(a)',bias:[.4,.1,-.2]},
];
const ACUSA=['usou o mandato para enriquecer a família','prometeu e não entregou nenhuma obra','é sustentado(a) por empreiteiras','não conhece os bairros que diz defender','faltou a metade das votações'];
const ESCAND=['tem uma fazenda em nome de laranjas','foi flagrado(a) com assessor fantasma','deve R$ 2 milhões em impostos','plagiou o próprio plano de governo','recebeu doações de uma facção'];

const ALLY_DEF={
 cacique:{n:'Cacique do partido',prof:'dinastia',passive:{pt:.8},favor:'Pedir reforço do fundo partidário',fx:{$:14,pt:-2},shield:'plen'},
 prefeito:{n:'Chefe político do interior',prof:'dinastia',passive:{apo:.3,ip:.2},favor:'Pedir cabos eleitorais',fx:{apo:2,camp:5}},
 empresario:{n:'Empresário(a)',prof:'empresario',passive:{$:1.5},favor:'Pedir doação',fx:{$:18},shadyFx:{$:32,rj:6}},
 religioso:{n:'Líder religioso(a)',prof:'religioso',passive:{apo:.3},favor:'Pedir apoio no púlpito',fx:{apo:3,camp:4},shield:'rua'},
 sindicalista:{n:'Sindicalista',prof:'sindical',passive:{apo:.2,am:.2},favor:'Mobilizar a militância',fx:{apo:2,am:2,camp:3},shield:'rua'},
 jornalista:{n:'Jornalista',prof:'outsider',passive:{aa:.3},favor:'Pedir reportagem favorável',fx:{aa:3,am:2}},
 parlamentar:{n:'Parlamentar aliado(a)',prof:'dinastia',passive:{ip:.6},favor:'Pedir votos no plenário',fx:{ip:6},shield:'plen'},
 advogado:{n:'Advogado(a) de confiança',prof:'tecnico',passive:{rj:-.4},favor:'Pedir defesa urgente',fx:{rj:-6}},
 influencer:{n:'Influenciador(a)',prof:'outsider',passive:{am:.3},favor:'Pedir post de apoio',fx:{am:3,camp:3},shield:'rua'},
};
const ARCH_ALLY={adv:'advogado',sind:'sindicalista',emp:'empresario',inf:'influencer',rel:'religioso',prof:'jornalista'};

const STAFF={
 chefe:{n:'Chefe de gabinete',d:'+1 ação por semana de campanha',sal:3},
 marq:{n:'Marqueteiro fixo',d:'+25% em toda força de campanha',sal:4},
 adv:{n:'Advogado eleitoral',d:'Risco judicial cai 1 ponto por trimestre',sal:4},
 imp:{n:'Assessor de imprensa',d:'Corta pela metade o risco das ações de mídia',sal:3},
 tes:{n:'Tesoureiro',d:'+15% em toda arrecadação',sal:2},
};

const PORTF={
 faz:{n:'Fazenda',min:'Ministério da Fazenda',fx:{f:1.4,aa:.4}},
 civil:{n:'Casa Civil',min:'Casa Civil',fx:{ip:1.2}},
 saude:{n:'Saúde',min:'Ministério da Saúde',fx:{apo:.7,am:.4}},
 edu:{n:'Educação',min:'Ministério da Educação',fx:{am:.7,apo:.3}},
 seg:{n:'Segurança Pública',min:'Ministério da Segurança',fx:{am:.7,rj:-.2}},
 just:{n:'Justiça',min:'Ministério da Justiça',fx:{am:.4,et:.3,rj:-.3}},
 infra:{n:'Infraestrutura',min:'Ministério dos Transportes',fx:{apo:.5,aa:.3,f:-.2}},
 obras:{n:'Obras',min:'Obras',fx:{apo:.7,f:-.2}},
 agro:{n:'Agricultura',min:'Ministério da Agricultura',fx:{aa:.6}},
 amb:{n:'Meio Ambiente',min:'Ministério do Meio Ambiente',fx:{aa:.4,et:.2}},
 rex:{n:'Relações Exteriores',min:'Itamaraty',fx:{aa:.4,cp:.3}},
 social:{n:'Desenvolvimento Social',min:'Ministério do Desenvolvimento Social',fx:{apo:.9,f:-.3}},
 assist:{n:'Assistência Social',min:'Assistência Social',fx:{apo:.8,f:-.2}},
 deseco:{n:'Desenvolvimento Econômico',min:'Desenvolvimento Econômico',fx:{aa:.4,am:.4,f:.2}},
};
const SLOTS={pref:['faz','saude','edu','obras','seg','assist'],gov:['faz','civil','saude','edu','seg','infra','deseco'],pres:['faz','civil','saude','edu','just','infra','agro','amb','rex','social']};

const REGIONS={
 sertao:[{n:'Serra',w:.15,mix:[.1,.2,.7]},{n:'Assentamentos',w:.18,mix:[.03,.17,.8]},{n:'Zona rural',w:.22,mix:[.12,.18,.7]},{n:'Sede',w:.33,mix:[.2,.4,.4]},{n:'Bairro da Estação',w:.12,mix:[.08,.32,.6]}],
 colinas:[{n:'Zona Norte',w:.22,mix:[.08,.32,.6]},{n:'Distrito Industrial',w:.2,mix:[.05,.35,.6]},{n:'Zona Oeste',w:.17,mix:[.1,.3,.6]},{n:'Centro',w:.21,mix:[.3,.5,.2]},{n:'Zona Sul',w:.2,mix:[.35,.45,.2]}],
 guanabara:[{n:'Zona Norte',w:.26,mix:[.08,.4,.52]},{n:'Baixada',w:.2,mix:[.03,.27,.7]},{n:'Zona Oeste',w:.2,mix:[.1,.35,.55]},{n:'Centro',w:.14,mix:[.3,.5,.2]},{n:'Zona Sul',w:.2,mix:[.45,.45,.1]}],
 estado:[{n:'Interior Norte',w:.2,mix:[.12,.28,.6]},{n:'Litoral',w:.17,mix:[.2,.4,.4]},{n:'Interior Oeste',w:.18,mix:[.15,.3,.55]},{n:'Capital',w:.28,mix:[.3,.45,.25]},{n:'Interior Sul',w:.17,mix:[.2,.4,.4]}],
 brasil:[{n:'Norte',w:.08,mix:[.08,.3,.62]},{n:'Nordeste',w:.27,mix:[.07,.28,.65]},{n:'Centro-Oeste',w:.08,mix:[.2,.4,.4]},{n:'Sudeste',w:.42,mix:[.22,.45,.33]},{n:'Sul',w:.15,mix:[.2,.48,.32]}],
};
const MAPSHAPES=[
 {d:'M18,22 L150,10 L160,92 L92,112 L24,98 Z',x:84,y:58},
 {d:'M150,10 L282,26 L288,102 L204,116 L160,92 Z',x:222,y:60},
 {d:'M24,98 L92,112 L122,162 L62,182 L30,152 Z',x:70,y:142},
 {d:'M92,112 L160,92 L204,116 L288,102 L272,170 L182,176 L122,162 Z',x:196,y:140},
 {d:'M62,182 L122,162 L182,176 L272,170 L232,212 L92,214 Z',x:166,y:196},
];
const VERBA=[{n:'Econômica',cost:0,camp:0,eff:1,d:'Só militância'},{n:'Normal',cost:8,camp:2,eff:3,d:'Rádio, carro de som e posts'},{n:'Agressiva',cost:20,camp:5,eff:6,d:'TV, outdoor e impulsionamento'}];

const SCENE_MAP={enchente:'enchente',enchente_est:'enchente',deslizamento:'enchente',audio:'imprensa',empresario:'dinheiro',arlindo_cobra:'dinheiro',op_sacola:'pf',fakenews:'imprensa',sonho:'urna',emprego:'dinheiro',greve_prof:'protesto',motorista:'pf',reality:'tv',morte_lider:'igreja',hacker:'imprensa',reporter:'imprensa',pulpito:'igreja',torcida:'comicio',meme:'imprensa',foto_suspeita:'pf',forum:'skyline',burnout:'hospital',irmao:'skyline',delegado:'pf',ocupacao:'protesto',escandalo_partido:'pf',podcast_ext:'tv',bets:'dinheiro',celebridade:'comicio',coronel:'campo',assessor_rival:'skyline',apagao:'skyline',op_colega:'pf',premio:'imprensa',familiar_doente:'hospital',deepfake:'imprensa',jogo_bicho:'comicio',queimada:'fumaca',
 lobista_cobra:'dinheiro',tse_contas:'tribunal',rachadinha_ex:'imprensa',nepotismo_ex:'imprensa',pix_tcu:'tribunal',licitacao_pf:'pf',emprestimo_parcela:'dinheiro',vazou_volta:'imprensa',aije:'tribunal',delegado_cai:'pf',
 sem_salario:'skyline',convite_sec:'prefeitura',comentarista:'tv',ong:'comicio',desistir:'dinheiro',
 cpi_limpeza:'camara',ccj_pauta:'camara',salario_ver:'camara',rua:'camara',onibus:'protesto',irmao_sec:'prefeitura',plano_diretor:'skyline',madrugada:'camara',castracao:'camara',uber:'protesto',padroeira:'igreja',
 rombo:'prefeitura',garis:'protesto',dengue:'hospital',camara_trava:'camara',shopping:'skyline',tarifa:'protesto',concurso_fraude:'tribunal',conjuge:'prefeitura',visita_pres:'prefeitura',merenda:'imprensa',iptu:'prefeitura',festa:'comicio',fabrica_fecha:'fabrica',guarda:'pf',creches:'tribunal',
 emendas_relator:'congresso',relator_tcu:'tribunal',reforma_trib:'congresso',jatinho:'dinheiro',cota:'imprensa',cassacao_colega:'congresso',fundao:'congresso',pres_camara:'congresso',pl_fake:'congresso',prefeitos_verba:'campo',bets_rel:'dinheiro',pec_blind:'congresso',ministerio:'planalto',cpi_energia:'assembleia',servidores:'protesto',tce:'tribunal',
 stf_sab:'tribunal',bc_sab:'congresso',impeach_stf:'tribunal',pres_senado:'congresso',reforma_pol:'congresso',cpi_sen:'congresso',
 rebeliao:'presidio',greve_pm:'pf',rrf:'palacio',montadora:'fabrica',chacina:'pf',folha:'palacio',universidade_est:'protesto',faccao:'pf',
 previdencia:'protesto',cambio:'skyline',epidemia:'hospital',estatal_esc:'pf',acordo:'planalto',caminhoneiros:'estrada',amazonia:'fumaca',juros:'skyline',centrao:'congresso',ministro_esc:'pf',tarifas:'planalto',arrecadacao:'planalto',atos:'protesto',stf_vaga:'tribunal',apagao_nac:'skyline',copa:'comicio',
 dossie_final:'imprensa',desiste:'comicio',empate:'urna',cabo_flagrado:'pf',ex_pres:'comicio',laranjas:'urna',chuva:'enchente',pesquisa_fake:'urna',voto_util:'urna',sabotagem:'comicio'};
const HOUSE_SCENE={none:'skyline',ver:'camara',pref:'prefeitura',dest:'assembleia',dfed:'congresso',sen:'congresso',gov:'palacio',pres:'planalto'};
