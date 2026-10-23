// ================= MOTOR v2 =================
const SAVE_KEY='vossa-excelencia';
const SAVE_VER=6;
let S=null, QUEUE=[], TAB='agenda', CAT='todas', PREV=null;
let SETUP={nome:'',gen:'f',city:'caruaru-pe',party:'pcn',arch:'adv'};
const $=q=>document.querySelector(q);
const rnd=Math.random;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function randn(){let u=0,v=0;while(!u)u=rnd();while(!v)v=rnd();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
const pick=a=>a[Math.floor(rnd()*a.length)];
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>Math.round(n).toLocaleString('pt-BR');
const pct=n=>(n*100).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';

function F(k){return !!(S&&S.flags[k])}
function off(){return OFF[S.office]}
function oname(k,g){return OFF[k][g||S.gen]}
function sc(){return S.office==='none'?1+(S.maxLvl||0)*0.4:off().sc}
const elecType=y=>y%4===0?'mun':y%4===2?'ger':null;
const qlabel=(q,y)=>`${q}º tri ${y}`;
function trat(){return S.office==='none'?(S.gen==='f'?'Senhora':'Senhor'):'Vossa Excelência'}
function fill(t){const m={nome:S.nome,cidade:CITIES[S.city].n,estado:CITIES[S.city].uf,partido:PARTIES[S.party].sig,rival:S.nemesis?S.nemesis.name:'o adversário',cargo:oname(S.office)};return String(t).replace(/\{(\w+)\}/g,(x,k)=>m[k]??x)}
function genderize(t,g){const f=(g||(S&&S.gen))==='f';return String(t).replace(/(\w*)o\(a\)/g,f?'$1a':'$1o').replace(/\(a\)/g,f?'a':'')}
function whoMatch(who,o){
  o=o||S.office; if(!who||who==='*') return true;
  return who.split(',').some(w=>w==='*'||w===o||(w==='leg'&&OFF[o].type==='leg')||(w==='exec'&&OFF[o].type==='exec')||(w==='mun'&&(o==='ver'||o==='pref')));
}
function inCampaign(){return S.phase==='camp'&&!!S.campaign}
function apMaxNow(){return 3+(S.staff.chefe?1:0)}
function log(t,k){S.log.push({d:qlabel(S.q,S.year),q:S.q,y:S.year,t,k:k||''}); if(S.log.length>500)S.log.shift()}
function scaleFx(fx,m){const o={};for(const k in fx)o[k]=fx[k]*m;return o}

// ---------- NPCs ----------
function npc(o){
  o=o||{}; S.npcN=(S.npcN||0)+1;
  const gen=o.gen||(rnd()<.45?'f':'m');
  const prof=PROFILES.find(p=>p.k===o.prof)||pick(PROFILES);
  const first=pick(gen==='f'?NF:NM), sur=pick(SUR);
  let name;
  if(o.low&&rnd()<.45) name=`${first} ${pick(NICK)}`;
  else if(prof.title&&rnd()<.55){const t=pick(prof.title); name=`${gen==='f'?t[1]:t[0]} ${first} ${sur}`}
  else name=`${first} ${sur}`;
  const parties=Object.keys(PARTIES).filter(k=>k!==S.party);
  return {id:'n'+S.npcN,name,gen,prof:prof.k,party:o.party!==undefined?o.party:pick(parties),seed:name+S.npcN};
}
function portrait(p,cls,ring){return avatar(p.seed,p.gen,p.party?PCOLOR[p.party]:'#6B7A99',{cls,ring})}
function myPortrait(cls){return avatar(S.seed,S.gen,PCOLOR[S.party],{cls,ring:'#F2C14E',look:S.look})}
function spendAP(){ if(inCampaign()){ if(S.apLeft<1){ toast('Sem ações livres nesta semana.',null,true); return false; } S.apLeft--; } return true; }
function profName(k){const p=PROFILES.find(x=>x.k===k);return p?p.n:''}

// ---------- efeitos ----------
function applyFx(fx,ctx){
  ctx=ctx||{}; const out={}; if(!fx) return out;
  const P=PARTIES[S.party],Ar=ARCH[S.arch],m=ctx.mult??1;
  for(const k in fx){
    let v=fx[k]; if(!v) continue;
    if(k.includes(':')){ const [t,x]=k.split(':'); const W=S.world;
      if(t==='s'){ const b=S.seg[x]??30; const vv=v>0?v*m*(ctx.passive?1:dim(b)):v; S.seg[x]=clamp(b+vv,0,100); out[k]=S.seg[x]-b; }
      else if(t==='o'){ const b=W.own[x]; W.own[x]=clamp(b+v*(v>0?m:1),0,100); out[k]=W.own[x]-b; }
      else if(t==='h'){ W.heat[x]=clamp(W.heat[x]+v,5,100); }
      continue; }
    if(k==='f'&&OFF[S.office].type==='exec'&&S.world){ const lv={pres:1,gov:.35,pref:.12}[S.office]||0; const P2=S.world.push=S.world.push||{pib:0,infl:0}; P2.pib+=-v*0.03*lv; P2.infl+=-v*0.02*lv; }
    if(k==='$'){ v=v*sc(); if(v>0&&!ctx.passive){ if(S.party==='avanca'&&ctx.cat==='dinheiro'&&!ctx.illegal) v*=1.5; if(S.staff.tes) v*=1.15; }
      v=Math.round(v); S.money+=v; if(v<0&&inCampaign()) S.campaign.spend+=-v/sc(); out.$=(out.$||0)+v; continue; }
    if(k==='camp'){ const c=S.campaign; if(c){ if(v>0){ v*=m; if(S.staff.marq) v*=1.25; } c.camp+=v; if(v>0&&inCampaign()) c.field.effort[c.focus]+=v*0.6; out.camp=(out.camp||0)+v; } continue; }
    const keys=k==='ap'?['aa','am','apo']:[k];
    for(const kk of keys){
      let vv=v;
      if(vv>0&&!ctx.passive){ vv*=(P.mult[kk]||1)*((Ar.mult||{})[kk]||1); if(ctx.cat) vv*=((P.catMult||{})[ctx.cat]||1)*((Ar.catMult||{})[ctx.cat]||1); if(kk!=='rj') vv*=m; }
      const ci=CLS.indexOf(kk);
      if(ci>=0){ const b=classAP(ci); for(const sg in SEG){ const w=SEG[sg].mix[ci]; if(!w) continue; const cur=S.seg[sg]??30; const dv=vv*w*1.35*(vv>0&&!ctx.passive?dim(cur):1); S.seg[sg]=clamp(cur+dv,0,100); } out[kk]=(out[kk]||0)+(classAP(ci)-b); continue; }
      const b=S.stats[kk]; if(vv>0&&!ctx.passive&&kk!=='rj'&&kk!=='f') vv*=dim(b); S.stats[kk]=clamp(b+vv,0,100); out[kk]=(out[kk]||0)+(S.stats[kk]-b);
    }
  }
  return out;
}
function chip(k,v,money){
  if(!v||Math.abs(v)<0.05) return '';
  if(k.startsWith('h:')||k.startsWith('w:')) return '';
  if(k==='camp'&&!money) return `<span class="${v>0?'g':'b'}">Campanha ${v>0?'▲':'▼'}</span>`;
  if(k.startsWith('s:')||k.startsWith('o:')){ const x=k.slice(2), lab=k[0]==='s'?SEG[x].n:'Pauta '+ISS[x].n.toLowerCase(); if(!money) return `<span class="${v>0?'g':'b'} ${k[0]==='s'?'sg':'is'}">${lab} ${v>0?'▲':'▼'}</span>`; const n=Math.round(v); if(!n) return ''; return `<span class="${n>0?'g':'b'} ${k[0]==='s'?'sg':'is'}">${lab} ${n>0?'+':'−'}${Math.abs(n)}</span>`; }
  if(k==='$'){ if(!money) return `<span class="${v>=0?'g':'b'}">Caixa ${v>0?'▲':'▼'}</span>`; const n=Math.round(v);if(!n)return '';return `<span class="${n>=0?'g':'b'}">R$ ${n>0?'+':'−'}${fmt(Math.abs(n))} mil</span>`}
  const bad=k==='rj'?v>0:v<0;
  if(!money) return `<span class="${bad?'b':'g'}">${LBL[k]} ${v>0?'▲':'▼'}</span>`;
  const n=Math.abs(v)<1?(Math.abs(v)).toFixed(1).replace('.',','):Math.round(Math.abs(v));
  return `<span class="${bad?'b':'g'}">${LBL[k]} ${v>0?'+':'−'}${n}</span>`;
}
function dim(cur){ return cur<50?1:Math.max(0.15,1-Math.pow((cur-50)/50,1.5)*0.85); }
const CLS=['aa','am','apo'];
function fxHTML(fx,applied){ if(!fx) return ''; let h=''; for(const k in fx) h+=chip(k,fx[k],applied); return h?`<div class="fx">${h}</div>`:'' }

// ---------- novo jogo ----------
function newGame(){
  const c=SETUP, st={cp:10,ip:10,et:60,rj:0,pt:50,f:50};
  let money=40; const a=ARCH[c.arch].start;
  const clsStart={}; for(const k in a){ if(k==='money') money+=a[k]; else if(CLS.includes(k)) clsStart[k]=a[k]; else st[k]=clamp(st[k]+a[k],0,100); }
  const nome=c.nome.trim()||(c.gen==='f'?'Helena Duarte':'Rafael Duarte');
  S={v:SAVE_VER,look:c.look||randomLook(c.gen,nome),nome,gen:c.gen,seed:'me-'+nome,city:c.city,party:c.party,arch:c.arch,
    year:2028,q:1,age:25,tick:0,office:'none',officeEnds:null,maxLvl:0,stats:st,money,flags:{},seen:{},used:{},doneQ:{},onceDone:{},
    apLeft:99,log:[],career:[],elections:[],lostStreak:0,campaign:null,phase:'gov',poll:null,execStreak:0,presTerms:0,
    allies:[],staff:{},cabinet:null,cabOffer:null,ended:null,npcN:0,qStart:null,promises:[],obras:[],pending:[],att:{},attLog:[],lastAtt:{},hist:[],tut:0};
  S.nemesis=npc({prof:pick(['dinastia','populista','policial','empresario'])}); S.nemesis.elo=0;
  addAlly('cacique',{pow:2,loy:55,shady:false,silent:true});
  addAlly(ARCH_ALLY[c.arch],{pow:1,loy:65,shady:false,silent:true});
  if(c.party==='unir') addAlly('prefeito',{pow:2,loy:60,shady:false,silent:true});
  S.partyHist=[c.party]; S.bio=makeOrigin(); setStateHeat(); initWorld(); initGovs(); const aff=PARTIES[c.party].aff||{}; for(const k in aff) S.seg[k]+=aff[k]; applyFx(clsStart,{passive:true}); initRivals(); S.segPrev=segSnap(); pushHist(); genDecisions(); publishPoll();
  S.qStart=snap();
  log(`${S.nome} completa 25 anos e se filia ao ${PARTIES[S.party].sig} em ${CITIES[S.city].n}. A primeira eleição é em outubro. Seu maior rival na cidade se chama ${S.nemesis.name}.`,'elec');
  save(); TAB='agenda'; renderGame(); showTransition(true); setTimeout(()=>tutorial(0),RM()?700:2100);
}
function snap(){return {st:Object.assign({},S.stats),money:S.money,ap:AP()}}
function segSnap(){const o={};for(const k in SEG)o[k]=segAP(k);return o}

// ---------- ações ----------
const CAMP_CATS=['camp','base','midia','dinheiro','juridico','partido'];
function canDo(a){
  if(!inCampaign()&&a.id!=='pesquisa') return {ok:false,hide:true};
  if(!whoMatch(a.who)) return {ok:false,hide:true};
  if(a.o.camp&&!inCampaign()) return {ok:false,hide:true};
  if(inCampaign()&&!CAMP_CATS.includes(a.cat)) return {ok:false,hide:true};
  if(inCampaign()&&a.o.special==='trocar') return {ok:false,hide:true};
  if(a.o.once&&S.onceDone[a.id]) return {ok:false,hide:true};
  const cost=a.o.ap||1;
  if(S.doneQ[a.id]) return {ok:false,why:inCampaign()?'Já feito nesta semana':'Já feito neste trimestre'};
  if(a.o.req&&!a.o.req(S.stats)) return {ok:false,why:a.o.reqTxt};
  const m=(a.fx.$||0)*sc(); if(m<0&&S.money+m<0) return {ok:false,why:'Caixa insuficiente'};
  if(inCampaign()&&S.apLeft<cost) return {ok:false,why:`Exige ${cost} ações nesta semana`};
  return {ok:true};
}
function recentUses(id){return (S.used[id]||[]).filter(t=>t>=S.tick-3).length}
function doAction(id){
  const a=ACT[id]; if(!canDo(a).ok) return;
  if(a.o.special==='trocar') return showTrocar();
  if(inCampaign()) S.apLeft-=(a.o.ap||1); S.doneQ[id]=1; if(a.o.once) S.onceDone[id]=1;
  const mult=1/(1+0.5*recentUses(id)); (S.used[id]=S.used[id]||[]).push(S.tick);
  const out=applyFx(a.fx,{cat:a.cat,mult,illegal:a.o.illegal});
  if(a.o.set) S.flags[a.o.set]=(S.flags[a.o.set]||0)+1;
  noteAttention(out);
  let msg=genderize(a.n), bad=false;
  let p=a.o.risk?a.o.risk.p:0; if(a.cat==='midia'&&S.staff.imp) p/=2;
  if(a.o.risk&&rnd()<p){ const o2=applyFx(a.o.risk.fx); for(const k in o2) out[k]=(out[k]||0)+o2[k]; msg+='. '+genderize(a.o.risk.msg); bad=true; }
  log(msg+(mult<1&&!bad?' (efeito reduzido por repetição)':''),bad?'bad':'');
  if(a.o.special==='pesquisa'){ save(); renderGame(); return showPesquisa(); }
  toast(msg,out,bad); bad?SFX.bad():SFX.coin(); save(); renderGame();
}

// ---------- aliados ----------
function addAlly(t,o){
  o=o||{}; const d=ALLY_DEF[t]; const p=npc({gen:o.gen,party:S.party,prof:d.prof});
  const a={id:p.id,t,name:o.name||p.name,gen:p.gen,seed:p.seed,party:S.party,loy:o.loy??55,pow:o.pow??(S.stats.cp>60?3:S.stats.cp>30?2:1),shady:o.shady??(rnd()<.25),cd:0,gift:-9};
  a.rumor=a.shady&&rnd()<.6; S.allies.push(a);
  if(!o.silent) log(`${a.name} (${genderize(d.n,a.gen)}) passa a ser seu aliado.`,'elec');
  return a;
}
function maxAllies(){return 3+S.maxLvl}
function allyFavor(id){
  const a=S.allies.find(x=>x.id===id); if(!a||a.cd>0||a.loy<20) return; if(!spendAP()) return;
  const d=ALLY_DEF[a.t]; a.loy-=18; a.cd=2;
  const fx=(a.shady&&d.shadyFx)?d.shadyFx:d.fx; const out=applyFx(scaleFx(fx,0.6+0.4*a.pow));
  noteAttention(out,'ally'); const msg=`${a.name}: ${d.favor.toLowerCase()}`; log(msg); toast(msg,out); SFX.good(); save(); renderGame();
}
function allyGift(id){
  const a=S.allies.find(x=>x.id===id); const cost=Math.round(5*sc()); if(!a||S.money<cost||a.gift===S.tick) return;
  S.money-=cost; a.loy=clamp(a.loy+15,0,100); a.gift=S.tick; noteAttention({},'ally'); toast(`Jantar com ${a.name}. Lealdade em alta.`); save(); renderGame();
}
function showRecruit(){
  if(S.doneQ.recruit) return toast('Você já recrutou alguém neste trimestre.');
  if(inCampaign()&&S.apLeft<1) return toast('Sem ações livres nesta semana.');
  const owned=S.allies.map(a=>a.t); let types=Object.keys(ALLY_DEF).filter(t=>!owned.includes(t)); if(types.length<3) types=Object.keys(ALLY_DEF);
  types=types.sort(()=>rnd()-.5).slice(0,3);
  const offers=types.map(t=>{const d=ALLY_DEF[t],p=npc({party:S.party,prof:d.prof});return {t,name:p.name,gen:p.gen,seed:p.seed,party:S.party,pow:S.stats.cp>60?3:S.stats.cp>30?2:1,shady:rnd()<.3}});
  let h=`<div class="sheet-pad"><div class="eyebrow">Rede de apoio</div><h2>Quem você vai procurar?</h2><p class="txt">Cada aliado custa 1 ação para conquistar e começa com lealdade 50. Alguns têm reputação duvidosa: rendem mais e podem afundar você junto.</p><div class="choices">`;
  offers.forEach((o,i)=>{const d=ALLY_DEF[o.t]; h+=`<button class="choice row-choice" data-o="${i}">${avatar(o.seed,o.gen,PCOLOR[o.party],{cls:'av-md'})}<span><b>${esc(o.name)}</b><small>${genderize(d.n,o.gen)} · ${'★'.repeat(o.pow)}${o.shady&&rnd()<.6?' · comentam que é “enrolado(a)”':''}</small><small>Passivo: ${Object.keys(d.passive).map(k=>LBL[k]).join(', ')} · Favor: ${d.favor}</small></span></button>`});
  h+=`<button class="choice" data-o=""><b>Agora não</b></button></div></div>`;
  openModal(h);
  document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{ const i=b.dataset.o; closeModal(); if(i==='') return;
    const o=offers[+i]; if(!spendAP()) return; S.doneQ.recruit=1; SFX.good(); const a=addAlly(o.t,{name:o.name,gen:o.gen,pow:o.pow,shady:o.shady,loy:50}); a.seed=o.seed; save(); renderGame(); toast(`${o.name} entrou para o seu grupo.`); });
}
function processAllies(){
  let ev=null;
  for(const a of S.allies.slice()){
    const d=ALLY_DEF[a.t]; a.cd=Math.max(0,a.cd-1); a.loy=clamp(a.loy-1.5+(S.office!=='none'?0.6:0),0,100);
    if(a.loy>=30) applyFx(scaleFx(d.passive,0.6+0.4*a.pow),{passive:true});
    if(a.loy<12&&rnd()<.5){ S.allies=S.allies.filter(x=>x!==a); log(`${a.name} rompeu com você e foi procurar outro grupo.`,'bad'); }
    else if(!ev&&a.shady&&S.stats.rj>=50&&a.loy<40&&rnd()<.15) ev=betrayalEvent(a);
  }
  return ev;
}
function betrayalEvent(a){
  return {id:'_traicao',tag:'Bastidores',scene:'pf',who:a,t:`${a.name} pode falar`,txt:`${a.name}, investigado(a) pela Polícia Federal, negocia uma delação. Você aparece em várias mensagens.`,ch:[
    {l:'Oferecer ajuda jurídica e dinheiro',fx:{$:-20,rj:3},fn:()=>{a.loy=clamp(a.loy+25,0,100)},r:'O silêncio foi comprado. Por enquanto.'},
    {l:'Romper antes que exploda',fx:{rj:6,et:1},fn:()=>{S.allies=S.allies.filter(x=>x!==a)},r:'A delação saiu e seu nome apareceu, mas sem provas diretas.'},
    {l:'Negar qualquer relação',p:.4,fx:{},r:'A delação foi considerada fraca.',fail:{fx:{rj:14,am:-4},r:'A delação trouxe áudios. Seu risco judicial disparou.'}}]};
}
function allyShield(kind){return S.allies.filter(a=>a.loy>=40&&ALLY_DEF[a.t].shield===kind).reduce((s,a)=>s+a.pow*0.05,0)}

// ---------- equipe ----------
function toggleStaff(k){ if(S.staff[k]) { delete S.staff[k]; toast(`${STAFF[k].n} dispensado.`); } else { S.staff[k]=1; toast(`${STAFF[k].n} contratado.`); if(k==='chefe'&&inCampaign()) S.apLeft++; } save(); renderGame(); }
function staffCost(){return Object.keys(S.staff).reduce((s,k)=>s+STAFF[k].sal,0)*sc()}

// ---------- gabinete / coalizão ----------
function cabSlots(){return SLOTS[S.office]||[]}
function cabTitle(k){return S.office==='pres'?PORTF[k].min:(S.office==='gov'?'Secretaria de ':'Secretaria de ')+PORTF[k].n}
function startCabinet(){ S.cabinet={}; cabSlots().forEach(k=>S.cabinet[k]=null); S.cabFree={}; }
function cabOffers(k){
  const others=Object.keys(PARTIES).filter(p=>p!==S.party);
  const wpick=()=>{let r=rnd()*others.reduce((a,p)=>a+PARTIES[p].seats,0);for(const p of others){r-=PARTIES[p].seats;if(r<=0)return p}return others[0]};
  const p1=wpick(); let p2=wpick(); if(p2===p1) p2=others.find(p=>p!==p1);
  const mk=(party,comp,corr)=>Object.assign(npc({party,prof:party?pick(['dinastia','empresario','populista','sindical']):'tecnico'}),{party,comp:Math.round(comp),corr:Math.round(corr)});
  return [mk(null,62+rnd()*28,4+rnd()*10),mk(S.party,40+rnd()*28,12+rnd()*25),mk(p1,30+rnd()*30,18+rnd()*35),mk(p2,30+rnd()*30,18+rnd()*35)];
}
function coalition(){
  const parts={}; for(const k in (S.cabinet||{})){const a=S.cabinet[k]; if(a&&a.party&&a.party!==S.party) parts[a.party]=(parts[a.party]||0)+1;}
  let base=PARTIES[S.party].seats; const sat={};
  for(const p in parts){ const need=Math.max(1,Math.round(PARTIES[p].seats/12)); sat[p]=Math.min(1,parts[p]/need); base+=PARTIES[p].seats*sat[p]; }
  return {base,parts,sat};
}
function showNominate(k){
  if(!S.cabinet) return;
  const filled=!!S.cabinet[k], free=!S.cabFree[k];
  if(!S.cabOffer||S.cabOffer.k!==k) S.cabOffer={k,list:cabOffers(k)};
  const risk=c=>c.corr<15?'baixo':c.corr<32?'médio':'alto';
  let h=`<div class="sheet-pad"><div class="eyebrow">${esc(OFF[S.office].house)} · nomeação</div><h2>${esc(cabTitle(k))}</h2><p class="txt">Técnicos entregam resultado. Políticos trazem os votos do partido deles para a sua base.</p><div class="choices">`;
  S.cabOffer.list.forEach((c,i)=>{ h+=`<button class="choice row-choice" data-n="${i}">${portrait(c,'av-md')}<span><b>${esc(c.name)}</b><small>${c.party?PARTIES[c.party].sig+' · traz '+PARTIES[c.party].seats+'% da Casa para a base':'Técnico(a) sem partido'}</small><span class="mini"><i>Competência</i><span class="bar"><i style="width:${c.comp}%"></i></span><i>Risco de escândalo: ${risk(c)}</i></span></span></button>`; });
  h+=`${filled?`<button class="choice" data-n="x"><b>Exonerar e deixar vago</b><small>A pasta sem titular custa saúde fiscal todo trimestre</small></button>`:''}<button class="choice" data-n=""><b>Cancelar</b></button></div></div>`;
  openModal(h);
  document.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{ const v=b.dataset.n; closeModal(); if(v==='') return;
    S.cabFree[k]=1; SFX.click();
    if(v==='x'){ log(`${S.cabinet[k].name} foi exonerado(a) de ${cabTitle(k)}.`); S.cabinet[k]=null; }
    else { const c=S.cabOffer.list[+v]; S.cabinet[k]=c; log(`${c.name} assume ${cabTitle(k)}${c.party?' ('+PARTIES[c.party].sig+')':''}.`); }
    S.cabOffer=null; save(); renderGame(); });
}
function fillTechnicians(){ for(const k of cabSlots()){ if(!S.cabinet[k]){ const c=cabOffers(k)[0]; S.cabinet[k]=c; S.cabFree[k]=1; } } log('Vagas do primeiro escalão preenchidas com técnicos.'); save(); renderGame(); }
function processCabinet(){
  if(!S.cabinet) return null; let ev=null;
  for(const k of cabSlots()){
    const a=S.cabinet[k];
    if(!a){ S.stats.f=clamp(S.stats.f-0.4,0,100); continue; }
    applyFx(scaleFx(PORTF[k].fx,(a.comp-45)/45),{passive:true});
    if(!ev&&rnd()<a.corr/100*0.035) ev=scandalEvent(k,a);
  }
  const co=coalition(); const target=10+co.base*1.1; S.stats.ip=clamp(S.stats.ip+(target-S.stats.ip)*0.2,0,100);
  if(!ev&&(S.office==='pres'||S.office==='gov')&&rnd()<.12){ const p=Object.keys(PARTIES).find(p=>p!==S.party&&PARTIES[p].seats>=15&&!co.parts[p]); if(p) ev=demandEvent(p); }
  return ev;
}
function scandalEvent(k,a){
  return {id:'_escandalo',tag:OFF[S.office].house,scene:'pf',who:a,t:`Escândalo em ${PORTF[k].n}`,txt:`${a.name}, titular de ${cabTitle(k)}, é suspeito(a) de favorecer empresas em contratos sem licitação.`,ch:[
    {l:'Demitir imediatamente',fx:{et:2,cp:-1},fn:()=>{S.cabinet[k]=null},r:'A demissão saiu no Diário Oficial no mesmo dia. A pasta ficou vaga.'},
    {l:'Defender publicamente',fx:{rj:5,et:-3,am:-2},fn:()=>{a.corr+=10},r:'O caso não para de crescer.'},
    {l:'Trocar por outro nome do mesmo grupo',fx:{et:1},fn:()=>{const c=cabOffers(k).find(x=>x.party===a.party)||cabOffers(k)[0]; S.cabinet[k]=c},r:'O partido indicou um substituto.'}]};
}
function demandEvent(p){
  const P=PARTIES[p];
  return {id:'_demanda',tag:'Articulação política',scene:OFF[S.office].lvl>=6?'planalto':'palacio',t:`O ${P.sig} quer entrar no governo`,txt:`O ${P.sig}, com ${P.seats}% das cadeiras, oferece votos em troca de uma pasta no primeiro escalão.`,ch:[
    {l:'Entregar uma pasta ao partido',fx:{et:-1},fn:()=>{const slots=cabSlots(); const k=slots.find(s=>!S.cabinet[s])||slots.filter(s=>S.cabinet[s]&&!S.cabinet[s].party).pop()||slots[slots.length-1]; const c=Object.assign(npc({party:p,prof:'dinastia'}),{party:p,comp:Math.round(35+rnd()*25),corr:Math.round(20+rnd()*30)}); S.cabinet[k]=c; log(`${c.name} (${P.sig}) assume ${cabTitle(k)}.`)},r:'O partido aderiu à base. A pasta mudou de mãos.'},
    {l:'Recusar',fx:{ip:-4,cp:1},r:'O partido foi para a oposição.'}]};
}

// ---------- eleições: campo, regiões, votos ----------
function sys(k){const o=OFF[k]; if(k==='pref') return CITIES[S.city].twoRound?'maj2':'maj1'; if(o.sys==='maj') return 'maj1'; return o.sys}
function regionsFor(k){ if(k==='ver'||k==='pref') return REGIONS[S.city]; if(k==='pres') return REGIONS.brasil; return REGIONS.estado }
function placeName(k){ if(k==='ver'||k==='pref') return CITIES[S.city].n; if(k==='pres') return 'Brasil'; return 'Estado de '+CITIES[S.city].uf }
function electorate(k){const c=CITIES[S.city]; if(k==='ver'||k==='pref') return c.elec; if(k==='pres') return 158000000; return c.stElec}
function qe(k){const c=CITIES[S.city]; if(k==='ver') return c.qe; const seats=k==='dfed'?c.dfedSeats:c.destSeats; return Math.round(c.stElec*0.78/seats)}
function diffOf(k){let d=OFF[k].diff; if(k==='ver') d+=CITIES[S.city].verMod; if(k==='pref') d+=CITIES[S.city].prefMod; if(k==='pres'&&!['gov','sen','pres'].includes(S.office)) d+=3; return d}
function rejection(){const st=S.stats;return Math.max(0,55-st.et)*0.35+Math.max(0,st.rj-30)*0.3}
function eligible(k,y){
  y=y||S.year; const o=OFF[k];
  if(o.el!==elecType(y)) return {ok:false};
  if(S.age<o.min) return {ok:false,why:`Idade mínima de ${o.min} anos`};
  if(o.type==='exec'&&S.office===k&&S.execStreak>=2) return {ok:false,why:'Já reeleito(a): terceiro mandato seguido é vedado'};
  if(S.office==='sen'&&k==='sen'&&S.officeEnds!==y) return {ok:false,why:'Seu mandato de senador(a) ainda não termina'};
  if(o.sys!=='prop'&&S.stats.pt<30) return {ok:false,why:'O partido nega a legenda (Partido abaixo de 30)'};
  if(S.office===k) return {ok:true};
  if(k==='pres'&&S.maxLvl<4) return {ok:false,why:'O partido só lança à Presidência quem já foi deputado federal, senador ou governador'};
  if(k==='pres'&&S.stats.cp<42) return {ok:false,why:'Falta peso político: o partido exige Capital 42+ para a Presidência'};
  if((k==='gov'||k==='sen')&&S.maxLvl<2) return {ok:false,why:'O partido exige experiência como prefeito ou deputado'};
  if((k==='gov'||k==='sen')&&S.stats.cp<30) return {ok:false,why:'Falta peso político: o partido exige Capital 30+'};
  return {ok:true};
}
function genField(k){
  const s=sys(k), regs=regionsFor(k), d=diffOf(k);
  const n={ver:3,pref:3,dest:3,dfed:3,sen:3,gov:4,pres:5}[k];
  const cands=[{id:'me',isMe:true,name:S.nome,gen:S.gen,seed:S.seed,party:S.party}];
  for(let i=0;i<n;i++){
    let c;
    if(s==='prop') c=npc({party:S.party,low:k==='ver'});
    else if(i===0) c=Object.assign({},S.nemesis);
    else if(i===1&&S.rivals&&S.rivals[0]) c=Object.assign({},S.rivals[0]);
    else c=npc({low:k==='pref'&&CITIES[S.city].elec<50000});
    c.base=s==='prop'?0:d+(i===0?3+(c.elo||0):-3-i*3)+randn()*3;
    c.home=Math.floor(rnd()*regs.length); c.mom=0; c.out=false;
    if(s==='prop') c.vf=[1.3,1.02,0.82][i]*(1+randn()*0.08);
    cands.push(c);
  }
  return {cands,regs,effort:regs.map(()=>0)};
}
function hypoCC(k){return {camp:50,spend:40,effort:regionsFor(k).map(()=>6)}}
function myScore(k,r,ri,cc){
  const st=S.stats,o=OFF[k],P=PARTIES[S.party];
  const apr=classAP(0)*r.mix[0]+classAP(1)*r.mix[1]+classAP(2)*r.mix[2];
  let b=0.42*apr+0.18*st.cp+0.1*st.ip+0.08*st.pt+(sys(k)==='prop'?P.fit.prop:P.fit.maj)-rejection();
  if(S.office===k) b+=o.type==='exec'?(st.f>=45?6:-3):5;
  if(cc){ const ef=cc.effort||(cc.field&&cc.field.effort)||[]; b+=cc.camp*0.12+(ef[ri]||0)*0.3+1.6*Math.log(1+cc.spend); }
  return b;
}
function rivalScore(c,r,ri){ const p=PROFILES.find(x=>x.k===c.prof); const bias=p?p.bias[0]*r.mix[0]+p.bias[1]*r.mix[1]+p.bias[2]*r.mix[2]:0; return c.base+c.mom+(c.home===ri?5:0)+12*(bias-0.08) }
function fieldShares(k,f,cc,noise,only,bonus){
  const alive=only||f.cands.filter(c=>!c.out);
  const g=alive.map(()=>noise?randn()*2.6:0);
  const perReg=f.regs.map((r,ri)=>{ const v=alive.map((c,i)=>(c.isMe?myScore(k,r,ri,cc)+(bonus||0):rivalScore(c,r,ri))+g[i]+(noise?randn()*1.6:0)); const mx=Math.max(...v); const ex=v.map(x=>Math.exp((x-mx)/6.5)); const t=ex.reduce((a,b)=>a+b,0); return ex.map(x=>x/t); });
  const tot=alive.map((c,i)=>f.regs.reduce((a,r,ri)=>a+r.w*perReg[ri][i],0));
  return {alive,perReg,tot};
}
function propResult(k,f,cc,noise){
  const Q=qe(k); let cut=Q*(0.9-PARTIES[S.party].seats/100*1.1); if(F('puxador')) cut*=0.85;
  const avg=f.regs.reduce((a,r,ri)=>a+r.w*myScore(k,r,ri,cc),0);
  const x=(avg-diffOf(k))/8+(noise?randn()*0.45:0);
  const votes=Q*0.62*Math.exp(0.85*x);
  const sh=f.regs.map((r,ri)=>r.w*Math.exp(myScore(k,r,ri,cc)/12)); const st=sh.reduce((a,b)=>a+b,0);
  const rivals=f.cands.filter(c=>!c.isMe).map(c=>({c,votes:cut*c.vf}));
  return {sys:'prop',x,votes,cut,qe:Q,win:votes>=cut&&votes>=Q*0.1,regVotes:sh.map(v=>votes*v/st),rivals};
}
function majResult(k,f,cc,noise,only,bonus){
  const r=fieldShares(k,f,cc,noise,only,bonus);
  const order=r.alive.map((c,i)=>({c,s:r.tot[i],i})).sort((a,b)=>b.s-a.s);
  const me=order.find(o=>o.c.isMe), mePos=order.indexOf(me);
  const s=sys(k);
  let win=false,second=false;
  if(only) win=mePos===0;
  else if(me.s>0.5) win=true;
  else if(s==='maj1') win=mePos===0;
  else second=mePos<=1;
  return {sys:s,shares:r,order,win,second,me};
}
function winChance(k,cc,f,n){
  n=n||80; let w=0;
  for(let i=0;i<n;i++){
    const ff=f||genField(k);
    if(sys(k)==='prop'){ if(propResult(k,ff,cc,true).win) w++; continue; }
    const r=majResult(k,ff,cc,true);
    if(r.win) w++; else if(r.second){ const top2=r.order.slice(0,2).map(o=>o.c); if(majResult(k,ff,cc,true,top2).win) w++; }
  }
  if(!f) S.npcN-=0; return w/n;
}
function pushPoll(){
  const c=S.campaign, k=c.off;
  if(sys(k)==='prop'){ const r=propResult(k,c.field,c,false); c.polls.push({w:c.week,votes:r.votes*(1+randn()*0.05),cut:r.cut}); return; }
  const r=fieldShares(k,c.field,c,false); const s={}; r.alive.forEach((x,i)=>s[x.id]=clamp(r.tot[i]+randn()*0.012,0.005,0.95));
  c.polls.push({w:c.week,s});
}

// ---------- trimestre ----------
function drift(){
  const st=S.stats, o=off();
  worldStep();
  S.money+=Math.round((S.office==='none'?2:4)*sc());
  const sal=Math.round(staffCost()); if(sal){ S.money-=sal; if(S.money<0){ const k=Object.keys(S.staff).sort((a,b)=>STAFF[b].sal-STAFF[a].sal)[0]; delete S.staff[k]; log(`Sem caixa, você dispensou o ${STAFF[k].n.toLowerCase()}.`,'bad'); } }
  if(S.staff.adv) st.rj=clamp(st.rj-1,0,100);
  for(const k in S.seg){ const v=S.seg[k]; if(v>35) S.seg[k]=v-(0.5+(v-35)*0.06); else if(v<26) S.seg[k]=v+0.6; }
  const up=Math.max(0,S.money-60*sc())*0.04; if(up>=1){ S.money-=Math.round(up); }
  if(o.type!=='exec'&&st.ip>30) st.ip-=0.5+(st.ip-30)*0.05;
  if(st.cp>20) st.cp-=(st.cp-20)*0.05+Math.max(0,st.cp-60)*0.04; if(S.office==='none'&&st.cp>10) st.cp-=0.8; if(S.office!=='none') st.cp+=0.1*o.lvl;
  if(S.party==='pcn') st.pt-=0.8; if(st.pt>50) st.pt-=0.3+(st.pt-50)*0.05;
  if(st.rj>0) st.rj-=st.et>=60?1:0.4;
  if(st.et<50) st.et+=0.4;
  if(o.type==='exec'){ st.f-=1; if(st.f<25){ ['per','idosos','serv','media'].forEach(k=>S.seg[k]=clamp(S.seg[k]-1.1,0,100)); } if(st.f>75) S.seg.elite=clamp(S.seg.elite+0.5,0,100); }
  for(const k in st) st[k]=clamp(st[k],0,100);
  const e1=processAllies(), e2=processCabinet();
  return e1||e2;
}
function endTurn(){
  if(S.ended||$('.overlay')) return;
  if(inCampaign()) return endWeek();
  const pend=pendingDecisions(); if(pend.length){ toast(`Faltam ${pend.length} ${pend.length===1?'decisão':'decisões'} neste trimestre.`); return openDecision(S.dec.indexOf(pend[0])); }
  const extra=drift();
  QUEUE=[];
  const crisis=checkCrisis();
  if(crisis) QUEUE.push({type:'event',ev:crisis});
  if(extra) QUEUE.push({type:'event',ev:extra});
  if(elecType(S.year)&&S.q===3) QUEUE.push({type:'termcheck'});
  if(elecType(S.year)&&S.q===2) QUEUE.push({type:'convention'});
  QUEUE.push({type:'paper'});
  QUEUE.push({type:'advance'});
  runQueue();
}
function endWeek(){
  const c=S.campaign, V=VERBA[c.verba], cost=Math.round(V.cost*OFF[c.off].sc);
  if(S.money>=cost){ S.money-=cost; c.spend+=V.cost; if(V.camp) applyFx({camp:V.camp}); c.field.effort[c.focus]+=V.eff*(S.staff.marq?1.25:1); }
  else log('Sem caixa para a verba da semana: só militância nas ruas.','bad');
  const rivals=c.field.cands.filter(x=>!x.isMe&&!x.out);
  rivals.forEach((r,i)=>{ r.mom+=(i===0?1.5:1.1)+randn()*1.1; });
  c.week++; S.tick++; S.doneQ={}; S.apLeft=apMaxNow();
  pushPoll();
  QUEUE=[];
  const maj=sys(c.off)!=='prop';
  if(c.week===4&&maj) QUEUE.push({type:'event',ev:debateEvent()});
  else QUEUE.push({type:'event',ev:(maj&&rnd()<.55)?rivalEvent():campEvent()});
  if(c.week>=c.weeks){ QUEUE.push({type:'election'}); QUEUE.push({type:'endcamp'}); }
  else QUEUE.push({type:'week'});
  runQueue();
}
function runQueue(){
  closeModal(); if(S.ended){ QUEUE=[]; save(); renderGame(); return showEnding(); }
  const it=QUEUE.shift(); if(!it){ save(); renderGame(); return; }
  if(it.type==='event') return showEvent(it.ev);
  if(it.type==='election') return runElection();
  if(it.type==='termcheck'){ termCheck(); return runQueue(); }
  if(it.type==='convention') return showConvention();
  if(it.type==='week'){ save(); renderGame(); showWeekBanner(); return runQueue(); }
  if(it.type==='paper'){ makePaper(); return runQueue(); }
  if(it.type==='endcamp'){ S.phase='gov'; drift(); makePaper(); QUEUE.unshift({type:'advance'}); return runQueue(); }
  if(it.type==='advance'){ advance(); checkEndings(); save(); renderGame(); if(S.ended) return showEnding(); showTransition(); return runQueue(); }
}
function advance(){
  S.q++; if(S.q>4){S.q=1;S.year++;S.age++;}
  S.tick++; S.doneQ={};
  if(S.campaign&&S.q===3){ S.phase='camp'; TAB='campanha'; pushPoll(); log(`Começa a campanha para ${oname(S.campaign.off)}: seis semanas até a urna.`,'elec'); }
  S.apLeft=inCampaign()?apMaxNow():99;
  quarterHooks();
  S.qPrev=S.qStart; S.qStart=snap(); S.segPrev=segSnap(); pushHist();
  if(!inCampaign()){ genDecisions(); publishPoll(); } else S.dec=null;
  if(S.q===1&&S.age%10===0) log(`${S.nome} completa ${S.age} anos.`);
}
function checkEndings(){
  const st=S.stats; if(S.ended) return;
  if(S.age>=75) return end('aposentadoria');
  if(S.office==='none'&&st.rj>=85&&st.et<=40) return end('prisao');
  if(S.office!=='none'&&st.rj>=96&&rnd()<.3) return end('prisao','Nem o foro privilegiado segurou: o STF autorizou a prisão preventiva no exercício do mandato.');
  if(S.office==='none'&&S.lostStreak>=2&&st.cp<=20) return end('ostracismo');
}
function checkCrisis(){
  const st=S.stats;
  if(st.pt<=8) return expulsionEvent();
  if(S.office==='none'||st.rj<55) return null;
  const p=((st.rj-50)/50)*(1-st.ip/100)*(1-AP()/100)*1.8;
  return rnd()<p?trialEvent():null;
}
function trialEvent(){
  const o=S.office, ex=OFF[o].type==='exec';
  const orgao={pref:'A Câmara Municipal abriu comissão processante (Decreto-Lei 201/67) para cassar seu mandato.',gov:'A Assembleia Legislativa admitiu o pedido de impeachment por crime de responsabilidade.',pres:'A Câmara admitiu o impeachment por mais de dois terços. O Senado vai julgar.'}[o]||'O Conselho de Ética abriu processo de cassação por quebra de decoro parlamentar.';
  const pr=clamp(AP()/100*1.25+allyShield('rua'),0.05,0.95), pp=clamp(S.stats.ip/100*1.25+allyShield('plen'),0.05,0.95);
  return {id:'_julgamento',scene:'tribunal',t:ex?'O processo de impeachment':'Processo de cassação',tag:'Crise de mandato',txt:orgao+' Para sobreviver, basta um escudo forte: as ruas ou o plenário.',ch:[
    {l:'Mobilizar a base nas ruas',p:pr,hint:`Chance ≈ ${Math.round(pr*100)}% (aprovação e aliados de rua)`,fx:{cp:3,rj:-8},r:'As ruas encheram a seu favor e os votos para afastar você não apareceram.',fail:{fx:{},r:'As ruas ficaram vazias. O plenário votou contra você.',end:ex?'impeachment':'cassacao'}},
    {l:'Garantir votos no plenário com cargos e emendas',p:pp,hint:`Chance ≈ ${Math.round(pp*100)}% (articulação e aliados no plenário)`,fx:{et:-6,rj:-4,$:-20,ip:-6},r:'O processo foi arquivado. Seus aliados cobrarão a conta.',fail:{fx:{},r:'Os votos prometidos sumiram na hora do painel.',end:ex?'impeachment':'cassacao'}},
    {l:'Renunciar antes do julgamento',fx:{},r:'Pela Lei da Ficha Limpa, a renúncia depois de aberto o processo também gera inelegibilidade.',end:'renuncia'}]};
}
function expulsionEvent(){
  const others=Object.keys(PARTIES).filter(k=>k!==S.party);
  return {id:'_expulsao',scene:'skyline',t:'Expulsão do partido',tag:'Diretório Nacional',txt:`O ${PARTIES[S.party].sig} expulsou você por infidelidade. A expulsão não tira o mandato, mas você precisa de outra legenda para disputar eleições.`,
    ch:others.map(k=>({l:`Filiar-se ao ${PARTIES[k].sig} (${PARTIES[k].esp})`,fx:{cp:-4},fn:()=>{S.party=k;S.stats.pt=40;S.allies.forEach(a=>a.party=k)},r:`Você assinou a ficha do ${PARTIES[k].sig}.`}))};
}
function campEvent(){
  const pool=EVENTS.filter(e=>e.o.camp&&!(S.campaign.seen||{})[e.id]); const e=pool.length?pick(pool):pick(EVENTS.filter(e=>e.o.camp));
  (S.campaign.seen=S.campaign.seen||{})[e.id]=1; return e;
}
function topRivals(){
  const c=S.campaign, last=c.polls[c.polls.length-1];
  return c.field.cands.filter(x=>!x.isMe&&!x.out).sort((a,b)=>((last&&last.s?last.s[b.id]:0)||b.base)-((last&&last.s?last.s[a.id]:0)||a.base));
}
function debateEvent(){
  const R=topRivals()[0], o=oname(S.campaign.off);
  return {id:'_debate',scene:'tv',who:R,tag:'Campanha · debate',t:'O debate na TV',txt:`Último grande debate para ${o}. ${R.name} (${PARTIES[R.party].sig}) está no púlpito ao lado. Milhões de pessoas assistindo.`,ch:[
    {l:`Atacar o histórico de ${R.name}`,grudge:1,p:clamp(0.45+(S.stats.et-50)/120,0.1,0.85),fx:{camp:5},fn:()=>{R.mom-=3},r:`O ataque colou. ${R.name} gaguejou ao vivo.`,fail:{fx:{camp:-3,et:-1},fn:()=>{R.mom+=2},r:`${R.name} rebateu com um caso seu. A plateia riu.`}},
    {l:'Apresentar propostas com números',fx:{camp:3,aa:2,am:2},r:'Os jornais apontaram você como a pessoa mais preparada no palco.'},
    {l:'Contar sua história de vida',p:.6,fx:{camp:5,apo:2},r:'Os cortes emocionados viralizaram.',fail:{fx:{am:-2},r:'Soou ensaiado. Ninguém se emocionou.'}},
    {l:'Faltar ao debate',fx:{camp:-4},fn:()=>{R.mom+=1},r:'A cadeira vazia virou a imagem do dia.'}]};
}
function rivalEvent(){
  const rv=topRivals(), R=rv[0], W=rv[rv.length-1];
  const opts=[
   ()=>({id:'_ataque',scene:'tv',who:R,tag:'Campanha · horário eleitoral',t:`${R.name} ataca`,txt:`No horário eleitoral, ${R.name} disse que você ${genderize(pick(ACUSA))}.`,ch:[
     {l:'Responder à altura',fx:{camp:2,et:-1},fn:()=>{R.mom-=1},r:'A troca de farpas animou a reta final.'},
     {l:'Pedir direito de resposta no TSE',p:.55,fx:{camp:1,$:-3},fn:()=>{R.mom-=2.5},r:'O TSE concedeu direito de resposta no programa do adversário.',fail:{fx:{camp:-1},r:'O TSE negou o pedido.'}},
     {l:'Ignorar e seguir com propostas',fx:{camp:-1,aa:1},r:'Uma parte do eleitorado acreditou no ataque.'}]}),
   ()=>({id:'_dispara',scene:'urna',who:R,tag:'Campanha · pesquisa',t:`${R.name} cresce`,txt:`${R.name} subiu cinco pontos na última pesquisa e já fala em vitória.`,ch:[
     {l:'Mudar o tom e partir para o ataque',fx:{camp:1,et:-2},fn:()=>{R.mom-=2},r:'O crescimento dele estancou.'},
     {l:'Reforçar sua base',fx:{apo:2,camp:2},r:'Sua militância voltou às ruas.'},
     {l:'Buscar o apoio de quem está atrás',p:clamp(S.stats.ip/100+.2,.1,.85),fx:{camp:3,ip:-2},r:'Lideranças de outros candidatos declararam voto em você.',fail:{fx:{},fn:()=>{R.mom+=1},r:'Eles preferiram apoiar quem está na frente.'}}]}),
   ()=>({id:'_escrival',scene:'imprensa',who:R,tag:'Campanha · imprensa',t:`Reportagem atinge ${R.name}`,txt:`Uma reportagem revela que ${R.name} ${genderize(pick(ESCAND),R.gen)}.`,ch:[
     {l:'Explorar o escândalo',fx:{et:-1,camp:2},fn:()=>{R.mom-=4},r:'Seu programa repetiu a reportagem todos os dias.'},
     {l:'Ficar acima da briga',fx:{aa:2,et:1},fn:()=>{R.mom-=2},r:'Os eleitores fizeram o resto do trabalho.'}]}),
  ];
  if(rv.length>=3) opts.push(()=>({id:'_desiste',scene:'comicio',who:W,tag:'Campanha · bastidores',t:`${W.name} vai desistir`,txt:`${W.name} (${PARTIES[W.party].sig}) vai retirar a candidatura e quer negociar o apoio.`,ch:[
     {l:'Oferecer espaço no seu governo',p:clamp(S.stats.ip/100+.25,.15,.9),fx:{camp:5,et:-2},fn:()=>{W.out=true},r:`${W.name} subiu no seu palanque.`,fail:{fx:{},fn:()=>{W.out=true;R.mom+=3},r:`${W.name} preferiu apoiar ${R.name}.`}},
     {l:'Não negociar',fx:{et:1},fn:()=>{W.out=true},r:'Os votos se espalharam entre os candidatos.'}]}));
  return pick(opts)();
}

// ---------- convenção ----------
function showConvention(){
  const y=S.year, t=elecType(y);
  const opts=ORDER.filter(k=>OFF[k].el===t).map(k=>({k,...eligible(k,y)}));
  const poll=S.poll&&S.poll.year===y?S.poll.res:null;
  let h=`<div class="sheet-scene">${scene('urna')}</div><div class="sheet-pad"><div class="eyebrow">Convenção partidária · ${PARTIES[S.party].sig} · julho de ${y}</div><h2>${t==='mun'?'Eleições municipais':'Eleições gerais'} de ${y}</h2>
  <p class="txt">Escolha o cargo que vai disputar em outubro. A campanha terá seis semanas, com mapa, pesquisas semanais e debate.${S.office!=='none'&&S.officeEnds===y?` Seu mandato de ${oname(S.office)} termina neste ano.`:''}</p><div class="choices">`;
  for(const o of opts){
    if(o.why===undefined&&!o.ok) continue;
    let note=''; if(o.ok&&OFF[S.office].type==='exec'&&S.office!==o.k) note=' Exige renunciar ao cargo atual (desincompatibilização).';
    if(o.ok&&S.office===o.k) note=' Candidatura à reeleição.';
    const pc=poll&&poll[o.k]!=null?` · pesquisa: ${Math.round(poll[o.k]*100)}% de chance`:'';
    h+=`<button class="choice" ${o.ok?'':'disabled'} data-run="${o.k}"><b>${oname(o.k)}</b><small>${o.ok?placeName(o.k)+' · '+(sys(o.k)==='prop'?'proporcional':'majoritária')+pc+note:esc(genderize(o.why))}</small></button>`;
  }
  h+=`<button class="choice" data-run=""><b>Não disputar</b><small>${S.office!=='none'&&S.officeEnds===y?'Seu mandato acaba em dezembro.':'Você segue como está.'}</small></button></div></div>`;
  openModal(h,{scene:true});
  document.querySelectorAll('[data-run]').forEach(b=>b.onclick=()=>startCampaign(b.dataset.run));
}
function startCampaign(k){
  if(!k){ log('Decidiu não disputar a eleição.'); return runQueue(); }
  if(OFF[S.office].type==='exec'&&S.office!==k){ log(`Renunciou ao cargo de ${oname(S.office)} para disputar outro cargo (desincompatibilização).`,'bad'); leaveOffice(); if(S.ended){ QUEUE=[]; return runQueue(); } }
  const pf=(S.pre&&S.pre.off===k&&S.pre.y===S.year)?S.pre.field:genField(k);
  S.campaign={off:k,week:0,weeks:6,field:pf,camp:0,spend:0,focus:Math.floor(regionsFor(k).length/2),verba:1,polls:[],seen:{}};
  const fund=Math.round((5+PARTIES[S.party].seats*0.35)*(S.stats.pt/60)*OFF[k].sc);
  S.money+=fund;
  const rv=S.campaign.field.cands.filter(c=>!c.isMe).map(c=>c.name).join(', ');
  log(`Candidatura a ${oname(k)} homologada. O partido repassou R$ ${fmt(fund)} mil do fundo eleitoral. ${sys(k)==='prop'?'Colegas de chapa':'Adversários'}: ${rv}.`,'elec');
  runQueue();
}

// ---------- eleição ----------
function runElection(){
  const c=S.campaign, k=c.off;
  if(sys(k)==='prop'){ const r=propResult(k,c.field,c,true); return showApuracao(k,r,1,()=>finishElection(k,r.win,r)); }
  const r=majResult(k,c.field,c,true);
  showApuracao(k,r,1,()=>{ if(r.second) return showSecondRound(k,r); finishElection(k,r.win,r); });
}
function showSecondRound(k,r1){
  const top2=r1.order.slice(0,2).map(o=>o.c), R=top2.find(c=>!c.isMe);
  const P=[{l:'Fechar alianças com os derrotados',d:'Cargos em troca de apoio',b:3,fx:{ip:3,et:-3}},{l:'Campanha de rua intensa',d:'Bairro a bairro',b:1.5,fx:{apo:2,$:-8}},{l:'Último debate decisivo',d:'Tudo ou nada',b:rnd()<.55?4:-2,fx:{}},{l:'Ataque pesado ao adversário',d:'Lama no ventilador',b:3,fx:{et:-4,rj:2}}];
  let h=`<div class="sheet-scene">${scene('comicio',{seed:'r2'})}<div class="vs">${myPortrait('av-lg')}<b>×</b>${portrait(R,'av-lg')}</div></div><div class="sheet-pad"><div class="eyebrow">2º turno · ${oname(k)} · ${placeName(k)}</div><h2>Você contra ${esc(R.name)}</h2><p class="txt">Você teve ${pct(r1.me.s)} dos votos válidos no 1º turno. Mais quatro semanas. Qual é a estratégia?</p><div class="choices">`;
  P.forEach((p,i)=>h+=`<button class="choice" data-i="${i}"><b>${p.l}</b><small>${p.d}</small>${fxHTML(p.fx)}</button>`);
  openModal(h+'</div></div>',{scene:true});
  document.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{ const p=P[+b.dataset.i]; applyFx(p.fx);
    const r2=majResult(k,S.campaign.field,S.campaign,true,top2,p.b); r2.round=2;
    showApuracao(k,r2,2,()=>finishElection(k,r2.win,r2)); });
}
function finishElection(k,win,r){
  const y=S.year, o=OFF[k];
  const desc=r.sys==='prop'?`${fmt(r.votes)} votos`:pct(r.me.s)+(r.round===2?' no 2º turno':'');
  S.elections.push({y,off:k,win,desc,party:PARTIES[S.party].sig});
  if(r.sys!=='prop'){
    const best=r.order.find(x=>!x.c.isMe).c;
    if(best.id===S.nemesis.id){ S.nemesis.elo=(S.nemesis.elo||0)+(win?-1:2); }
    else if(!win||rnd()<.5){ S.rivals=[S.nemesis].concat((S.rivals||[]).filter(r=>r.id!==best.id)).slice(0,2); S.nemesis=Object.assign({},best,{elo:win?0:2,grudge:0,lvl:best.lvl||OFF[k].lvl-1,office:best.office||'none'}); delete S.nemesis.base; delete S.nemesis.mom; log(`${best.name} passa a ser seu principal rival.`); }
  }
  if(win){
    const prev=S.office;
    if(o.type==='exec'&&prev===k) S.execStreak++; else S.execStreak=1;
    if(k==='pres') S.presTerms=prev==='pres'?S.presTerms+1:1;
    if(prev!==k&&prev!=='none') S.career[S.career.length-1].to=y;
    if(prev!==k){ S.stats.ip=Math.max(15,S.stats.ip*0.6); S.career.push({off:k,from:y+1,to:null,party:PARTIES[S.party].sig}); }
    S.office=k; S.officeEnds=y+(o.yrs||4); S.maxLvl=Math.max(S.maxLvl,o.lvl); S.lostStreak=0;
    S.stats.cp=clamp(S.stats.cp+6,0,100); S.stats.pt=clamp(S.stats.pt+4,0,100);
    if(o.type==='exec'&&prev!==k){ S.stats.f=clamp(40+rnd()*20,0,100); startCabinet(); log(`Monte seu primeiro escalão na aba Equipe.`,'elec'); }
    if(o.type!=='exec') S.cabinet=null;
    S.allies.forEach(a=>a.loy=clamp(a.loy+8,0,100));
    log(`ELEITO${S.gen==='f'?'A':''}: ${oname(k)} de ${placeName(k)} (${desc}).`,'elec');
  } else {
    S.lostStreak++; S.stats.cp=clamp(S.stats.cp-5,0,100); S.allies.forEach(a=>a.loy=clamp(a.loy-8,0,100));
    log(`Derrota na eleição para ${oname(k)} (${desc}).`,'bad');
  }
  S.lastCampaign={off:k,win,desc,y};
  S.campaign=null; delete S.flags.puxador; TAB='agenda';
  termCheck();
  runQueue();
}
function termCheck(){
  if(S.office!=='none'&&S.officeEnds!=null&&S.officeEnds<=S.year) leaveOffice();
}
function leaveOffice(){
  const was=S.office; if(was==='none') return;
  if(S.career.length&&!S.career[S.career.length-1].to) S.career[S.career.length-1].to=S.year;
  S.office='none'; S.officeEnds=null; S.execStreak=0; S.cabinet=null;
  log(`Mandato de ${OFF[was][S.gen]} encerrado.`);
  if(was==='pres') endPresidency();
}
function endPresidency(){
  const st=S.stats;
  if(st.rj>=85&&st.et<=40) return end('prisao','Sem a imunidade presidencial, a Procuradoria-Geral apresentou a denúncia em uma semana.');
  if(S.presTerms>=2&&AP()>=60&&st.et>=60&&st.f>=50) return end('faixa');
  end('ex_pres');
}

// ---------- escolhas ----------
function resolveChoice(ev,c){
  let branch=c;
  if(c.p!=null){ const p=typeof c.p==='function'?c.p(S.stats):c.p; if(rnd()>=p) branch=Object.assign({},c.fail||{fx:{},r:'Não deu certo.'}); }
  const isDec=S.decOpen!=null; const [nowFx,laterFx]=isDec?splitFx(branch.fx):[branch.fx,null];
  const out=applyFx(nowFx); if(laterFx) S.pending.push({due:S.tick+2+Math.floor(rnd()*2),fx:laterFx,src:genderize(fill(ev.t))});
  noteAttention(out, ev.who&&S.allies.includes(ev.who)?'ally':null); if(branch.promise) addPromise(branch.promise); if(branch.obra) addObra(branch.obra); if(branch.grudge&&S.nemesis) S.nemesis.grudge=(S.nemesis.grudge||0)+branch.grudge;
  { let net=0; for(const k in out){ if(k==='$') net+=Math.sign(out[k]); else if(!k.startsWith('h:')) net+=(isBad(k,out[k])?-1:1); } (net>=0&&branch===c)?SFX.good():SFX.bad(); }
  if(branch.fn) branch.fn(); else if(branch===c&&c.fn) c.fn();
  if(c.set&&branch===c) S.flags[c.set]=1; if(c.unset) delete S.flags[c.unset];
  if(c.ally&&branch===c) addAlly(c.ally.t,c.ally);
  const txt=genderize(fill(branch.r||''));
  { const mag=Object.entries(out).reduce((a,[k,v])=>a+(k==='$'||k.startsWith('h:')?0:Math.abs(v)),0); (S.bioLog=S.bioLog=S.bioLog||[]).push({y:S.year,q:S.q,tick:S.tick,t:genderize(fill(ev.t)),l:genderize(fill(c.l)),ok:branch===c,mag,et:(out.et||0),rj:(out.rj||0),off:S.office,tone:S.decOpen!=null&&S.dec&&S.dec[S.decOpen]?S.dec[S.decOpen].tone:null}); if(S.bioLog.length>160) S.bioLog.shift(); }
  const sc=Object.entries(out).reduce((a,[k,v])=>a+(k==='$'?0:Math.abs(v)),0);
  (S.qNews=S.qNews||[]).push({t:genderize(fill(ev.t)),r:txt,sc,crise:['_julgamento','_escandalo','_traicao','_expulsao'].includes(ev.id)});
  if(S.decOpen!=null&&S.dec&&S.dec[S.decOpen]){ S.dec[S.decOpen].done=true; S.dec[S.decOpen].head=txt; S.dec[S.decOpen].title=genderize(fill(ev.t)); S.decOpen=null; }
  log(`${genderize(fill(ev.t))}: ${txt}`, branch===c?'':'bad');
  if(branch.end) end(branch.end);
  showResult(ev,txt,out,branch===c,laterFx);
}

// ---------- pesquisa / partido ----------
function showPesquisa(){
  let h;
  if(inCampaign()){
    const c=S.campaign, ch=winChance(c.off,c,c.field,120);
    h=`<div class="sheet-pad"><div class="eyebrow">Pesquisa interna · semana ${c.week}</div><h2>${Math.round(ch*100)}% de chance</h2><p class="txt">Simulação de 120 cenários para ${oname(c.off)}, mantida a campanha como está agora.</p><div class="bar big"><i style="width:${ch*100}%"></i></div><button class="cta" id="pOk">Fechar</button></div>`;
  } else {
    let y=S.year; while(!elecType(y)||(y===S.year&&S.q>=3)) y++;
    const t=elecType(y), res={};
    h=`<div class="sheet-pad"><div class="eyebrow">Pesquisa interna · ${qlabel(S.q,S.year)}</div><h2>Suas chances em ${y}</h2><p class="txt">Simulação com adversários prováveis e uma campanha média. Margem de erro alta.</p><div class="tbl-wrap"><table><tr><th>Cargo</th><th>Chance</th><th></th></tr>`;
    for(const k of ORDER.filter(k=>OFF[k].el===t)){
      const e=eligible(k,y); const ok=e.ok||(e.why&&e.why.startsWith('O partido nega'));
      if(!ok){ h+=`<tr><td>${oname(k)}</td><td class="n">—</td><td class="muted">${esc(genderize(e.why||''))}</td></tr>`; continue; }
      const n0=S.npcN; const ch=winChance(k,hypoCC(k),null,60); S.npcN=n0; res[k]=ch;
      h+=`<tr><td>${oname(k)}</td><td class="n">${Math.round(ch*100)}%</td><td style="min-width:90px"><div class="bar"><i style="width:${ch*100}%"></i></div></td></tr>`;
    }
    S.poll={year:y,res}; save();
    h+=`</table></div><button class="cta" id="pOk">Fechar</button></div>`;
  }
  openModal(h); $('#pOk').onclick=()=>{closeModal();renderGame()};
}
function inJanela(){ const o=OFF[S.office]; if(o.type!=='leg'||o.sys!=='prop') return true; return S.q===1&&elecType(S.year)===o.el; }
function showTrocar(){
  const jan=inJanela(), prop=OFF[S.office].sys==='prop';
  let h=`<div class="sheet-pad"><div class="eyebrow">Filiação partidária</div><h2>Trocar de partido</h2><p class="txt">${prop?(jan?'A janela partidária está aberta: você troca sem perder o mandato.':'Fora da janela partidária. Se trocar agora, o partido pede seu mandato por infidelidade e você o perde.'):'Seu cargo não depende da legenda: a troca não custa o mandato.'} Na nova legenda, a relação começa em 40.</p><div class="choices">`;
  for(const k in PARTIES){ if(k===S.party) continue; const p=PARTIES[k]; h+=`<button class="choice" data-p="${k}"><b><i class="dot" style="background:${PCOLOR[k]}"></i>${p.sig} · ${p.esp}</b><small>${p.bon}</small></button>`; }
  h+=`<button class="choice" data-p=""><b>Ficar no ${PARTIES[S.party].sig}</b></button></div></div>`;
  openModal(h);
  document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{ const k=b.dataset.p; closeModal(); if(!k) return renderGame();
    if(!spendAP()) return; S.doneQ.trocar=1; const old=PARTIES[S.party].sig; const oa=PARTIES[S.party].aff||{}, na=PARTIES[k].aff||{}; for(const x in oa) S.seg[x]=(S.seg[x]||0)-oa[x]*0.7; for(const x in na) S.seg[x]=(S.seg[x]||0)+na[x]*0.6; S.party=k; S.stats.pt=40; S.stats.cp=clamp(S.stats.cp-3,0,100); S.poll=null; S.allies.forEach(a=>{a.party=k;a.loy-=10});
    log(`Deixou o ${old} e se filiou ao ${PARTIES[k].sig}.`,'elec');
    if(prop&&!jan){ log('O antigo partido requereu o mandato por infidelidade partidária. Você perdeu o cargo.','bad'); leaveOffice(); }
    save(); renderGame(); if(S.ended) showEnding(); });
}

// ---------- finais ----------
const ENDINGS={
  faixa:{t:'A Faixa Consagrada',c:'Vitória magna',scene:'planalto',txt:'Dois mandatos presidenciais, contas em ordem e aprovação alta. Você deixa o Planalto como quem modernizou a República sem rasgar as instituições.'},
  cacique:{t:'O Cacique de Bastidores',c:'Vitória tática',scene:'congresso',txt:'Você entendeu que o Executivo queima quem o ocupa. Do plenário, controla relatorias, cargos e o orçamento por décadas, sem carregar o peso de nenhuma crise.'},
  impeachment:{t:'O Impeachment',c:'Derrota por paralisia institucional',scene:'tribunal',txt:'Sem ruas e sem plenário, os dois escudos caíram ao mesmo tempo. Você foi afastado(a) e perdeu os direitos políticos por oito anos.'},
  cassacao:{t:'Mandato Cassado',c:'Derrota por quebra de decoro',scene:'tribunal',txt:'O plenário cassou seu mandato. Pela Lei da Ficha Limpa, você fica inelegível por oito anos depois do fim da legislatura.'},
  renuncia:{t:'A Renúncia',c:'Derrota por antecipação',scene:'imprensa',txt:'Você renunciou antes do voto final. A Ficha Limpa também alcança quem renuncia com processo aberto: oito anos fora das urnas.'},
  inelegivel:{t:'Diploma Cassado',c:'Derrota por abuso de poder',scene:'tribunal',txt:'A Justiça Eleitoral cassou seu diploma por compra de votos e declarou você inelegível. A carreira acaba no tribunal, não na urna.'},
  prisao:{t:'Operação República',c:'Derrota por ilícito penal',scene:'pf',txt:'Sem o escudo do mandato, a Polícia Federal bateu à porta às seis da manhã. A condenação veio em regime fechado.'},
  ostracismo:{t:'O Ostracismo',c:'Derrota por decadência',scene:'skyline',txt:'Duas derrotas seguidas e nenhum aliado atende seu telefone. Você vira comentarista ocasional numa rádio do interior.'},
  privado:{t:'Rumo ao Setor Privado',c:'Desfecho neutro',scene:'skyline',txt:'Com a ficha limpa e a paciência esgotada, você deixa a vida pública e funda uma consultoria de risco político em São Paulo.'},
  aposentadoria:{t:'A Aposentadoria',c:'Fim natural de carreira',scene:'campo',txt:'Você pendura as chuteiras. O legado está nos números abaixo.'},
  ex_pres:{t:'Ex-Presidente da República',c:'Desfecho histórico',scene:'planalto',txt:'Você chegou ao topo. Saiu do Planalto sem a consagração plena, mas com o nome nos livros de história.'},
  tce:{t:'Conselheiro Vitalício',c:'Aposentadoria dourada',scene:'tribunal',txt:'Você trocou as urnas por uma cadeira vitalícia no Tribunal de Contas. Salário alto, poder discreto, nenhuma eleição pela frente.'},
};
function end(k,extra){ if(S.ended) return; S.ended={k,extra:extra||'',year:S.year,age:S.age}; log('FIM DE CARREIRA: '+ENDINGS[k].t,'elec'); save(); }
function legacy(){ const st=S.stats; return Math.max(0,Math.round(S.maxLvl*12+AP()/2+st.et/2+st.cp/3-st.rj/2+S.elections.filter(e=>e.win).length*4)) }
function voluntaryEnd(k){
  if(k==='privado'&&S.stats.et>=60) end('privado');
  else if(k==='cacique') end('cacique');
  else end('aposentadoria','Você decidiu parar por conta própria.');
  save(); renderGame(); showEnding();
}

// ---------- persistência ----------
