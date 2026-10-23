// ================= INTERFACE v2 =================
const CATCOL={base:'#2FD08A',midia:'#5AA9FF',partido:'#E0A43A',dinheiro:'#9BD36A',leg:'#B48CFF',exec:'#5FD0C0',pres:'#F2C14E',juridico:'#FF8A65',camp:'#FF6B9A'};
function openModal(h){ $('#modal').innerHTML=`<div class="overlay" role="dialog" aria-modal="true"><div class="sheet">${h}</div></div>`; const f=$('#modal .choice:not([disabled]), #modal .cta'); if(f) f.focus({preventScroll:true}); }
function closeModal(){ $('#modal').innerHTML=''; }
let toastT=null;
function toast(msg,out,bad){ const t=$('#toast'); t.className='toast'+(bad?' bad':''); t.innerHTML=esc(msg)+(out?fxHTML(out,true).replace('class="fx"','class="fx" style="margin-top:6px"'):''); t.hidden=false; t.style.animation='none'; void t.offsetWidth; t.style.animation=''; clearTimeout(toastT); toastT=setTimeout(()=>t.hidden=true,2800); }
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- transição de trimestre ----------
function showTransition(first){
  const t=$('#trans'); if(!S) return;
  let deltas='';
  if(!first&&S.qPrev){ const a=S.qPrev.st,b=S.stats; const d={}; ['cp','ip','et','rj','pt'].forEach(k=>{const v=b[k]-a[k]; if(Math.abs(v)>=1) d[k]=v}); const ap=AP()-S.qPrev.ap; if(Math.abs(ap)>=1) d.ap=ap; deltas=fxHTML(d,false); }
  const ne=nextElectionInfo();
  t.innerHTML=`<div class="trans" id="trI"><span class="y">${S.year} · ${S.age} anos</span><div class="q">${S.q}º trimestre</div>${deltas}<span class="muted" style="font-size:13px">${inCampaign()?'Campanha nas ruas':ne.quarters<=1?'A eleição se aproxima':`Faltam ${ne.quarters} trimestres para a eleição ${ne.t==='mun'?'municipal':'geral'}`}</span><span class="muted" style="font-size:11px">Toque para continuar</span></div>`;
  const el=$('#trI'); const close=()=>{ if(!el.isConnected) return; el.classList.add('out'); setTimeout(()=>{ if(el.isConnected) t.innerHTML=''; },400); };
  el.onclick=close; setTimeout(close,RM()?600:1900); SFX.whoosh();
}
function showWeekBanner(){
  const c=S.campaign; if(!c) return; const t=$('#trans');
  let line='';
  if(c.polls.length>=2&&sys(c.off)!=='prop'){ const a=c.polls[c.polls.length-2].s,b=c.polls[c.polls.length-1].s; const d=(b.me-a.me)*100; line=`<span class="mono" style="color:var(${d>=0?'--green':'--red'})">Você ${d>=0?'+':''}${d.toFixed(1)} pontos na pesquisa</span>`; }
  t.innerHTML=`<div class="trans" id="trI"><span class="y">Campanha · ${oname(c.off)}</span><div class="q">Semana ${c.week+1}</div>${line}<span class="muted" style="font-size:11px">Toque para continuar</span></div>`;
  const el=$('#trI'); const close=()=>{ if(!el.isConnected) return; el.classList.add('out'); setTimeout(()=>{ if(el.isConnected) t.innerHTML=''; },400); };
  el.onclick=close; setTimeout(close,RM()?500:1400);
}

// ---------- tela inicial ----------
let SETUP_ANIM=true, SUGN=0;
function lookOf(){ if(!SETUP.look) SETUP.look=randomLook(SETUP.gen,SETUP.nome||'x'); return SETUP.look; }
function prevAvatar(){ return avatar('me-setup',SETUP.gen,PCOLOR[SETUP.party],{ring:'#F2C14E',look:lookOf()}); }
function spectrum(pos){ return `<div class="spec"><i style="left:${(pos+1)*50}%"></i></div><div class="spec-l"><span>Esquerda</span><span>Centro</span><span>Direita</span></div>`; }
// ---------- HUD ----------
function nextElectionInfo(){
  let y=S.year; while(!(elecType(y)&&(y>S.year||S.q<=3))) y++;
  return {y,t:elecType(y),quarters:(y-S.year)*4+(3-S.q)};
}
function gauge(k,label,v,cls){
  const C=2*Math.PI*26, col={gold:'var(--gold)',blue:'var(--blue)'}[cls]||'var(--green)';
  const pv=PREV&&PREV[k]!=null?PREV[k]:v;
  return `<div class="gauge" data-k="${k}" data-info="${k}" role="button" tabindex="0"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="var(--panel3)" stroke-width="6"/><circle class="ring" data-to="${(C*(1-v/100)).toFixed(1)}" cx="32" cy="32" r="26" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C*(1-pv/100)).toFixed(1)}" transform="rotate(-90 32 32)"/></svg><span class="v">${Math.round(v)}</span><span class="l">${label}</span></div>`;
}
function mbar(k,label,val,w,cls){return `<div class="mbar" data-k="${k}" ${RES_INFO[k]?`data-info="${k}" role="button" tabindex="0"`:''}><div class="t"><span>${label}</span><b>${val}</b></div><div class="bar ${cls||''}"><i style="width:${clamp(w,0,100)}%"></i></div></div>`}
function noticeHTML(){
  const ne=nextElectionInfo();
  if(inCampaign()){ const c=S.campaign; return `<div class="notice hot"><span><b>Campanha: ${oname(c.off)}</b> · semana ${c.week+1} de ${c.weeks}</span><button class="ghost sm" data-tab="campanha">Abrir sala de guerra</button></div>`; }
  let n='';
  if(S.cabinet&&cabSlots().some(k=>!S.cabinet[k])) n+=`<div class="notice hot"><span>Há pastas vagas no seu primeiro escalão. Elas custam saúde fiscal todo trimestre.</span><button class="ghost sm" data-tab="equipe">Nomear</button></div>`;
  if(elecType(S.year)&&S.q===2) n+=`<div class="notice hot"><span>Convenções partidárias no fim deste trimestre. Eleições ${elecType(S.year)==='mun'?'municipais':'gerais'} em outubro.</span></div>`;
  else if(elecType(S.year)&&S.q===3) n+=`<div class="notice"><span>Eleições neste trimestre. Você não é candidato${S.gen==='f'?'a':''}.</span></div>`;
  else n+=`<div class="notice"><span>Próxima eleição <b>${ne.t==='mun'?'municipal':'geral'}</b> em outubro de ${ne.y} · faltam <span class="mono">${ne.quarters}</span> trimestres</span>${OFF[S.office].sys==='prop'&&inJanela()&&OFF[S.office].type==='leg'?'<span class="muted">Janela partidária aberta</span>':''}</div>`;
  return n;
}
function bind(){
  document.querySelectorAll('#app [data-tab]').forEach(b=>b.onclick=()=>goTab(b.dataset.tab));
  document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{CAT=b.dataset.cat;renderGame()});
  document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>doAction(b.dataset.act));
  document.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>openDecision(+b.dataset.dec));
  document.querySelectorAll('[data-info]').forEach(b=>b.onclick=()=>showInfo(b.dataset.info));
  document.querySelectorAll('[data-paper]').forEach(b=>b.onclick=()=>{PAPER=+b.dataset.paper;SFX.page();renderGame()});
  document.querySelectorAll('[data-vend]').forEach(b=>b.onclick=()=>askEnd(b.dataset.vend));
  document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=()=>allyFavor(b.dataset.fav));
  document.querySelectorAll('[data-gift]').forEach(b=>b.onclick=()=>allyGift(b.dataset.gift));
  document.querySelectorAll('[data-staff]').forEach(b=>b.onclick=()=>toggleStaff(b.dataset.staff));
  document.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>showNominate(b.dataset.slot));
  document.querySelectorAll('[data-reg]').forEach(b=>{ const go=()=>{S.campaign.focus=+b.dataset.reg;save();renderGame()}; b.onclick=go; b.onkeydown=e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); go(); } }; });
  document.querySelectorAll('[data-verba]').forEach(b=>b.onclick=()=>{S.campaign.verba=+b.dataset.verba;save();renderGame()});
  const rc=$('#recruit'); if(rc) rc.onclick=showRecruit;
  const ft=$('#fillTec'); if(ft) ft.onclick=fillTechnicians;
  const pq=$('#doPoll'); if(pq) pq.onclick=()=>doAction('pesquisa');
  const e2=$('#endT2'); if(e2) e2.onclick=endTurn;
  const tp=$('#trocaP'); if(tp) tp.onclick=()=>{ if(S.doneQ.trocar) return toast('Você já mudou de partido neste trimestre.'); showTrocar(); };
}

// ---------- agenda ----------
function actionsHTML(filterCats){
  const list=ACTIONS.map(a=>({a,c:canDo(a)})).filter(x=>!x.c.hide&&(!filterCats||filterCats.includes(x.a.cat)));
  const counts={}; list.forEach(x=>counts[x.a.cat]=(counts[x.a.cat]||0)+1);
  if(CAT!=='todas'&&!counts[CAT]) CAT='todas';
  let h=`<div class="cats">${CATS.filter(([k])=>k==='todas'||counts[k]).map(([k,l])=>`<button data-cat="${k}" aria-pressed="${CAT===k}">${k!=='todas'?`<span style="color:${CATCOL[k]}">${icon(k)}</span>`:''}${l}<span class="n">${k==='todas'?list.length:counts[k]}</span></button>`).join('')}</div><div class="acts">`;
  const shown=list.filter(x=>CAT==='todas'||x.a.cat===CAT).sort((x,y)=>(y.c.ok-x.c.ok)||((y.a.cat==='camp')-(x.a.cat==='camp')));
  shown.forEach(({a,c},i)=>{
    const cost=a.o.ap||1, rep=recentUses(a.id), col=CATCOL[a.cat];
    h+=`<button class="act rise" style="--i:${Math.min(i,14)}" data-act="${a.id}" ${c.ok?'':'disabled'}><span class="ic" style="background:${col}22;color:${col}">${icon(a.cat)}</span><div class="h"><b>${esc(genderize(a.n))}</b><span class="cost">${cost>1?cost+' ações':'1 ação'}</span></div><p>${esc(genderize(a.d))}</p><div>${fxHTML(a.fx)}${a.o.risk?'<div class="fx" style="margin-top:4px"><span class="w">Pode dar errado</span></div>':''}${rep?`<div class="fx" style="margin-top:4px"><span class="w">Repetição: efeito menor</span></div>`:''}${c.why?`<span class="why">${esc(genderize(c.why))}</span>`:''}</div></button>`;
  });
  return h+'</div>';
}
function decisionsHTML(){
  if(inCampaign()||!S.dec) return '';
  const left=S.dec.filter(d=>!d.done).length;
  return `<section class="sect"><h2>Decisões do trimestre <span class="mono muted" style="font-size:14px">${4-left}/4</span></h2>
   <div class="legend"><span><i style="background:var(--red)"></i>Crise: todas as saídas custam</span><span><i style="background:var(--slate)"></i>Dilema: ganha e perde</span><span><i style="background:var(--green)"></i>Oportunidade: todas ajudam</span></div>
   <div class="decs">${S.dec.map((d,i)=>{const T=THEMES.find(t=>t.k===d.th); const ev=d.done?null:buildDecision(d); const tn=TONES[d.tone||'dilema'];
    return `<button class="dec tone-${d.tone||'dilema'} ${SETUP_ANIM?'':'rise'} ${d.done?'done':''}" style="--i:${i};--tc:${tn.col}" data-dec="${i}" ${d.done?'disabled':''}><span class="dic">${icon(T.ic)}</span><span class="dt"><small><b class="tb">${tn.n}</b> · ${T.n}</small><b>${esc(d.done?d.title:genderize(fill(ev.t)))}</b><small>${d.done?esc(d.head):tn.d}</small></span>${d.done?'<span class="ok">✓</span>':'<span class="go">›</span>'}</button>`}).join('')}</div></section>`;
}
// ---------- campanha ----------
function candColor(c,i){ return c.isMe?'var(--gold)':PCOLOR[c.party]||['#9AA7C2','#C77DFF','#7FD1FF'][i%3] }
function mapHTML(regs,fills,labels,focus,clickable){
  return `<svg viewBox="0 0 300 220" class="mapsvg" role="img" aria-label="Mapa das regiões">${MAPSHAPES.map((m,i)=>`<path d="${m.d}" fill="${fills[i]}" ${clickable?`data-reg="${i}" tabindex="0"`:''} class="${focus===i?'focus':''}"><title>${esc(regs[i].n)}</title></path>`).join('')}${MAPSHAPES.map((m,i)=>`<text x="${m.x}" y="${m.y}">${esc(regs[i].n)}</text><text x="${m.x}" y="${m.y+13}" style="font-weight:600">${labels[i]||''}</text>`).join('')}</svg>`;
}
function trendChart(c){
  const W=320,H=150,pad=26; const pts=c.polls; if(!pts.length) return '';
  const xs=i=>pad+(W-pad-10)*(pts[i].w/6);
  if(sys(c.off)==='prop'){
    const mx=Math.max(...pts.map(p=>Math.max(p.votes,p.cut)))*1.2; const ys=v=>H-20-(H-34)*(v/mx);
    const line=pts.map((p,i)=>`${xs(i).toFixed(1)},${ys(p.votes).toFixed(1)}`).join(' ');
    return `<svg viewBox="0 0 ${W} ${H}" class="chart"><line x1="${pad}" x2="${W-10}" y1="${ys(pts[0].cut)}" y2="${ys(pts[0].cut)}" stroke="var(--gold)" stroke-dasharray="4 4"/><text x="${W-10}" y="${ys(pts[0].cut)-4}" text-anchor="end">corte da legenda</text><polyline points="${line}" fill="none" stroke="var(--green)" stroke-width="2.5"/>${pts.map((p,i)=>`<circle cx="${xs(i)}" cy="${ys(p.votes)}" r="3" fill="var(--green)"/>`).join('')}${[0,1,2,3,4,5,6].map(w=>`<text x="${pad+(W-pad-10)*(w/6)}" y="${H-4}" text-anchor="middle">${w===0?'início':w}</text>`).join('')}</svg>`;
  }
  const ids=c.field.cands.map(x=>x.id); const mx=Math.max(.4,...pts.flatMap(p=>Object.values(p.s)))*1.1; const ys=v=>H-20-(H-34)*(v/mx);
  let s=`<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Tendência das pesquisas">`;
  [0,.1,.2,.3,.4,.5,.6].filter(v=>v<mx).forEach(v=>s+=`<line x1="${pad}" x2="${W-10}" y1="${ys(v)}" y2="${ys(v)}" stroke="var(--line)"/><text x="${pad-4}" y="${ys(v)+3}" text-anchor="end">${Math.round(v*100)}</text>`);
  c.field.cands.forEach((cd,ci)=>{ const p=pts.map((pp,i)=>pp.s[cd.id]!=null?`${xs(i).toFixed(1)},${ys(pp.s[cd.id]).toFixed(1)}`:null).filter(Boolean); if(!p.length) return;
    const last=p[p.length-1].split(','); s+=`<polyline points="${p.join(' ')}" fill="none" stroke="${candColor(cd,ci)}" stroke-width="${cd.isMe?3:1.8}" opacity="${cd.out?.35:1}"/><circle cx="${last[0]}" cy="${last[1]}" r="${cd.isMe?4:3}" fill="${candColor(cd,ci)}"/>`+pts.map((pp,i)=>pp.s[cd.id]!=null?`<circle cx="${xs(i).toFixed(1)}" cy="${ys(pp.s[cd.id]).toFixed(1)}" r="7" fill="transparent" data-tip="${esc(cd.name)} · semana ${pp.w}: ${pct(pp.s[cd.id])}"/>`:'').join(''); });
  [0,1,2,3,4,5,6].forEach(w=>s+=`<text x="${pad+(W-pad-10)*(w/6)}" y="${H-4}" text-anchor="middle">${w===0?'início':w}</text>`);
  return s+'</svg>';
}
function campanhaHTML(){
  if(!inCampaign()) return campPreviewHTML();
  const c=S.campaign, k=c.off, prop=sys(k)==='prop', last=c.polls[c.polls.length-1], prev=c.polls[c.polls.length-2];
  const regs=c.field.regs;
  let intent='', fills, labels;
  if(prop){
    const r=propResult(k,c.field,c,false);
    const rows=[{c:c.field.cands[0],v:last.votes}].concat(r.rivals.map(x=>({c:x.c,v:x.votes}))).sort((a,b)=>b.v-a.v); const mx=Math.max(...rows.map(x=>x.v),last.cut)*1.15;
    intent=rows.map((x,i)=>`<div class="cand-row">${x.c.isMe?myPortrait('av-sm'):portrait(x.c,'av-sm')}<div class="nm"><b>${esc(x.c.name)}</b><small>${x.c.isMe?'Você':'Colega de chapa'} · ${PARTIES[x.c.party].sig}</small></div><div class="pc">${fmt(x.v)}<small>votos</small></div><div class="tr" style="position:relative"><i style="width:${x.v/mx*100}%;background:${x.c.isMe?'var(--gold)':'#6B7A99'}"></i><span class="cutline" style="left:${last.cut/mx*100}%"></span></div></div>`).join('')+`<p class="muted" style="margin:0;font-size:12.5px">Linha dourada: votação estimada do último eleito da legenda (${fmt(last.cut)}). Na lista aberta, você disputa vaga com os próprios colegas de chapa.</p>`;
    const tot=r.regVotes.reduce((a,b)=>a+b,0);
    fills=r.regVotes.map(v=>`rgba(242,193,78,${(0.2+0.8*Math.min(1,v/tot*3)).toFixed(2)})`); labels=r.regVotes.map(v=>fmt(v));
  } else {
    const sh=fieldShares(k,c.field,c,false);
    const rows=sh.alive.map((x,i)=>({c:x,s:last.s[x.id]??sh.tot[i],d:prev&&prev.s[x.id]!=null?(last.s[x.id]-prev.s[x.id]):0})).sort((a,b)=>b.s-a.s);
    intent=rows.map(x=>`<div class="cand-row">${x.c.isMe?myPortrait('av-sm'):portrait(x.c,'av-sm')}<div class="nm"><b>${esc(x.c.name)}</b><small>${PARTIES[x.c.party].sig}${x.c.isMe?' · você':' · '+genderize(profName(x.c.prof),x.c.gen)}</small></div><div class="pc">${pct(x.s)}<small style="color:var(${x.d>=0?'--green':'--red'})">${x.d?((x.d>0?'▲ ':'▼ ')+(Math.abs(x.d)*100).toFixed(1)):'—'}</small></div><div class="tr"><i style="width:${x.s*100}%;background:${candColor(x.c,0)}"></i></div></div>`).join('')+`<p class="muted" style="margin:0;font-size:12.5px">${sys(k)==='maj2'?'Se ninguém passar de 50% dos válidos, os dois primeiros vão ao 2º turno.':'Turno único: vence quem tiver mais votos.'}</p>`;
    fills=regs.map((r,ri)=>{ const p=sh.perReg[ri]; let bi=0; p.forEach((v,i)=>{if(v>p[bi])bi=i}); const cd=sh.alive[bi]; const op=0.35+0.65*Math.min(1,(p[bi]-0.2)*2.5); return cd.isMe?`rgba(242,193,78,${op.toFixed(2)})`:hexA(PCOLOR[cd.party],op); });
    labels=regs.map((r,ri)=>{ const i=sh.alive.findIndex(x=>x.isMe); return 'você '+Math.round(sh.perReg[ri][i]*100)+'%'; });
  }
  const rivals=c.field.cands.filter(x=>!x.isMe);
  const wk=Array.from({length:6},(_,i)=>`<span class="${i<c.week?'done':i===c.week?'now':''}">${i===3&&!prop?'debate':'S'+(i+1)}</span>`).join('');
  const V=VERBA;
  return `<section class="sect"><div class="card"><div class="hd"><div><span class="eyebrow">Sala de guerra</span><h3 style="font-size:24px">${oname(k)} · ${esc(placeName(k))}</h3></div><span class="mono muted">${fmt(electorate(k))} eleitores</span></div><div class="week">${wk}</div></div>
   <div class="grid2">
    <div class="card"><div class="hd"><h3>${prop?'Projeção de votos':'Intenção de voto'}</h3><span class="muted" style="font-size:12px">semana ${c.week}</span></div>${intent}</div>
    <div class="card"><div class="hd"><h3>Tendência</h3><span class="muted" style="font-size:12px">pesquisas semanais</span></div>${trendChart(c)}</div>
    <div class="card"><div class="hd"><h3>Mapa</h3><span class="muted" style="font-size:12px">toque para escolher o foco</span></div>${mapHTML(regs,fills,labels,c.focus,true)}<p class="muted" style="margin:0;font-size:12.5px">Foco da semana: <b style="color:var(--gold)">${esc(regs[c.focus].n)}</b>. Ações de campanha e a verba reforçam essa região.</p></div>
    <div class="card"><div class="hd"><h3>Verba da semana</h3><span class="muted" style="font-size:12px">cobrada ao encerrar a semana</span></div>
      <div class="verba">${V.map((v,i)=>`<button data-verba="${i}" aria-pressed="${c.verba===i}"><b>${v.n}</b><small>${v.cost?'R$ '+fmt(v.cost*OFF[k].sc)+' mil':'grátis'}</small><small>${v.d}</small></button>`).join('')}</div>
      <div class="kpis"><div class="kpi"><small>Força</small><b>${Math.round(c.camp)}</b></div><div class="kpi"><small>Gasto</small><b>R$ ${fmt(c.spend*OFF[k].sc)}</b></div><div class="kpi"><small>Rejeição</small><b style="color:${rejection()>8?'var(--red)':'var(--ink)'}">${Math.round(rejection())}</b></div></div>
      <button class="ghost sm" id="doPoll" ${canDo(ACT.pesquisa).ok?'':'disabled'}>Pesquisa interna: chance de vitória (1 ação)</button></div>
   </div>
   <div class="card"><h3>${prop?'Colegas de chapa':'Adversários'}</h3><div class="rivals">${rivals.map(r=>`<div class="rival ${r.out?'out':''}">${portrait(r,'av-md')}<div style="min-width:0"><b>${esc(r.name)}</b><small><i class="dot" style="background:${PCOLOR[r.party]}"></i>${PARTIES[r.party].sig} · ${genderize(profName(r.prof),r.gen)}</small><small>${r.out?'Desistiu':'Reduto: '+esc(regs[r.home].n)}${S.nemesis&&r.id===S.nemesis.id?' · seu rival histórico':''}</small></div></div>`).join('')}</div></div>
   <h2 style="font-size:22px">Agenda de campanha</h2>${actionsHTML()}</section>${segPanelHTML()}`;
}
function hexA(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16},${n>>8&255},${n&255},${a.toFixed(2)})`}
function campPreviewHTML(){ return eleitoradoHTML(); }
// ---------- equipe ----------
function equipeHTML(){
  const n=S.allies.length, mx=maxAllies();
  let h=`<section class="sect"><h2>Aliados <span class="mono muted" style="font-size:14px">${n}/${mx}</span></h2><p class="muted" style="margin:-4px 0 0;font-size:13.5px">Aliados leais (lealdade 30+) rendem um bônus todo trimestre. Pedir um favor gasta 18 de lealdade e o aliado descansa dois trimestres. Abaixo de 12 de lealdade, eles vão embora.</p><div class="allies">`;
  S.allies.forEach((a,i)=>{ const d=ALLY_DEF[a.t]; const fx=(a.shady&&d.shadyFx)?d.shadyFx:d.fx; const cost=Math.round(5*sc());
    h+=`<div class="ally rise" style="--i:${i}"><div class="top">${avatar(a.seed,a.gen,PCOLOR[a.party],{cls:'av-md'})}<div style="min-width:0;flex:1"><b>${esc(a.name)}</b><small>${genderize(d.n,a.gen)} · <span class="stars">${'★'.repeat(a.pow)}${'☆'.repeat(3-a.pow)}</span></small>${a.rumor?'<span class="tag">fama duvidosa</span>':''}</div></div>
     <div class="mbar" style="padding:0;border:0;background:none"><div class="t"><span>Lealdade</span><b>${Math.round(a.loy)}</b></div><div class="bar ${a.loy<30?'risk':''}"><i style="width:${a.loy}%"></i></div></div>
     <small class="muted">Todo trimestre: ${Object.keys(d.passive).map(k=>LBL[k]).join(', ')}${d.shield?` · ajuda a ${d.shield==='rua'?'encher as ruas':'segurar o plenário'} em crises`:''}</small>
     <div class="btns"><button class="ghost sm" data-fav="${a.id}" ${a.cd>0||a.loy<20?'disabled':''}>${esc(d.favor)}${a.cd>0?` (em ${a.cd} tri)`:''}</button><button class="ghost sm" data-gift="${a.id}" ${S.money<cost||a.gift===S.tick?'disabled':''}>Jantar · R$ ${fmt(cost)} mil</button></div>${fxHTML(scaleFx(fx,0.6+0.4*a.pow))}</div>`; });
  if(n<mx) h+=`<button class="addcard" id="recruit" ${S.doneQ.recruit?'disabled':''}><b style="font-size:26px">+</b><span>${S.doneQ.recruit?'Você já recrutou neste trimestre':'Recrutar aliado (1 por trimestre)'}</span></button>`;
  h+=`</div></section>`;
  h+=`<section class="sect"><h2>Equipe de gabinete</h2><p class="muted" style="margin:-4px 0 0;font-size:13.5px">Salários saem do caixa político todo trimestre (R$ ${fmt(staffCost())} mil agora).</p><div class="staff">${Object.entries(STAFF).map(([k,s])=>`<button class="staffc" data-staff="${k}" aria-pressed="${!!S.staff[k]}"><b>${s.n}</b><small>${s.d}</small><small class="mono">R$ ${fmt(s.sal*sc())} mil/tri · ${S.staff[k]?'contratado — toque para dispensar':'toque para contratar'}</small></button>`).join('')}</div></section>`;
  if(S.cabinet){
    const co=coalition(), groups=[]; const order=[S.party,...Object.keys(co.parts),...Object.keys(PARTIES).filter(p=>p!==S.party&&!co.parts[p])];
    order.forEach(p=>{ const seats=PARTIES[p].seats; const inb=p===S.party?seats:Math.round(seats*(co.sat[p]||0)); if(inb) groups.push({color:PCOLOR[p],n:inb}); if(seats-inb>0) groups.push({color:PCOLOR[p],n:seats-inb,dim:true}); });
    const house={pref:'Câmara Municipal',gov:'Assembleia Legislativa',pres:'Câmara dos Deputados'}[S.office];
    h+=`<section class="sect"><h2>${S.office==='pres'?'Ministério e coalizão':'Secretariado e base'}</h2><div class="card"><div class="hd"><h3>${house}</h3><span class="mono" style="color:var(--gold)">base ${Math.round(co.base)}%</span></div>${hemicycle(groups)}<p class="muted" style="margin:0;font-size:12.5px">Cores fortes: cadeiras na sua base. Cada partido entra com tantas pastas quanto o tamanho da bancada exige (uma a cada 12% de cadeiras). Sua articulação tende a ${Math.round(10+co.base*1.1)}.</p><div class="row" style="gap:6px">${Object.keys(PARTIES).map(p=>`<span class="pchip"><i class="dot" style="background:${PCOLOR[p]};margin:0"></i>${PARTIES[p].sig} ${PARTIES[p].seats}%${p===S.party?' · seu':co.parts[p]?' · base':''}</span>`).join('')}</div></div>
     <div class="row" style="justify-content:space-between"><span class="muted" style="font-size:13px">Toque numa pasta para nomear ou trocar o titular.</span>${cabSlots().some(k=>!S.cabinet[k])?'<button class="ghost sm" id="fillTec">Preencher vagas com técnicos</button>':''}</div>
     <div class="slots">${cabSlots().map((k,i)=>{const a=S.cabinet[k]; return a?`<button class="slot rise" style="--i:${i}" data-slot="${k}">${portrait(a,'av-md')}<span class="sn"><small>${esc(cabTitle(k))}</small><b>${esc(a.name)}</b><small>${a.party?PARTIES[a.party].sig:'Técnico(a)'} · competência ${a.comp}</small><span class="bar" style="margin-top:4px"><i style="width:${a.comp}%"></i></span></span></button>`:`<button class="slot empty rise" style="--i:${i}" data-slot="${k}"><span class="ph">!</span><span class="sn"><small>${esc(cabTitle(k))}</small><b>Vago</b><small>Toque para nomear</small></span></button>`}).join('')}</div></section>`;
  }
  return h;
}

// ---------- jornal ----------
let PAPER=-1;
function jornalHTML(){ return papersHTML(); }
// ---------- carreira ----------
function carreiraHTML(){
  const st=S.stats, leg=OFF[S.office].type==='leg';
  const canCacique=leg&&st.cp>=85&&st.ip>=90, canPriv=st.et>=60;
  const skel=['caixa2','rachadinha','licitacao','lobista','arlindo','relator','emendaPix','compraVotos','delegado'].filter(F).length;
  return `<section class="sect"><h2>Perfil</h2>${bioHTML()}<h2 style="font-size:20px;margin-top:6px">Carreira</h2>
   <div class="card"><div class="row" style="gap:14px">${myPortrait('av-lg')}<div><b style="font-family:var(--display);font-size:22px">${esc(S.nome)}</b><div class="muted" style="font-size:13px">${ARCH[S.arch].n} · ${PARTIES[S.party].sig} · ${S.age} anos</div><div class="mono" style="color:var(--gold)">Legado: ${legacy()} pontos</div></div></div></div>
   <div class="card"><h3>Mandatos</h3>${S.career.length?`<div class="timeline">${S.career.map(c=>`<div class="tl"><b>${oname(c.off)}</b><small>${c.from}–${c.to||'atual'} · ${c.party}</small></div>`).join('')}</div>`:'<p class="muted" style="margin:0">Nenhum mandato ainda.</p>'}</div>
   <div class="card"><h3>Eleições</h3><div class="tbl-wrap"><table><tr><th>Ano</th><th>Cargo</th><th>Resultado</th><th>Votação</th></tr>${S.elections.length?S.elections.map(e=>`<tr><td class="mono">${e.y}</td><td>${oname(e.off)}</td><td style="color:var(${e.win?'--green':'--red'})">${e.win?'Eleito'+(S.gen==='f'?'a':''):'Derrota'}</td><td class="n">${e.desc}</td></tr>`).join(''):'<tr><td colspan="4" class="muted">Nenhuma eleição ainda.</td></tr>'}</table></div></div>
   <div class="card"><h3>Esqueletos no armário</h3><p style="margin:0">${skel?`Há <b style="color:var(--red)">${skel}</b> episódio(s) irregular(es) que ainda podem voltar como investigação.`:'Nenhum episódio irregular registrado. Por enquanto.'}</p></div>
   <div class="card"><h3>Filiação partidária</h3><div class="row"><span class="pchip"><i class="dot" style="background:${PCOLOR[S.party]};margin:0"></i>${PARTIES[S.party].sig} · ${PARTIES[S.party].esp}</span><button class="ghost sm" id="trocaP">Trocar de partido</button></div><p class="muted" style="margin:0;font-size:12.5px">${OFF[S.office].sys==='prop'&&OFF[S.office].type==='leg'?(inJanela()?'Janela partidária aberta: você troca sem perder o mandato.':'Fora da janela partidária: trocar agora custa o mandato.'):'Seu cargo atual não depende da legenda.'}</p></div>
   <div class="card"><h3>Salvar e continuar depois</h3><p class="muted" style="margin:0;font-size:13px">Sua carreira é salva automaticamente neste navegador. Para jogar em outro aparelho, copie o código e cole na tela inicial.</p><div class="row"><button class="ghost sm" id="expBtn">Copiar código da carreira</button><button class="ghost sm" id="menuHome">Voltar à tela inicial</button></div></div>
   <div class="card"><h3>Encerrar a carreira</h3><div class="row"><button class="ghost" data-vend="cacique" ${canCacique?'':'disabled'}>Virar cacique de bastidores</button><button class="ghost" data-vend="privado" ${canPriv?'':'disabled'}>Ir para o setor privado</button><button class="ghost" data-vend="aposentadoria">Aposentar-se</button></div><p class="muted" style="margin:0;font-size:12.5px">Cacique exige mandato legislativo, Capital 85+ e Articulação 90+. Setor privado exige Ética 60+.</p></div>
   ${manualHTML()}</section>`;
}
function askEnd(k){
  const t={cacique:'Virar cacique de bastidores',privado:'Ir para o setor privado',aposentadoria:'Aposentar-se'}[k];
  openModal(`<div class="sheet-pad"><div class="eyebrow">Decisão irreversível</div><h2>${t}?</h2><p class="txt">A carreira termina aqui e o desfecho é calculado com seus indicadores atuais.</p><div class="row"><button class="cta" id="yEnd">Confirmar</button><button class="ghost" id="nEnd">Voltar</button></div></div>`);
  $('#yEnd').onclick=()=>voluntaryEnd(k); $('#nEnd').onclick=closeModal;
}
function manualHTML(){
  return `<details class="card"><summary style="cursor:pointer;font-family:var(--display);font-size:18px;font-weight:700">Como jogar</summary><div class="prose" style="margin-top:10px">
  <p>Cada trimestre traz 4 decisões obrigatórias, uma por tema (Ruas, Imprensa, Bastidores, Gabinete), geradas pelo que está acontecendo: pautas quentes, seu cargo, aliados, rivais e escolhas anteriores. Crise: todas as saídas custam algo. Dilema: cada opção ganha de um lado e perde do outro. Oportunidade: todas as opções ajudam, e você escolhe quem ganha. As ações de agenda ficam para a campanha: 3 por semana (4 com chefe de gabinete). Eleições municipais em 2028, 2032…; gerais em 2030, 2034…. A convenção é no fim do 2º trimestre e a campanha ocupa o 3º, em seis semanas.</p>
  <ul><li><b>Campanha:</b> escolha a região de foco no mapa, a verba da semana e as ações. Pesquisas saem toda semana. Na semana 4 há debate nos cargos majoritários.</li>
  <li><b>Adversários</b> mudam a cada eleição. Quem vence você vira seu rival histórico e volta mais forte.</li>
  <li><b>Aliados</b> rendem bônus fixos e favores. Os de fama duvidosa podem delatar você se o risco judicial subir.</li>
  <li><b>Primeiro escalão:</b> no Executivo, técnicos melhoram resultados; políticos trazem as bancadas dos partidos para a base. A articulação segue o tamanho da base.</li>
  <li><b>Escudo duplo:</b> com risco judicial acima de 55 pode abrir processo de cassação ou impeachment. Sobrevive quem tem ruas ou plenário.</li>
  <li>Regras reais: janela partidária, desincompatibilização, Ficha Limpa, segundo turno só acima de 200 mil eleitores, lista aberta.</li></ul>
  <div class="formula">força na região = 0,42·Aprovação(classes da região) + 0,18·Capital + 0,10·Articulação
  + 0,08·Partido − rejeição + 0,12·Força de campanha + 0,30·esforço na região + 1,6·ln(1+gasto)
votos = softmax das forças dos candidatos em cada região, somado pelo peso das regiões</div>
  <p class="muted">${ACTIONS.length} ações e ${EVENTS.length} histórias fixas, além de crises, escândalos e eventos de campanha gerados.</p></div></details>`;
}

// ---------- eventos ----------
function eventScene(ev){ return ev.scene||SCENE_MAP[ev.id]||(ev.o&&ev.o.camp?'comicio':HOUSE_SCENE[S.office]) }
function eventWho(ev){
  if(ev.who) return ev.who;
  if(/arlindo|empresario|op_sacola/.test(ev.id)) return {name:'Seu Arlindo Prates',gen:'m',seed:'arlindo',party:null};
  if((ev.txt+ev.t).includes('{rival}')) return S.nemesis;
  return null;
}
function showEvent(ev,opt){
  opt=opt||{}; window.CUR_EV=ev;
  if(EVENTS.includes(ev)&&!opt.back) S.seen[ev.id]=(S.seen[ev.id]||0)+1;
  const tn=opt.tone?TONES[opt.tone]:null; if(tn) (opt.tone==='crise'?SFX.alarm():SFX.open());
  const tag=(tn?tn.n+' · ':'')+(opt.theme?opt.theme.n+' · ':'')+(ev.tag||(ev.o&&ev.o.camp?'Campanha · '+oname(S.campaign?S.campaign.off:S.office):OFF[S.office].house));
  const who=eventWho(ev);
  let h=`<div class="sheet-scene">${scene(eventScene(ev),{seed:ev.id})}${who?`<div class="who">${who.isMe?myPortrait('av-lg'):portrait(who,'av-lg')}<span>${esc(who.name)}</span></div>`:''}</div>
   <div class="sheet-pad"><div class="eyebrow">${esc(tag)} · ${inCampaign()?'semana '+(S.campaign.week):qlabel(S.q,S.year)}</div><h2>${esc(genderize(fill(ev.t)))}</h2><p class="txt">${esc(genderize(fill(ev.txt)))}</p>${tn?`<p class="tone-note" style="--tc:${tn.col}">${tn.n}: ${tn.d.toLowerCase()}</p>`:''}<div class="choices">`;
  ev.ch.forEach((c,i)=>{ const unc=c.p!=null; h+=`<button class="choice ${opt.tone?'tone-'+opt.tone:''}" data-c="${i}"><b>${esc(genderize(fill(c.l)))}</b>${c.d?`<small>${esc(c.d)}</small>`:''}${(()=>{const z=zoneOfAreas(c.fx||{}); return z.ab.length?`<small class="att-ab">Atende área abandonada: ${esc(z.ab.join(', '))}</small>`:z.sat.length?`<small class="att-sat">Reforça área já saturada: ${esc(z.sat.join(', '))}</small>`:''})()}${c.hint?`<small>${c.hint}</small>`:unc?'<small>Resultado incerto</small>':''}${fxHTML(c.fx)}</button>`; });
  openModal(h+'</div>'+(opt.back?'<button class="ghost sm" id="evBack" style="align-self:flex-start">Decidir depois</button>':'')+'</div>');
  document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>resolveChoice(ev,ev.ch[+b.dataset.c]));
  const bk=$('#evBack'); if(bk) bk.onclick=()=>{S.decOpen=null;closeModal();renderGame()};
}
function showResult(ev,txt,out,ok,later){
  const h=`<div class="sheet-pad res"><div class="clip ${ok?'':'bad'}"><div class="m"><span>Gazeta Cívica de ${esc(CITIES[S.city].n)}</span><span>${ok?'Edição extra':'Urgente'}</span></div><h3>${esc(genderize(fill(ev.t)))}</h3><p>${esc(txt)}</p></div>${fxHTML(out,true)}${later?`<p class="later">Parte do efeito ainda vai repercutir nos próximos trimestres:</p>${fxHTML(later)}`:''}<button class="cta" id="evOk">Continuar</button></div>`;
  openModal(h); $('#evOk').onclick=runQueue; $('#evOk').focus();
}

// ---------- apuração ----------
function confetti(){ if(RM()) return; const cols=['#F2C14E','#2FD08A','#5AA9FF','#FF6B9A','#FFFFFF'];
  for(let i=0;i<70;i++){ const e=document.createElement('i'); e.className='conf'; e.style.left=Math.random()*100+'vw'; e.style.background=cols[i%5]; e.style.animationDuration=(1.8+Math.random()*1.8)+'s'; e.style.animationDelay=(Math.random()*.6)+'s'; document.body.appendChild(e); setTimeout(()=>e.remove(),4200); } }
function showApuracao(k,r,round,done){
  const prop=r.sys==='prop', regs=regionsFor(k), N=electorate(k), valid=N*0.79;
  const start=regs.map(g=>0.35*(1-(g.mix[0]+g.mix[1])/0.9));
  let rows='';
  if(prop){ const all=[{c:{isMe:true,name:S.nome,party:S.party},v:r.votes}].concat(r.rivals.map(x=>({c:x.c,v:x.votes}))); r._rows=all; const mx=Math.max(...all.map(x=>x.v),r.cut)*1.2; r._mx=mx;
    rows=all.map((x,i)=>`<div class="cand-row">${x.c.isMe?myPortrait('av-sm'):portrait(x.c,'av-sm')}<div class="nm"><b>${esc(x.c.name)}</b><small>${x.c.isMe?'Você':'Colega de chapa'}</small></div><div class="pc" id="pv${i}">0</div><div class="tr" style="position:relative"><i id="pb${i}" style="width:0;transition:none;background:${x.c.isMe?'var(--gold)':'#6B7A99'}"></i><span class="cutline" style="left:${r.cut/mx*100}%"></span></div></div>`).join('');
  } else { r._alive=r.shares.alive;
    rows=r._alive.map((c,i)=>`<div class="cand-row">${c.isMe?myPortrait('av-sm'):portrait(c,'av-sm')}<div class="nm"><b>${esc(c.name)}</b><small>${PARTIES[c.party].sig}</small></div><div class="pc" id="pv${i}">0,0%</div><div class="tr"><i id="pb${i}" style="width:0;transition:none;background:${candColor(c,i)}"></i></div></div>`).join(''); }
  const h=`<div class="sheet-scene" style="height:110px">${scene('urna',{seed:'apu'+round})}</div><div class="sheet-pad"><div class="eyebrow">Totalização · Justiça Eleitoral${round===2?' · 2º turno':''}</div><h2>${oname(k)} · ${esc(placeName(k))}</h2>
   <div class="apu"><div class="prog"><span>Seções apuradas</span><span id="apuPct">0,00%</span></div><div class="bar gold"><i id="apuBar" style="width:0;transition:none"></i></div>
   <div id="apuMap">${mapHTML(regs,regs.map(()=>'#1D2A44'),[],-1,false)}</div>${rows}${prop?`<p class="muted" style="margin:0;font-size:12.5px">Linha dourada: corte estimado da legenda (${fmt(r.cut)} votos). Quociente eleitoral: ${fmt(r.qe)}.</p>`:''}</div><div id="apuEnd"></div></div>`;
  openModal(h);
  const t0=performance.now(), D=RM()?1:4200;
  function frame(now){
    if(!$('#apuPct')) return;
    const t=clamp((now-t0)/D,0,1), e=1-Math.pow(1-t,1.6);
    const cf=start.map(s=>clamp((e-s)/(1-s),0,1)); const W=regs.reduce((a,g,i)=>a+g.w*cf[i],0)||1e-9;
    $('#apuPct').textContent=(regs.reduce((a,g,i)=>a+g.w*cf[i],0)*100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%'; $('#apuBar').style.width=(W*100)+'%';
    let fills, labels=[];
    if(prop){ r._rows.forEach((x,i)=>{ const v=x.c.isMe?r.regVotes.reduce((a,rv,ri)=>a+rv*cf[ri],0):x.v*W; $('#pv'+i).textContent=fmt(v); $('#pb'+i).style.width=(v/r._mx*100)+'%'; });
      const tot=r.regVotes.reduce((a,b)=>a+b,0); fills=r.regVotes.map((v,i)=>cf[i]>0.02?`rgba(242,193,78,${(0.15+0.8*Math.min(1,v/tot*3)*cf[i]).toFixed(2)})`:'#1D2A44'); labels=r.regVotes.map((v,i)=>cf[i]>0.02?fmt(v*cf[i]):'');
    } else { const P=r.shares.perReg; const tot=r._alive.map((c,ci)=>regs.reduce((a,g,ri)=>a+g.w*cf[ri]*P[ri][ci],0)/W);
      r._alive.forEach((c,i)=>{ $('#pv'+i).textContent=pct(tot[i]); $('#pb'+i).style.width=(tot[i]*100)+'%'; });
      fills=regs.map((g,ri)=>{ if(cf[ri]<0.02) return '#1D2A44'; let bi=0; P[ri].forEach((v,i)=>{if(v>P[ri][bi])bi=i}); const c=r._alive[bi]; const op=(0.3+0.7*cf[ri]); return c.isMe?`rgba(242,193,78,${op.toFixed(2)})`:hexA(PCOLOR[c.party],op); });
      const mi=r._alive.findIndex(c=>c.isMe); labels=regs.map((g,ri)=>cf[ri]>0.02?'você '+Math.round(P[ri][mi]*100)+'%':''); }
    $('#apuMap').innerHTML=mapHTML(regs,fills,labels,-1,false);
    if(t<1){ if(now-(frame.lt||0)>90){ frame.lt=now; SFX.tick(); } return requestAnimationFrame(frame); }
    SFX.stamp(); setTimeout(()=>r.win?SFX.win():r.second?SFX.open():SFX.lose(),250);
    const g=S.gen==='f'?'a':'';
    const st=r.win?`<span class="stamp win">Eleit${g||'o'}</span>`:r.second?'<span class="stamp mid">2º turno</span>':`<span class="stamp lose">Não eleit${g||'o'}</span>`;
    const extra=prop?`<p class="muted" style="margin:0">Sua votação: <b class="mono">${fmt(r.votes)}</b> votos. Corte: ${fmt(r.cut)}.</p>`:`<p class="muted" style="margin:0">${fmt(valid*r.me.s)} votos de ${fmt(valid)} válidos.</p>`;
    $('#apuEnd').innerHTML=`<div style="display:flex;flex-direction:column;gap:12px;padding-top:6px">${st}${extra}<button class="cta" id="apuOk">${r.second?'Ir para o 2º turno':'Continuar'}</button></div>`;
    if(r.win) confetti();
    $('#apuOk').onclick=done; $('#apuOk').focus();
  }
  requestAnimationFrame(frame);
}

// ---------- final ----------
function showEnding(){
  const e=ENDINGS[S.ended.k], st=S.stats;
  const h=`<div class="sheet-scene" style="height:170px">${scene(e.scene,{seed:'end'})}<div class="who">${myPortrait('av-lg')}</div></div><div class="sheet-pad"><div class="ending"><div class="eyebrow">${esc(e.c)} · ${S.ended.year} · ${S.ended.age} anos</div><h2>${esc(e.t)}</h2></div>
  <p class="txt">${esc(genderize(e.txt))} ${esc(S.ended.extra)}</p>
  <div class="tbl-wrap"><table><tr><th>Legado</th><td class="n">${legacy()} pts</td></tr><tr><th>Cargo mais alto</th><td>${S.maxLvl?oname(ORDER.find(k=>OFF[k].lvl===S.maxLvl)):'Nenhum'}</td></tr>
  <tr><th>Eleições vencidas</th><td class="n">${S.elections.filter(x=>x.win).length} de ${S.elections.length}</td></tr><tr><th>Aprovação final</th><td class="n">${Math.round(AP())}%</td></tr><tr><th>Ética final</th><td class="n">${Math.round(st.et)}</td></tr><tr><th>Risco judicial final</th><td class="n">${Math.round(st.rj)}%</td></tr></table></div>
  <div class="row"><button class="cta" id="newC">Nova carreira</button><button class="ghost" id="seeC">Ler o jornal</button></div></div>`;
  openModal(h); if(['faixa','cacique','ex_pres','tce'].includes(S.ended.k)) confetti();
  $('#newC').onclick=()=>{ S=null; PREV=null; closeModal(); SETUP.screen='title'; renderSetup(); };
  $('#seeC').onclick=()=>{ closeModal(); TAB='jornal'; renderGame(); };
}

// ---------- boot ----------

