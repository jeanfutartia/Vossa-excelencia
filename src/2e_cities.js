// ================= 90 CIDADES REAIS =================
// População aproximada (Censo 2022, em milhares). Eleitorado estimado a partir da população.
const UFS={AC:['Acre',0.6,8,'Norte'],AL:['Alagoas',2.3,9,'Nordeste'],AM:['Amazonas',2.7,8,'Norte'],AP:['Amapá',0.55,8,'Norte'],BA:['Bahia',11.3,39,'Nordeste'],CE:['Ceará',6.9,22,'Nordeste'],ES:['Espírito Santo',2.9,10,'Sudeste'],GO:['Goiás',4.9,17,'Centro-Oeste'],MA:['Maranhão',5.1,18,'Nordeste'],MG:['Minas Gerais',16.3,53,'Sudeste'],MS:['Mato Grosso do Sul',2.0,8,'Centro-Oeste'],MT:['Mato Grosso',2.5,8,'Centro-Oeste'],PA:['Pará',6.2,17,'Norte'],PB:['Paraíba',3.1,12,'Nordeste'],PE:['Pernambuco',7.0,25,'Nordeste'],PI:['Piauí',2.6,10,'Nordeste'],PR:['Paraná',8.5,30,'Sul'],RJ:['Rio de Janeiro',12.8,46,'Sudeste'],RN:['Rio Grande do Norte',2.6,8,'Nordeste'],RO:['Rondônia',1.2,8,'Norte'],RR:['Roraima',0.37,8,'Norte'],RS:['Rio Grande do Sul',8.6,31,'Sul'],SC:['Santa Catarina',5.6,16,'Sul'],SE:['Sergipe',1.7,8,'Nordeste'],SP:['São Paulo',34.4,70,'Sudeste'],TO:['Tocantins',1.1,8,'Norte']};
const CTYPE={
 capital:{n:'Capital',perfil:'Capital e metrópole',canais:'Redes sociais, TV, imprensa e grandes palanques',dif:'Eleitorado enorme, fragmentado e caro de conquistar',verMod:4,prefMod:6,tmpl:'guanabara',scene:'skyline'},
 polo:{n:'Polo regional',perfil:'Cidade grande do interior ou da região metropolitana',canais:'Sindicatos, associações comerciais e TV regional',dif:'Equilíbrio entre patrões, operários e periferia',verMod:1,prefMod:2,tmpl:'colinas',scene:'fabrica'},
 agro:{n:'Agronegócio',perfil:'Cidade movida pelo agronegócio',canais:'Cooperativas, sindicatos rurais, rádio e igrejas',dif:'Produtores rurais pesam muito e cobram estradas e crédito',verMod:-1,prefMod:4,tmpl:'agro',scene:'campo'},
 litoral:{n:'Turística',perfil:'Cidade turística e de serviços',canais:'Comércio, hotelaria, redes sociais e associações de bairro',dif:'Turismo gera emprego, mas encarece moradia e divide a cidade',verMod:-1,prefMod:3,tmpl:'litoral',scene:'skyline'},
 pequena:{n:'Interior',perfil:'Cidade pequena do interior',canais:'Rádio comunitária, famílias tradicionais e igrejas',dif:'Famílias tradicionais dominam a política há décadas',verMod:-3,prefMod:5,tmpl:'sertao',scene:'campo'},
};
const CITY_LIST=[
 // capitais (Brasília fica de fora: o DF não tem prefeito nem vereadores)
 ['São Paulo','SP',11451,'capital'],['Rio de Janeiro','RJ',6211,'capital'],['Fortaleza','CE',2428,'capital'],['Salvador','BA',2418,'capital'],['Belo Horizonte','MG',2316,'capital'],['Manaus','AM',2063,'capital'],['Curitiba','PR',1773,'capital'],['Recife','PE',1488,'capital'],['Goiânia','GO',1437,'capital'],['Porto Alegre','RS',1332,'capital'],['Belém','PA',1303,'capital'],['São Luís','MA',1037,'capital'],['Maceió','AL',957,'capital'],['Campo Grande','MS',898,'capital'],['Teresina','PI',866,'capital'],['João Pessoa','PB',833,'capital'],['Natal','RN',751,'capital'],['Cuiabá','MT',650,'capital'],['Aracaju','SE',602,'capital'],['Florianópolis','SC',537,'capital'],['Porto Velho','RO',460,'capital'],['Macapá','AP',442,'capital'],['Boa Vista','RR',413,'capital'],['Rio Branco','AC',364,'capital'],['Vitória','ES',322,'capital'],['Palmas','TO',302,'capital'],
 // polos regionais e regiões metropolitanas
 ['Guarulhos','SP',1291,'polo'],['Campinas','SP',1139,'polo'],['São Gonçalo','RJ',896,'polo'],['Duque de Caxias','RJ',808,'polo'],['São Bernardo do Campo','SP',810,'polo'],['Nova Iguaçu','RJ',785,'polo'],['Santo André','SP',748,'polo'],['Osasco','SP',728,'polo'],['Sorocaba','SP',723,'polo'],['Uberlândia','MG',713,'polo'],['Ribeirão Preto','SP',698,'polo'],['São José dos Campos','SP',697,'polo'],['Contagem','MG',621,'polo'],['Feira de Santana','BA',616,'polo'],['Joinville','SC',616,'polo'],['Londrina','PR',555,'polo'],['Juiz de Fora','MG',540,'polo'],['Niterói','RJ',481,'polo'],['Campos dos Goytacazes','RJ',483,'polo'],['Caxias do Sul','RS',463,'polo'],['Santos','SP',418,'polo'],['Campina Grande','PB',419,'polo'],['Montes Claros','MG',414,'polo'],['Maringá','PR',409,'polo'],['Petrolina','PE',386,'polo'],['Caruaru','PE',378,'polo'],
 // agronegócio
 ['Uberaba','MG',337,'agro'],['Chapecó','SC',254,'agro'],['Rondonópolis','MT',244,'agro'],['Dourados','MS',243,'agro'],['Rio Verde','GO',225,'agro'],['Passo Fundo','RS',206,'agro'],['Sinop','MT',196,'agro'],['Barreiras','BA',159,'agro'],['Toledo','PR',150,'agro'],['Sorriso','MT',110,'agro'],['Luís Eduardo Magalhães','BA',107,'agro'],['Balsas','MA',101,'agro'],['Primavera do Leste','MT',85,'agro'],
 // turísticas e litorâneas
 ['Foz do Iguaçu','PR',285,'litoral'],['Cabo Frio','RJ',222,'litoral'],['Ilhéus','BA',178,'litoral'],['Porto Seguro','BA',168,'litoral'],['Balneário Camboriú','SC',139,'litoral'],['Ipojuca','PE',98,'litoral'],['Ubatuba','SP',93,'litoral'],['Paraty','RJ',45,'litoral'],['Bonito','MS',23,'litoral'],['Jijoca de Jericoacoara','CE',19,'litoral'],
 // interior
 ['Bacabal','MA',104,'pequena'],['Patos','PB',103,'pequena'],['Itabaiana','SE',103,'pequena'],['Iguatu','CE',98,'pequena'],['Parintins','AM',96,'pequena'],['Serra Talhada','PE',92,'pequena'],['Cruzeiro do Sul','AC',91,'pequena'],['Guanambi','BA',87,'pequena'],['Quixadá','CE',84,'pequena'],['Picos','PI',83,'pequena'],['Arcoverde','PE',77,'pequena'],['Ouro Preto','MG',74,'pequena'],['Caicó','RN',61,'pequena'],['Diamantina','MG',47,'pequena'],['Xique-Xique','BA',45,'pequena'],
];
function vereadores(p){ const T=[[15,9],[30,11],[50,13],[80,15],[120,17],[160,19],[300,21],[450,23],[600,25],[750,27],[900,29],[1050,31],[1200,33],[1350,35],[1500,37],[1800,39],[2400,41],[3000,43],[4000,45],[5000,47],[6000,49],[7000,51],[8000,53]]; for(const [lim,n] of T) if(p<=lim) return n; return 55; }
function slug(t){ return t.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
// modelos extras de eleitorado
SEG_SIZE.agro={per:.1,media:.15,elite:.07,serv:.1,evang:.16,jovens:.14,idosos:.1,agro:.18};
SEG_SIZE.litoral={per:.2,media:.2,elite:.06,serv:.1,evang:.12,jovens:.17,idosos:.12,agro:.03};
HEAT_BASE.agro={transporte:55,impostos:52,seguranca:48,emprego:44,saude:46,ambiente:46,costumes:46,custo:44,educacao:40,corrupcao:40,moradia:34};
HEAT_BASE.litoral={moradia:58,seguranca:54,emprego:52,ambiente:52,saude:46,transporte:46,custo:52,corrupcao:42,educacao:40,impostos:40,costumes:36};
REGIONS.agro=[{n:'Distrito industrial',w:.16,mix:[.12,.38,.5]},{n:'Zona rural',w:.24,mix:[.3,.3,.4]},{n:'Bairros novos',w:.2,mix:[.1,.4,.5]},{n:'Centro',w:.24,mix:[.3,.45,.25]},{n:'Periferia',w:.16,mix:[.04,.26,.7]}];
REGIONS.litoral=[{n:'Morros',w:.2,mix:[.04,.26,.7]},{n:'Bairros de dentro',w:.22,mix:[.08,.37,.55]},{n:'Zona rural',w:.12,mix:[.1,.25,.65]},{n:'Centro',w:.24,mix:[.25,.5,.25]},{n:'Orla',w:.22,mix:[.45,.45,.1]}];
REGIONS.capital=REGIONS.guanabara; REGIONS.polo=REGIONS.colinas; REGIONS.pequena=REGIONS.sertao;
// cidades fictícias antigas: só para saves anteriores
for(const k of ['sertao','colinas','guanabara']){ CITIES[k].hidden=true; CITIES[k].type={sertao:'pequena',colinas:'polo',guanabara:'capital'}[k]; CITIES[k].sigla=''; }
for(const [n,uf,pop,type] of CITY_LIST){
  const T=CTYPE[type], U=UFS[uf], key=slug(n+'-'+uf), elec=Math.round(pop*1000*0.74), seats=vereadores(pop), dfed=U[2], dest=dfed<=12?dfed*3:36+(dfed-12);
  CITIES[key]={n,uf:U[0],sigla:uf,reg:U[3],type,perfil:T.perfil,pop:(pop>=1000?(pop/1000).toLocaleString('pt-BR',{maximumFractionDigits:1})+' milhões':pop+' mil')+' hab.',popK:pop,elec,seats,qe:Math.round(elec*0.8/seats),stElec:Math.round(U[1]*1e6),dfedSeats:dfed,destSeats:dest,
    verMod:T.verMod+(pop>3000?1:0),prefMod:T.prefMod+(pop>3000?1:0),twoRound:elec>200000,canais:T.canais,dif:T.dif};
  SEG_SIZE[key]=SEG_SIZE[T.tmpl]; HEAT_BASE[key]=HEAT_BASE[T.tmpl]; REGIONS[key]=REGIONS[type];
}
const CITY_KEYS=Object.keys(CITIES).filter(k=>!CITIES[k].hidden);
function cityType(k){ return CITIES[k].type||'polo'; }
