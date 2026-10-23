// ================= v7: PAUTAS LOCAIS, GOVERNOS EM EXERCÍCIO, CARREIRAS SALVAS =================
// ---------- pautas próprias de cada tipo de cidade ----------
Object.assign(ISS,{
 turismo:{n:'Turismo',ev:['A temporada teve a pior ocupação dos hotéis em anos {L}','Moradores reclamam de lixo e barulho de turistas {L}','Um navio de cruzeiro com 4 mil turistas cancelou a escala {L}'],
  st:[{l:'Defender investimento pesado em turismo e eventos',fx:{'o:turismo':8,'s:elite':3,'s:jovens':2,'s:per':-1}},{l:'Defender limites ao turismo para proteger os moradores',fx:{'o:turismo':5,'s:per':3,'s:idosos':2,'s:elite':-3}},{l:'Evitar o tema',fx:{'o:turismo':-5}}]},
 campo:{n:'Agronegócio',ev:['A safra recorde não tem estrada para escoar {L}','Produtores protestam contra os juros do crédito rural {L}','Um conflito por terra ameaça virar tragédia {L}'],
  st:[{l:'Defender crédito, estradas e menos burocracia para o agro',fx:{'o:campo':8,'s:agro':5,'s:elite':2,'s:jovens':-2}},{l:'Defender a agricultura familiar e a reforma agrária',fx:{'o:campo':6,'s:per':3,'s:serv':2,'s:agro':-4}},{l:'Evitar o tema',fx:{'o:campo':-5,'s:agro':-2}}]},
 industria:{n:'Indústria',ev:['Uma montadora ameaça fechar a fábrica {L}','O distrito industrial perdeu 3 mil vagas em um ano {L}','A conta de energia está expulsando indústrias {L}'],
  st:[{l:'Defender incentivos fiscais para manter as fábricas',fx:{'o:industria':8,'s:elite':3,'s:per':2,f:-2}},{l:'Defender qualificação e garantia de emprego',fx:{'o:industria':6,'s:per':3,'s:serv':2,'s:elite':-2}},{l:'Evitar o tema',fx:{'o:industria':-5}}]},
 agua:{n:'Água e seca',ev:['A barragem que abastece a região está com 8% da capacidade {L}','Os caminhões-pipa não dão conta da seca {L}','Moradores ficam dez dias sem água na torneira {L}'],
  st:[{l:'Cobrar adutoras e cisternas já',fx:{'o:agua':8,'s:per':3,'s:agro':3,'s:idosos':2}},{l:'Defender grandes obras hídricas',fx:{'o:agua':6,'s:agro':4,'s:elite':1,f:-1}},{l:'Evitar o tema',fx:{'o:agua':-6,'s:agro':-2}}]},
});
for(const k of ['turismo','campo','industria','agua']) if(!ISS_KEYS.includes(k)) ISS_KEYS.push(k);
Object.assign(SEG.media.care,{turismo:.1}); Object.assign(SEG.elite.care,{turismo:.15,industria:.2}); Object.assign(SEG.per.care,{industria:.1,agua:.1});
Object.assign(SEG.jovens.care,{turismo:.1,industria:.1}); Object.assign(SEG.agro.care,{campo:.4,agua:.25}); Object.assign(SEG.idosos.care,{agua:.1});
Object.assign(ISS_CRISE,{turismo:'Um arrastão na praia principal afugentou os turistas no feriado',campo:'Uma ponte caiu e isolou a produção de milhares de agricultores',industria:'A maior fábrica da região anunciou que vai fechar as portas',agua:'A cidade entrou no décimo dia de racionamento de água'});
Object.assign(SCENE_ISS,{turismo:'comicio',campo:'campo',industria:'fabrica',agua:'fumaca'});
Object.assign(BIO_MOT,{turismo:'depois de ver a família perder a pousada numa temporada ruim',campo:'depois de ver o sítio dos avós sem estrada para escoar a colheita',industria:'depois que a fábrica onde o pai trabalhou por 20 anos fechou',agua:'depois de crescer contando os dias de chegada do caminhão-pipa'});
OBRAS_P.push({n:'o novo calçadão da orla',seg:'elite',iss:'turismo'},{n:'as cisternas para a zona rural',seg:'agro',iss:'agua'},{n:'o asfalto da estrada da safra',seg:'agro',iss:'campo'},{n:'o centro de qualificação industrial',seg:'per',iss:'industria'});
OBRAS_G.push({n:'o centro de convenções',seg:'elite',iss:'turismo'},{n:'a adutora regional',seg:'agro',iss:'agua'},{n:'a ferrovia de escoamento da safra',seg:'agro',iss:'campo'},{n:'o novo distrito industrial',seg:'per',iss:'industria'});
BILLS.mun.push({n:'taxa de turismo para visitantes',iss:'turismo',pro:['per','idosos'],con:['elite']},{n:'isenção de IPTU para novas indústrias',iss:'industria',pro:['elite'],con:['serv']});
BILLS.est.push({n:'programa estadual de cisternas',iss:'agua',pro:['agro','per'],con:[]},{n:'incentivo fiscal para indústrias',iss:'industria',pro:['elite','per'],con:['serv']},{n:'fundo estadual de turismo',iss:'turismo',pro:['elite','jovens'],con:['serv']});
BILLS.fed.push({n:'novo Plano Safra',iss:'campo',pro:['agro','elite'],con:['serv']},{n:'política nacional de reindustrialização',iss:'industria',pro:['per','elite'],con:[]});
{ const ob=GENS.crise.build; GENS.crise.build=p=>{ const ev=ob(p); if(!ev.txt) ev.txt=ISS_CRISE[p.i]||'Uma crise estourou no seu governo.'; return ev; }; }
const TOUR_CAPS=['Rio de Janeiro','Salvador','Fortaleza','Recife','Natal','Maceió','João Pessoa','Florianópolis','Aracaju','São Luís'];
function localHeat(key){
  const c=CITIES[key], t=c.type||'polo', ne=c.reg==='Nordeste', base=Object.assign({},HEAT_BASE[{capital:'guanabara',polo:'colinas',pequena:'sertao',agro:'agro',litoral:'litoral'}[t]]);
  const x={capital:{turismo:TOUR_CAPS.includes(c.n)?62:30,industria:30,campo:12,agua:ne?40:18},polo:{industria:64,turismo:22,campo:20,agua:ne?42:15},agro:{campo:74,agua:ne||c.reg==='Centro-Oeste'?46:22,industria:34,turismo:12},litoral:{turismo:74,industria:12,campo:14,agua:ne?38:16},pequena:{agua:ne?70:28,campo:52,industria:14,turismo:/Ouro Preto|Diamantina|Parintins/.test(c.n)?55:12}}[t];
  return Object.assign(base,x);
}
for(const k of CITY_KEYS) HEAT_BASE[k]=localHeat(k);
function setStateHeat(){ if(!S) return; const c=CITIES[S.city], r=c.reg;
  HEAT_BASE.estado=Object.assign({},HEAT_BASE.estado,{turismo:['Rio de Janeiro','Bahia','Ceará','Pernambuco','Rio Grande do Norte','Alagoas','Santa Catarina'].includes(c.uf)?48:22,campo:{'Centro-Oeste':68,Sul:52,Norte:42,Nordeste:40,Sudeste:38}[r],industria:{Sudeste:52,Sul:50}[r]||28,agua:r==='Nordeste'?58:18});
  HEAT_BASE.brasil=Object.assign({},HEAT_BASE.brasil,{turismo:22,campo:44,industria:44,agua:30}); }

// ---------- governos em exercício ----------
const GOV_LV={mun:{off:'pref',t:'Prefeitura',el:0},est:{off:'gov',t:'Governo do estado',el:2},fed:{off:'pres',t:'Governo federal',el:2}};
function govPlace(lv){ return lv==='mun'?CITIES[S.city].n:lv==='est'?CITIES[S.city].uf:'Brasil'; }
function govTitle(lv){ return lv==='mun'?'Prefeitura de '+govPlace(lv):lv==='est'?'Governo de '+govPlace(lv):'Governo federal'; }
function wParty(){ const ks=Object.keys(PARTIES); let r=rnd()*100; for(const k of ks){ r-=PARTIES[k].seats; if(r<=0) return k; } return ks[0]; }
function newGovNPC(lv,since,party){ const p=npc({party:party||wParty(),prof:pick(['dinastia','tecnico','empresario','populista','sindical','policial'])}); const sat={}; ISS_KEYS.forEach(i=>sat[i]=clamp(48+randn()*12,12,85)); return Object.assign(p,{lv,since,terms:1,me:false,sat,hist:[]}); }
function govAP(g){ if(!g) return 0; const w=S.world.heat; let t=0,s=0; for(const i of ISS_KEYS){ t+=w[i]*g.sat[i]; s+=w[i]; } return clamp(t/s+(g.me?0:randn()*0),0,100); }
function initGovs(){
  S.govs={};
  for(const lv in GOV_LV){ const first=lv==='mun'?2025:2027; const g=newGovNPC(lv,first); g.past=[];
    let to=first; for(let j=0;j<2;j++){ const pp=npc({party:wParty(),prof:pick(PROFILES).k}); const from=to-4*(rnd()<.45?2:1); g.past.unshift({name:pp.name,gen:pp.gen,seed:pp.seed,party:pp.party,from,to:to-1,ap:Math.round(clamp(42+randn()*14,12,80))}); to=from; }
    S.govs[lv]=g; g.hist=[govAP(g)]; }
}
function jurLevel(){ const j=jurKey(); return j==='brasil'?'fed':j==='estado'?'est':'mun'; }
function govPressure(i){ if(!S||!S.govs) return 0; const g=S.govs[jurLevel()]; if(!g||g.sat[i]==null) return 0; return (50-g.sat[i])*0.3; }
function govsStep(){
  if(!S.govs) return; const news=(t,r)=>(S.qNews=S.qNews||[]).push({t,r:r||'',sc:4});
  for(const lv in S.govs){ let g=S.govs[lv]; const off=GOV_LV[lv].off;
    if(S.office===off&&!g.me){ g.past.push({name:g.name,gen:g.gen,seed:g.seed,party:g.party,from:g.since,to:S.year,ap:Math.round(govAP(g))}); g=S.govs[lv]=Object.assign({},g,{me:true,name:S.nome,gen:S.gen,seed:S.seed,party:S.party,since:S.year+ (S.q===4?1:0),terms:1,hist:[]}); }
    else if(g.me&&S.office!==off){ g.past.push({name:S.nome,gen:S.gen,seed:S.seed,party:S.party,from:g.since,to:S.year,ap:Math.round(govAP(g)),me:true}); const r=rivalList().find(x=>x.office===off); const n=r?Object.assign(newGovNPC(lv,S.year+1,r.party),{name:r.name,gen:r.gen,seed:r.seed}):newGovNPC(lv,S.year+1); n.past=g.past; S.govs[lv]=g=n; news(`${g.name} assume ${govTitle(lv).toLowerCase()}`); }
    if(g.me){ ISS_KEYS.forEach(i=>g.sat[i]=clamp(0.7*S.world.own[i]+0.3*S.stats.f,0,100)); g.party=S.party; }
    else { ISS_KEYS.forEach(i=>{ g.sat[i]=clamp(g.sat[i]+(50-g.sat[i])*0.03+randn()*2.4-(S.world.shock&&S.world.heat[i]>65?1.5:0),5,95); });
      if(S.q===4&&S.year%4===GOV_LV[lv].el&&S.year>=g.since+3){ const ap=govAP(g);
        if(g.terms<2&&ap>=44){ g.terms++; g.since=S.year+1; news(`${g.name} é reeleito(a) ${lv==='mun'?'prefeito(a)':lv==='est'?'governador(a)':'presidente'} com ${Math.round(ap)}% de aprovação`); }
        else { g.past.push({name:g.name,gen:g.gen,seed:g.seed,party:g.party,from:g.since,to:S.year,ap:Math.round(ap)}); const r=rivalList().find(x=>x.office===off); const n=r?Object.assign(newGovNPC(lv,S.year+1,r.party),{name:r.name,gen:r.gen,seed:r.seed}):newGovNPC(lv,S.year+1); n.past=g.past; S.govs[lv]=g=n; news(`${g.name} vence e vai comandar ${govTitle(lv).toLowerCase()}`); } } }
    g.past=g.past.slice(-6); g.hist=(g.hist||[]).concat([govAP(g)]).slice(-12);
  }
}
function govWorst(g,n){ const H=S.world.heat; return ISS_KEYS.filter(i=>H[i]>=25).sort((a,b)=>g.sat[a]-g.sat[b]).slice(0,n||3); }
function govBest(g,n){ const H=S.world.heat; return ISS_KEYS.filter(i=>H[i]>=25).sort((a,b)=>g.sat[b]-g.sat[a]).slice(0,n||2); }
GENS.oposicao={th:'imprensa',w:1.5,ok:()=>S.govs&&!S.govs[jurLevel()].me,prm:()=>{ const g=S.govs[jurLevel()]; return {lv:jurLevel(),i:pick(govWorst(g,2))}; },build:p=>{ const g=S.govs[p.lv], I=ISS[p.i], same=g.party===S.party, care=Object.keys(SEG).filter(k=>SEG[k].care[p.i]).slice(0,2);
  return {id:'_g_oposicao',scene:SCENE_ISS[p.i],who:g,tag:govTitle(p.lv),t:`Só ${Math.round(g.sat[p.i])}% aprovam ${I.n.toLowerCase()} no governo de ${g.name}`,txt:`Uma pesquisa mostra que ${I.n.toLowerCase()} é o ponto fraco de ${g.name} (${PARTIES[g.party].sig}). ${same?'O governo é do seu partido.':'É uma chance de ocupar esse espaço.'}`,ch:[
   {l:'Criticar o governo e apresentar uma alternativa',fx:Object.assign({['o:'+p.i]:7,am:2},Object.fromEntries(care.map(k=>['s:'+k,2])),same?{pt:-6}:{ip:-1}),r:'Sua proposta virou referência no tema.'},
   {l:'Cobrar nos bastidores, sem alarde',fx:{ip:2,cp:1,['o:'+p.i]:2},r:'O governo prometeu ajustes.'},
   same?{l:'Defender o governo do seu partido',fx:{pt:5,['o:'+p.i]:-4},r:'A cúpula agradeceu. Os eleitores, nem tanto.'}:{l:'Propor uma parceria com o governo',fx:{ip:3,['o:'+p.i]:3,pt:-1},r:'A parceria saiu e o governo levou parte do crédito.'}]}; }};

// ---------- carreiras salvas ----------
const SLOT_IDX='vossa-slots';
function slotIndex(){
  let idx=[]; try{ idx=JSON.parse(localStorage.getItem(SLOT_IDX)||'[]') }catch(e){ return []; }
  if(!idx.length){ try{ for(const k of ['vossa-excelencia','vossa-excelencia-v4']){ const t=localStorage.getItem(k); if(!t) continue; const o=migrate(JSON.parse(t)); if(o){ o.slot='c'+Date.now().toString(36); const keep=S; S=o; save(); S=keep; localStorage.removeItem(k); idx=JSON.parse(localStorage.getItem(SLOT_IDX)||'[]'); break; } } }catch(e){} }
  return idx;
}
function slotSummary(){ return {id:S.slot,nome:S.nome,gen:S.gen,look:S.look,seed:S.seed,party:S.party,city:S.city,office:S.office,year:S.year,q:S.q,age:S.age,ap:Math.round(AP()),ended:!!S.ended,endT:S.ended?ENDINGS[S.ended.k].t:'',ts:Date.now()}; }
function save(){ if(!S) return; if(!S.slot) S.slot='c'+Date.now().toString(36)+Math.floor(rnd()*99); try{ localStorage.setItem('vossa-save-'+S.slot,JSON.stringify(S)); let idx=[]; try{ idx=JSON.parse(localStorage.getItem(SLOT_IDX)||'[]') }catch(e){} idx=idx.filter(x=>x.id!==S.slot); idx.unshift(slotSummary()); localStorage.setItem(SLOT_IDX,JSON.stringify(idx.slice(0,8))); }catch(e){} }
function load(id){ try{ const idx=slotIndex(); id=id||(idx.find(x=>!x.ended)||{}).id; if(!id) return null; const t=localStorage.getItem('vossa-save-'+id); return t?migrate(JSON.parse(t)):null; }catch(e){ return null; } }
function deleteSlot(id){ try{ localStorage.removeItem('vossa-save-'+id); const idx=slotIndex().filter(x=>x.id!==id); localStorage.setItem(SLOT_IDX,JSON.stringify(idx)); }catch(e){} }
function exportCode(){ const j=JSON.stringify(S); try{ if(window.LZString) return 'VE1:'+LZString.compressToBase64(j); }catch(e){} return 'VE0:'+btoa(unescape(encodeURIComponent(j))); }
function importCode(code){ code=(code||'').trim(); let j=null; try{ if(code.startsWith('VE1:')&&window.LZString) j=LZString.decompressFromBase64(code.slice(4)); else if(code.startsWith('VE0:')) j=decodeURIComponent(escape(atob(code.slice(4)))); }catch(e){ j=null; } if(!j) return null; try{ const o=migrate(JSON.parse(j)); if(o) o.slot='c'+Date.now().toString(36); return o; }catch(e){ return null; } }

// ---------- migração ----------
function migrate(o){
  if(!o) return null; if(o.v>SAVE_VER) return null;
  if(!o.v||o.v<5){
    if(!o.world||!o.seg) return null;
    const st=o.stats; for(const k in SEG){ const m=SEG[k].mix; o.seg[k]=clamp(m[0]*(st.aa??30)+m[1]*(st.am??30)+m[2]*(st.apo??30)+(o.seg[k]||0),0,100); }
    delete st.aa; delete st.am; delete st.apo;
    o.promises=o.promises||[]; o.obras=o.obras||[]; o.pending=o.pending||[]; o.att=o.att||{}; o.attLog=o.attLog||[]; o.lastAtt=o.lastAtt||{}; o.hist=o.hist||[]; o.tut=4;
    if(!o.rivals){ o.nemesis.lvl=o.nemesis.lvl||0; o.nemesis.office=o.nemesis.office||'none'; o.rivals=[]; }
    o.v=5;
  }
  if(o.v<6){ ISS_KEYS.forEach(k=>{ if(o.world.heat[k]==null) o.world.heat[k]=12; if(o.world.own[k]==null) o.world.own[k]=50; }); if(!CITIES[o.city]) o.city='caruaru-pe'; o.v=6; }
  const keep=S; S=o; try{ setStateHeat(); if(!S.govs) initGovs(); } finally { S=keep; }
  return o;
}
