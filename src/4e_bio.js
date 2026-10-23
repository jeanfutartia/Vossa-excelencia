// ================= BIOGRAFIA =================
const BIO_PAIS={
 adv:['filho(a) de um escrivão de cartório e de uma professora primária','filho(a) de uma defensora pública e de um comerciante'],
 sind:['filho(a) de um metalúrgico e de uma costureira','filho(a) de um motorista de ônibus e de uma merendeira'],
 emp:['herdeiro(a) de uma rede de lojas de material de construção','filho(a) do dono da maior distribuidora de bebidas da região'],
 inf:['criado(a) pela avó, que vendia salgados na porta da escola','filho(a) de um técnico de informática e de uma manicure'],
 rel:['filho(a) de um pastor e de uma missionária','filho(a) de uma catequista e de um diácono da paróquia do bairro'],
 prof:['filho(a) de agricultores, o(a) primeiro(a) da família a entrar na universidade','filho(a) de duas professoras da rede municipal'],
};
const BIO_FORM={adv:'Formou-se em Direito e advogou para associações de moradores',sind:'Começou a trabalhar aos 16 anos e virou delegado(a) sindical antes dos 20',emp:'Estudou Administração e assumiu cedo os negócios da família',inf:'Largou a faculdade de Comunicação para viver das redes, onde juntou meio milhão de seguidores',rel:'Estudou Teologia e coordenou os projetos sociais da igreja',prof:'Formou-se em Pedagogia e lecionou na rede pública por quatro anos'};
const BIO_INF={capital:'Cresceu vendo de perto o trânsito, a violência e a desigualdade da cidade grande',polo:'Cresceu entre fábricas, greves e bairros que surgiam da noite para o dia',agro:'Cresceu vendo as lavouras tomarem o horizonte e as estradas de terra engolirem caminhões',litoral:'Cresceu vendo o turismo trazer empregos e, ao mesmo tempo, expulsar moradores antigos',pequena:'Cresceu acompanhando a seca, a falta de médicos e o vaivém dos mesmos sobrenomes na prefeitura'};
const BIO_MOT={seguranca:'depois que um vizinho morreu num assalto',saude:'depois de ver a mãe esperar meses por uma cirurgia',educacao:'depois do fechamento da escola onde estudou',transporte:'cansado(a) das três horas diárias dentro de ônibus lotados',emprego:'depois que o desemprego atingiu metade da família',custo:'quando a conta de luz dobrou na casa dos pais',corrupcao:'depois de um escândalo de desvio na merenda da cidade',ambiente:'depois da contaminação do rio onde aprendeu a nadar',costumes:'em meio aos debates acalorados da sua comunidade',impostos:'depois de ver o comércio da família fechar por causa dos impostos',moradia:'depois do despejo de famílias amigas'};
function makeOrigin(){
  const R=rng('bio'+S.seed), r=a=>a[Math.floor(R()*a.length)], c=CITIES[S.city], t=cityType(S.city);
  return {pais:r(BIO_PAIS[S.arch]),inf:BIO_INF[t],form:BIO_FORM[S.arch],mot:null,birth:S.year-25};
}
function lowerFirst(t){ return t?t.charAt(0).toLowerCase()+t.slice(1):t; }
function bioParagraphs(){
  const g=t=>genderize(t), B=S.bio||{}, c=CITIES[S.city], P=PARTIES;
  if(!B.mot&&S.world){ B.mot=BIO_MOT[hotIssues()[0]]; }
  const ps=[];
  ps.push({h:'Origem',t:g(`${S.nome} nasceu em ${B.birth||S.year-S.age} em ${c.n}${c.sigla?' ('+c.sigla+')':''}, ${B.pais||'de família simples'}. ${B.inf||''}. ${B.form||''}.`)});
  const first=S.career[0]||null, filiacao=(S.log.find(l=>/se filia ao/.test(l.t))||{});
  ps.push({h:'Entrada na política',t:g(`Aos 25 anos filiou-se ao ${P[(S.partyHist&&S.partyHist[0])||S.party]?P[(S.partyHist&&S.partyHist[0])||S.party].sig:P[S.party].sig}. Decidiu entrar na política ${B.mot||'para mudar a própria cidade'}. ${S.nemesis?`Logo de cara encontrou um adversário que marcaria sua trajetória: ${S.nemesis.name}.`:''}`)});
  // trajetória eleitoral, intercalada com as decisões mais marcantes
  const els=S.elections.slice(), logs=S.bioLog||[]; let lastTick=-1, traj=[];
  const K=l=>l.y*4+l.q;
  const strong=(from,to)=>logs.filter(l=>K(l)>from&&K(l)<=to&&l.mag>=4).sort((a,b)=>b.mag-a.mag).slice(0,2).sort((a,b)=>a.tick-b.tick);
  const dec=l=>`em ${l.y}, diante de “${l.t.replace(/\.$/,'')}”, ${l.ok?'decidiu':'tentou'} ${lowerFirst(l.l).replace(/\.$/,'')}${l.ok?'':', sem sucesso'}`;
  for(const e of els){
    const eTick=e.y*4+3;
    const ds=strong(lastTick,eTick); if(ds.length) traj.push(g(`Nesse período, ${ds.map(dec).join('; e ')}.`));
    traj.push(g(e.win?`Em ${e.y}, elegeu-se ${OFF[e.off][S.gen].toLowerCase()==='presidente da república'?'Presidente da República':OFF[e.off][S.gen].toLowerCase()} ${e.off==='pres'?'':(e.off==='ver'||e.off==='pref'?'de '+c.n:'por '+c.uf)} pelo ${e.party}, com ${e.desc}.`:`Em ${e.y}, disputou o cargo de ${OFF[e.off][S.gen].toLowerCase()} pelo ${e.party} e perdeu, com ${e.desc}.`));
    lastTick=eTick;
  }
  const tail=strong(lastTick,S.year*4+S.q+1); if(tail.length) traj.push(g(`Mais recentemente, ${tail.map(dec).join('; e ')}.`));
  if(!traj.length) traj.push(g(`Ainda não disputou nenhuma eleição. ${(S.bioLog||[]).length?`Até aqui, ${dec(S.bioLog.slice().sort((a,b)=>b.mag-a.mag)[0])}.`:'A primeira campanha está por vir.'}`));
  ps.push({h:'Trajetória',t:traj.join(' ')});
  // marcas: obras, promessas, partidos, escândalos
  const marks=[];
  const inaug=S.log.filter(l=>/^INAUGURADA:/.test(l.t)).map(l=>l.t.replace('INAUGURADA: ','').replace(/\.$/,''));
  if(inaug.length) marks.push(`Inaugurou ${inaug.slice(-3).join(', ')}`);
  const kept=S.log.filter(l=>/^Promessa cumprida/.test(l.t)).length, broken=S.log.filter(l=>/^Promessa descumprida/.test(l.t)).length;
  if(kept||broken) marks.push(`${kept?`cumpriu ${kept} ${kept===1?'promessa':'promessas'}`:''}${kept&&broken?' e ':''}${broken?`deixou ${broken} ${broken===1?'promessa':'promessas'} pelo caminho`:''}`);
  const sw=S.log.filter(l=>/^Deixou o /.test(l.t)).map(l=>l.t.replace(/\.$/,''));
  if(sw.length) marks.push(`trocou de partido ${sw.length} ${sw.length===1?'vez':'vezes'} (${lowerFirst(sw[sw.length-1])})`);
  const sk=['caixa2','rachadinha','licitacao','lobista','arlindo','relator','emendaPix','compraVotos','delegado'].filter(F).length;
  if(sk) marks.push(`carrega ${sk} ${sk===1?'episódio nebuloso que ainda pode':'episódios nebulosos que ainda podem'} virar investigação`);
  if(marks.length) ps.push({h:'Marcas',t:g(lowerFirst(marks.join('; ')).replace(/^./,x=>x.toUpperCase())+'.')});
  // estilo
  const T=S.attTotal||{}; const segs=Object.keys(SEG).map(k=>[k,T['seg:'+k]||0]).sort((a,b)=>b[1]-a[1]);
  const fav=segs.filter(x=>x[1]>2).slice(0,2).map(x=>SEG[x[0]].n.toLowerCase());
  const etUp=logs.filter(l=>l.et>0).length, etDn=logs.filter(l=>l.et<0||l.rj>0).length;
  const style=[];
  if(fav.length) style.push(`Construiu sua base entre ${fav.join(' e ')}`);
  if(logs.length>=6) style.push(etUp>etDn*1.5?'tem fama de correto(a), mesmo quando isso custa votos':etDn>etUp*1.5?'é visto(a) como pragmático(a), disposto(a) a acordos que a imprensa critica':'alterna gestos de rigor ético com concessões aos bastidores');
  if(S.nemesis&&(S.nemesis.grudge||0)>=2) style.push(`mantém uma rivalidade feroz com ${S.nemesis.name}`);
  if(S.allies.length) style.push(`conta com aliados como ${S.allies.slice().sort((a,b)=>b.pow-a.pow).slice(0,2).map(a=>a.name).join(' e ')}`);
  if(style.length) ps.push({h:'Estilo político',t:g(style.join('; ')+'.')});
  // hoje
  const L=areaList(), ab=L.filter(a=>a.zone==='aband').sort((a,b)=>b.imp-a.imp)[0];
  const best=Object.keys(SEG_SIZE[jurKey()]).sort((a,b)=>segAP(b)-segAP(a))[0];
  ps.push({h:'Hoje',t:g(`Aos ${S.age} anos, ${S.office==='none'?`está sem mandato, filiado(a) ao ${P[S.party].sig}`:`é ${oname(S.office).toLowerCase()==='presidente da república'?'Presidente da República':oname(S.office).toLowerCase()} ${S.office==='pres'?'':'de '+placeName(S.office)} pelo ${P[S.party].sig}, com mandato até ${S.officeEnds}`}. Tem ${Math.round(AP())}% de aprovação, mais forte entre ${SEG[best].n.toLowerCase()} (${Math.round(segAP(best))}%).${ab?` Seu ponto fraco hoje: ${ab.n.toLowerCase()}.`:''}`)});
  return ps;
}
