// ================= v5: RIVAIS VIVOS, PROMESSAS, OBRAS, EFEITOS ATRASADOS, ATENÇÃO =================
const OBRAS_P=[{n:'a creche do bairro',seg:'per',iss:'educacao'},{n:'o posto de saúde 24 horas',seg:'idosos',iss:'saude'},{n:'a quadra coberta da escola',seg:'jovens',iss:'educacao'},{n:'o asfalto da avenida principal',seg:'media',iss:'transporte'},{n:'uma nova linha de ônibus',seg:'per',iss:'transporte'},{n:'a iluminação da praça',seg:'media',iss:'seguranca'},{n:'o centro de convivência para idosos',seg:'idosos',iss:'saude'},{n:'a escola técnica',seg:'jovens',iss:'emprego'},{n:'a estrada vicinal até os sítios',seg:'agro',iss:'transporte'},{n:'o reajuste prometido aos professores',seg:'serv',iss:'educacao'},{n:'a reforma do templo histórico',seg:'evang',iss:'costumes'},{n:'o polo de empresas com isenção',seg:'elite',iss:'emprego'}];
const OBRAS_G=[{n:'o novo hospital regional',seg:'idosos',iss:'saude'},{n:'a linha de metrô',seg:'per',iss:'transporte'},{n:'o anel viário',seg:'media',iss:'transporte'},{n:'o programa de 5 mil casas populares',seg:'per',iss:'moradia'},{n:'a estação de tratamento de esgoto',seg:'media',iss:'ambiente'},{n:'as 40 escolas em tempo integral',seg:'serv',iss:'educacao'},{n:'o porto seco para o agro',seg:'agro',iss:'emprego'},{n:'o batalhão e as câmeras de segurança',seg:'media',iss:'seguranca'},{n:'o parque tecnológico',seg:'jovens',iss:'emprego'}];
const OBRAS_E=[{n:'a reforma da UBS',seg:'idosos',iss:'saude'},{n:'o asfalto de três ruas',seg:'per',iss:'transporte'},{n:'a quadra poliesportiva',seg:'jovens',iss:'educacao'},{n:'a ponte da zona rural',seg:'agro',iss:'transporte'},{n:'as câmeras no centro',seg:'media',iss:'seguranca'},{n:'o centro de referência para mulheres',seg:'per',iss:'seguranca'}];

// ---------- gerações novas de decisões ----------
GENS.promessa={th:'ruas',w:1.3,ok:()=>S.promises.filter(p=>!p.done).length<3,prm:()=>({o:Math.floor(rnd()*OBRAS_P.length)}),build:p=>{const o=OBRAS_P[p.o], yr=S.year+1+Math.floor(rnd()*2); return {id:'_g_promessa',scene:'comicio',tag:'Pedido · '+SEG[o.seg].n,t:`Pedem ${o.n}`,txt:`Uma comissão de ${segIn(o.seg)} entregou um abaixo-assinado: querem ${o.n}. Esperam um compromisso seu, com data.`,ch:[
  {l:`Prometer entregar até ${yr}`,fx:{['s:'+o.seg]:4,cp:1},promise:{n:o.n,seg:o.seg,iss:o.iss,yr},r:'A promessa foi aplaudida. Agora ela tem prazo.'},
  {l:'Dizer que vai estudar o caso',fx:{['s:'+o.seg]:-1,cp:1},r:'A comissão saiu desconfiada.'},
  {l:'Explicar que não há dinheiro',fx:{et:1,['s:'+o.seg]:-3},r:'A franqueza foi respeitada por poucos.'}]}}};
GENS.obra={th:'gabinete',w:1.4,ok:()=>OFF[S.office].type==='exec'&&S.obras.length<3,prm:()=>({o:Math.floor(rnd()*OBRAS_G.length)}),build:p=>{const o=OBRAS_G[p.o]; return {id:'_g_obra',scene:HOUSE_SCENE[S.office],tag:'Obras',t:`Projeto: ${o.n}`,txt:`Os técnicos apresentaram o projeto de ${o.n}. Pode virar a marca do seu governo, se ficar pronto a tempo.`,ch:[
  {l:'Começar já, com dinheiro do caixa',fx:{f:-5,['o:'+o.iss]:2},obra:{n:o.n,seg:o.seg,iss:o.iss,dur:5+Math.floor(rnd()*3)},r:'As máquinas chegaram ao canteiro.'},
  {l:'Fazer em parceria com uma empresa',fx:{f:-1,rj:2,'s:elite':2},obra:{n:o.n,seg:o.seg,iss:o.iss,dur:7+Math.floor(rnd()*4)},r:'O contrato foi assinado. A obra vai demorar mais.'},
  {l:'Arquivar o projeto',fx:{f:2,['s:'+o.seg]:-2},r:'O projeto voltou para a gaveta.'}]}}};
GENS.emenda_obra={th:'gabinete',w:1.2,ok:()=>OFF[S.office].type==='leg'&&S.obras.length<3,prm:()=>({o:Math.floor(rnd()*OBRAS_E.length)}),build:p=>{const o=OBRAS_E[p.o]; return {id:'_g_emendaobra',scene:'camara',tag:'Emendas',t:`Sua emenda pode virar ${o.n}`,txt:`Você tem uma emenda para destinar. Lideranças de ${segIn(o.seg)} pedem ${o.n}.`,ch:[
  {l:`Destinar a emenda para ${o.n}`,fx:{['s:'+o.seg]:1,ip:-1},obra:{n:o.n,seg:o.seg,iss:o.iss,dur:3+Math.floor(rnd()*3)},r:'A emenda foi empenhada. Agora é esperar a obra.'},
  {l:'Mandar para a prefeitura aliada',fx:{ip:3,et:-1},r:'O prefeito aliado agradeceu.'},
  {l:'Guardar a emenda para negociar votos',fx:{cp:2,['s:'+o.seg]:-2},r:'Você guardou uma ficha para o momento certo.'}]}}};
{ const old=GENS.protesto.build; GENS.protesto.build=p=>{ const ev=old(p); const i=topCare(p.s), o=OBRAS_P.find(x=>x.seg===p.s)||OBRAS_P[0]; ev.ch[0]=Object.assign({},ev.ch[0],{l:`Receber as lideranças e prometer ${o.n}`,promise:{n:o.n,seg:o.seg,iss:o.iss,yr:S.year+1+Math.floor(rnd()*2)}}); return ev; }; }

// ---------- efeitos atrasados ----------
function splitFx(fx){
  const now={}, later={}; let any=false;
  for(const k in fx){ const v=fx[k];
    if(k==='$'||k.startsWith('h:')||k==='camp'||Math.abs(v)<2){ now[k]=v; continue; }
    now[k]=v*0.65; later[k]=v*0.35; any=true; }
  return [now, any?later:null];
}

// ---------- promessas e obras ----------
function addPromise(p){ const due=(p.yr-S.year)*4+(4-S.q)+S.tick; S.promises.push({id:'p'+S.tick+'_'+Math.floor(rnd()*999),n:p.n,seg:p.seg,iss:p.iss,yr:p.yr,due,done:false}); log(`Promessa feita: ${p.n} até ${p.yr}.`); }
function promiseCost(){ return OFF[S.office].type==='exec'?{f:-4,$:-3}:{$:-12}; }
function fulfillPromise(id){
  const p=S.promises.find(x=>x.id===id); if(!p||p.done) return;
  const c=promiseCost(), need=-(c.$||0)*sc(); if(S.money<need) return toast('Caixa insuficiente para cumprir a promessa.',null,true);
  const out=applyFx(Object.assign({},c,{['s:'+p.seg]:6,['o:'+p.iss]:5,et:2}));
  p.done=true; noteAttention(out); log(`Promessa cumprida: ${p.n}.`,'elec'); (S.qNews=S.qNews||[]).push({t:`Promessa cumprida: ${p.n}`,r:`${S.nome} entregou o que prometeu.`,sc:8});
  SFX.win(); toast(`Promessa cumprida: ${p.n}.`,out); save(); renderGame();
}
function addObra(o){ S.obras.push({id:'o'+S.tick+'_'+Math.floor(rnd()*999),n:o.n,seg:o.seg,iss:o.iss,dur:o.dur,prog:0,office:S.office,start:S.tick,acc:-1}); log(`Obra iniciada: ${o.n} (previsão de ${o.dur} trimestres).`); }
function obraAccCost(){ return Math.round(6*sc()); }
function accelerateObra(id){
  const o=S.obras.find(x=>x.id===id); if(!o||o.acc===S.tick) return; const c=obraAccCost(); if(S.money<c) return toast('Caixa insuficiente para acelerar.',null,true);
  S.money-=c; o.prog+=1.5; o.acc=S.tick; SFX.coin(); toast(`Obra acelerada: ${o.n}.`); save(); renderGame();
}
function obraETA(o){ const rate=OFF[S.office].type==='exec'?(S.stats.f>=40?0.85:0.45):0.85; return Math.max(0,Math.ceil((o.dur-o.prog)/rate)); }

// ---------- rivais com vida própria ----------
function initRivals(){ S.nemesis.lvl=0; S.nemesis.office='none'; S.rivals=[0,1].map(()=>Object.assign(npc({prof:pick(PROFILES).k}),{elo:-1,lvl:0,office:'none'})); }
function rivalList(){ return [S.nemesis].concat(S.rivals||[]).filter(Boolean); }
function rivalsStep(){
  const news=t=>{ (S.qNews=S.qNews||[]).push({t,r:'',sc:3,rival:true}); };
  for(const r of rivalList()){
    if(rnd()<.14){ const x=rnd();
      if(x<.3){ r.elo=(r.elo||0)-1.5; news(`Escândalo atinge ${r.name}: ${genderize(pick(ESCAND),r.gen)}`); }
      else if(x<.5){ const np=pick(Object.keys(PARTIES).filter(k=>k!==r.party)); news(`${r.name} deixa o ${PARTIES[r.party].sig} e vai para o ${PARTIES[np].sig}`); r.party=np; }
      else if(x<.8){ r.elo=(r.elo||0)+1; news(`${r.name} ganha o apoio de ${pick(['lideranças evangélicas','grandes empresários','centrais sindicais','prefeitos do interior','influenciadores'])}`); }
      else if(r===S.nemesis&&(r.grudge||0)>=1){ r.grudge--; applyFx({am:-1.5,rj:1.5},{passive:true}); news(`${r.name} distribui dossiê contra ${S.nome}`); log(`${r.name} espalhou um dossiê contra você.`,'bad'); }
    }
  }
  if(S.q===4&&elecType(S.year)){ const t=elecType(S.year);
    for(const r of rivalList()){ const cands=ORDER.filter(k=>OFF[k].el===t&&OFF[k].lvl>(r.lvl||0)&&OFF[k].lvl<=(r.lvl||0)+2&&!(S.office===k&&S.elections.some(e=>e.y===S.year&&e.off===k&&e.win)));
      if(!cands.length) continue; const k=cands[0]; if(rnd()<0.42+(r.elo||0)*0.05){ r.lvl=OFF[k].lvl; r.office=k; news(`${r.name} é ${genderize(k==='pres'?'eleito(a) presidente':'eleito(a) '+OFF[k][r.gen].toLowerCase(),r.gen)}`); } }
  }
}

// ---------- atenção ----------
const AREA_INST={partido:'Partido',plenario:'Articulação no plenário',imagem:'Imagem e ética',justica:'Defesa jurídica',caixa:'Caixa político',contas:'Contas públicas',aliados:'Aliados',carreira:'Capital político'};
function noteAttention(out,extra){
  const A=S.att=S.att||{}, T=S.attTotal=S.attTotal||{}; const add=(id,m)=>{ if(m<=0) return; A[id]=(A[id]||0)+m; T[id]=(T[id]||0)+m; S.lastAtt[id]=S.tick; };
  for(const k in out){ const v=out[k]; if(!v) continue;
    if(k.startsWith('s:')){ if(v>0) add('seg:'+k.slice(2),v); continue; }
    if(k.startsWith('o:')){ if(v>0) add('iss:'+k.slice(2),v); continue; }
    const ci=CLS.indexOf(k); if(ci>=0){ if(v>0) for(const sg in SEG) add('seg:'+sg,v*SEG[sg].mix[ci]*1.35); continue; }
    if(k==='pt'&&v>0) add('inst:partido',v); if(k==='ip'&&v>0) add('inst:plenario',v); if(k==='et'&&v>0) add('inst:imagem',v); if(k==='rj'&&v<0) add('inst:justica',-v);
    if(k==='$'&&v>0) add('inst:caixa',v/sc()/2.5); if(k==='f'&&v>0) add('inst:contas',v); if(k==='cp'&&v>0) add('inst:carreira',v);
  }
  if(extra==='ally') add('inst:aliados',4);
}
function attWindow(id){ let t=(S.att&&S.att[id])||0; for(const q of S.attLog||[]) t+=q[id]||0; return t; }
function quartersSince(id){ const l=S.lastAtt[id]; return l==null?null:Math.floor((S.tick-l)/1); }
function areaList(){
  const sz=SEG_SIZE[jurKey()], mx=Math.max(...Object.values(sz)), ex=OFF[S.office].type==='exec', st=S.stats;
  const L=[];
  for(const k in sz){ const ap=segAP(k); L.push({id:'seg:'+k,fam:'seg',n:SEG[k].n,short:SEG[k].n.split(' ')[0],imp:clamp(0.5*sz[k]/mx+0.5*clamp((62-ap)/45,0,1),0,1),val:Math.round(ap)+'%',why:`${Math.round(sz[k]*100)}% do eleitorado, aprovação de ${Math.round(ap)}%`}); }
  for(const i of hotIssues().slice(0,6)){ const h=S.world.heat[i],o=S.world.own[i]; L.push({id:'iss:'+i,fam:'iss',n:ISS[i].n,short:ISS[i].n,imp:clamp(h/100*0.75+(o<40?0.25:0),0,1),val:'temp. '+Math.round(h),why:`temperatura ${Math.round(h)}, sua credibilidade ${Math.round(o)}`}); }
  const avgLoy=S.allies.length?S.allies.reduce((a,x)=>a+x.loy,0)/S.allies.length:50;
  const inst=[['partido',clamp((68-st.pt)/50,0.1,1),Math.round(st.pt),`relação com o partido em ${Math.round(st.pt)}`],
    ['plenario',S.office==='none'?0.1:clamp((58-st.ip)/45,0.12,1),Math.round(st.ip),`articulação em ${Math.round(st.ip)}`],
    ['imagem',clamp((68-st.et)/45,0.08,1),Math.round(st.et),`ética em ${Math.round(st.et)}`],
    ['justica',clamp(st.rj/60,0.02,1),Math.round(st.rj)+'%',`risco judicial em ${Math.round(st.rj)}%`],
    ['caixa',clamp((45*sc()-S.money)/(45*sc()),0.05,1),'R$ '+fmt(S.money),`caixa de R$ ${fmt(S.money)} mil`],
    ['aliados',S.allies.length?clamp((62-avgLoy)/50,0.1,1):0.1,Math.round(avgLoy),`lealdade média dos aliados em ${Math.round(avgLoy)}`]];
  if(ex) inst.push(['contas',clamp((62-st.f)/45,0.1,1),Math.round(st.f),`saúde fiscal em ${Math.round(st.f)}`]);
  for(const [k,imp,val,why] of inst) L.push({id:'inst:'+k,fam:'inst',n:AREA_INST[k],short:AREA_INST[k].split(' ')[0],imp,val,why});
  let tot=0, timp=0; for(const a of L){ a.raw=attWindow(a.id); tot+=a.raw; timp+=a.imp; }
  const amx=Math.max(1,...L.map(a=>a.raw));
  for(const a of L){ a.since=quartersSince(a.id); a.att=clamp(a.raw/amx,0,1);
    a.attS=tot?a.raw/tot:0; a.impS=a.imp/timp; a.ratio=(a.attS+0.005)/(a.impS+0.005); a.bal=clamp(Math.log2(a.ratio),-2,2);
    if(tot<8) a.zone=a.imp>=0.55?'nd':'irr';
    else a.zone=a.ratio<0.45&&a.imp>=0.4?'aband':a.ratio>2.2&&a.imp<0.5?'exag':a.imp<0.25&&a.ratio<=2.2?'irr':'ok'; }
  L.total=tot; return L;
}
function alertsList(L){
  const out=[];
  L.filter(a=>a.zone==='aband').sort((a,b)=>b.imp-a.imp).slice(0,3).forEach(a=>out.push({z:'aband',t:`${a.n}: ${a.why}. ${a.since==null?'Nenhuma decisão sua beneficiou essa área até agora.':`Sua última decisão a favor foi há ${a.since} ${a.since===1?'trimestre':'trimestres'}.`}`}));
  L.filter(a=>a.zone==='exag').sort((a,b)=>b.att-a.att).slice(0,2).forEach(a=>out.push({z:'exag',t:`${a.n}: recebeu boa parte das suas escolhas recentes, mas já está em boa situação (${a.why}). Cada ganho rende menos ali.`}));
  return out;
}
function zoneOfAreas(fx){ const L=areaList(), Z={}; L.forEach(a=>Z[a.id]=a); const ab=new Set(), sat=new Set();
  for(const k in fx){ const v=fx[k]; if(!v) continue; let ids=[];
    if(k.startsWith('s:')&&v>0) ids=['seg:'+k.slice(2)]; else if(k.startsWith('o:')&&v>0) ids=['iss:'+k.slice(2)];
    else if(CLS.includes(k)&&v>0){ const ci=CLS.indexOf(k); ids=Object.keys(SEG).filter(s=>SEG[s].mix[ci]>=0.5).map(s=>'seg:'+s); }
    else if(k==='pt'&&v>0) ids=['inst:partido']; else if(k==='ip'&&v>0) ids=['inst:plenario']; else if(k==='et'&&v>0) ids=['inst:imagem']; else if(k==='rj'&&v<0) ids=['inst:justica']; else if(k==='$'&&v>0) ids=['inst:caixa']; else if(k==='f'&&v>0) ids=['inst:contas'];
    ids.forEach(id=>{ const a=Z[id]; if(!a) return; if(a.zone==='aband') ab.add(a.n); else if(a.zone==='exag') sat.add(a.n); }); }
  return {ab:[...ab],sat:[...sat]};
}

// ---------- histórico e ganchos do trimestre ----------
function pushHist(){ S.hist=S.hist||[]; S.hist.push({q:S.q,y:S.year,ap:AP(),cp:S.stats.cp,et:S.stats.et,rj:S.stats.rj,ip:S.stats.ip,money:S.money}); if(S.hist.length>24) S.hist.shift(); }
function quarterHooks(){
  S.attLog=S.attLog||[]; S.attLog.push(S.att||{}); if(S.attLog.length>7) S.attLog.shift(); S.att={};
  for(const p of S.pending.slice()){ if(p.due<=S.tick){ const out=applyFx(p.fx,{passive:true}); noteAttention(out); S.pending=S.pending.filter(x=>x!==p); log(`Repercussão tardia: ${p.src}.`); } }
  for(const p of S.promises){ if(!p.done&&!p.failed&&S.tick>=p.due){ p.failed=true; applyFx({['s:'+p.seg]:-7,et:-3,['o:'+p.iss]:-4},{passive:true}); log(`Promessa descumprida: ${p.n}.`,'bad'); (S.qNews=S.qNews||[]).push({t:`${S.nome} não cumpre promessa`,r:`Prometeu ${p.n} até ${p.yr} e não entregou.`,sc:7}); } }
  S.promises=S.promises.filter(p=>!(p.done||p.failed)||S.tick-p.due<8);
  for(const o of S.obras.slice()){
    if(o.office!==S.office){ S.obras=S.obras.filter(x=>x!==o); log(`Você deixou o cargo antes de terminar ${o.n}. Quem vier depois vai inaugurar.`,'bad'); continue; }
    if(rnd()<.15){ log(`A obra de ${o.n} parou por um trimestre.`,'bad'); continue; }
    o.prog+=OFF[S.office].type==='exec'?(S.stats.f>=40?1:0.5):1;
    if(o.prog>=o.dur){ const out=applyFx({['s:'+o.seg]:8,['o:'+o.iss]:9,ap:2,cp:2},{passive:true}); noteAttention(out); S.obras=S.obras.filter(x=>x!==o); log(`INAUGURADA: ${o.n}.`,'elec'); (S.qNews=S.qNews||[]).push({t:`${S.nome} inaugura ${o.n}`,r:'Banda, fita e discurso: a obra finalmente ficou pronta.',sc:9}); }
  }
  rivalsStep(); govsStep();
}

// ---------- migração de saves ----------
