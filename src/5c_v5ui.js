// ================= v5: PAINEL, CRIAÇÃO EM PASSOS, BARRA ÚNICA, TUTORIAL =================
const SND_ON='<svg viewBox="0 0 24 24" class="ico" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h3l5 4V6L7 10z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>';
const SND_OFF='<svg viewBox="0 0 24 24" class="ico" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h3l5 4V6L7 10z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>';
const STATCOL={ap:'var(--green)',cp:'var(--cyan)',ip:'var(--violet)',et:'var(--teal)',rj:'var(--red)',money:'var(--lime)',f:'var(--orange)'};
const FAMCOL={seg:'var(--cyan)',iss:'var(--violet)',inst:'#E6EBF5'};
const ZONE={aband:{n:'Abandonado',c:'var(--red)'},exag:{n:'Exagero',c:'var(--orange)'},ok:{n:'Em dia',c:'var(--green)'},irr:{n:'Pouco relevante',c:'var(--slate)'},nd:{n:'Sem histórico',c:'var(--slate)'}};

// ---------- criação em passos ----------
// ---------- cabeçalho, barra e navegação ----------
function hudHTML(){
  const st=S.stats,P=PARTIES[S.party],ap=AP();
  const where=S.office!=='none'?placeName(S.office):CITIES[S.city].n;
  const tod=['dawn','day','dusk','night'][S.q-1];
  const q=(k,l,v)=>`<button class="qs" data-info="${k}" style="--sc:${STATCOL[k]}"><span>${l}</span><b>${v}</b></button>`;
  return `<header class="hud slim">${scene(HOUSE_SCENE[S.office],{seed:S.city+S.office,tod:(S.tick%9===4)?'storm':tod})}<div class="shade"></div>
   <button class="sound" id="snd" aria-label="${SFX.on?'Desligar som':'Ligar som'}">${SFX.on?SND_ON:SND_OFF}</button>
   <div class="hud-in"><div class="av-lg">${myPortrait()}</div>
    <div class="id"><span class="trat">${trat()}</span><h1>${esc(S.nome)}</h1><span class="cargo">${oname(S.office)} · ${esc(where)}</span><span class="pchip"><i class="dot" style="background:${PCOLOR[S.party]};margin:0"></i>${P.sig}${S.office!=='none'?` · mandato até ${S.officeEnds}`:''}</span></div>
    <div class="datebox"><b>${S.q}º tri</b>${S.year} · ${S.age} anos</div></div></header>
   ${TAB==='agenda'?'':`<div class="qstats">${q('ap','Aprovação',Math.round(ap)+'%')}${q('cp','Capital',Math.round(st.cp))}${q('ip','Articulação',Math.round(st.ip))}${q('et','Ética',Math.round(st.et))}${q('rj','Risco',Math.round(st.rj)+'%')}${q('money','Caixa','R$ '+fmt(S.money))}</div>`}`;
}
function goTab(k){ TAB=k; renderGame(); window.scrollTo(0,0); }
function renderGame(){
  if(!S) return renderSetup();
  const body={agenda:painelHTML,campanha:campanhaHTML,equipe:equipeHTML,jornal:jornalHTML,carreira:carreiraHTML}[TAB]||painelHTML;
  $('#app').innerHTML=hudHTML()+`<main id="tabBody">${body()}</main>`;
  bind(); bindV5();
  $('#snd').onclick=()=>{ SFX.toggle(); renderGame(); };
  const d=$('#dock'); d.hidden=false;
  const vacant=S.cabinet&&cabSlots().some(k=>!S.cabinet[k]);
  const pend=pendingDecisions().length, camp=inCampaign();
  const ab=TAB!=='agenda'&&!camp?areaList().filter(a=>a.zone==='aband').length:0;
  d.innerHTML=`<div class="in"><nav class="tabbar" role="tablist">${[['agenda','Painel'],['campanha',camp?'Campanha':'Eleitorado'],['equipe','Equipe'],['jornal','Jornal'],['carreira','Perfil']].map(([k,l])=>`<button role="tab" data-tab="${k}" aria-selected="${TAB===k}">${icon(k==='agenda'?'agenda':k)}${l}${(k==='equipe'&&vacant)||(k==='campanha'&&camp&&TAB!=='campanha')||(k==='agenda'&&(pend||ab)&&TAB!=='agenda')?'<i class="badge"></i>':''}</button>`).join('')}</nav></div>`;
  d.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>goTab(b.dataset.tab));
  let fab=$('#fab'); if(!fab){ fab=document.createElement('div'); fab.id='fab'; document.body.appendChild(fab); }
  fab.hidden=false;
  const lbl=S.ended?'Ver desfecho':camp?`Encerrar semana ${S.campaign.week+1} de ${S.campaign.weeks}`:pend?`Decidir · ${4-pend} de 4`:'Encerrar trimestre';
  const dots=camp?Array.from({length:apMaxNow()},(_,i)=>`<i class="${i<S.apLeft?'on':''}" style="--c:var(--gold-ink)"></i>`).join(''):(S.dec||[]).map(x=>`<i class="${x.done?'on':''}" style="--c:${TONES[x.tone||'dilema'].col}"></i>`).join('');
  fab.innerHTML=`<button class="cta fabb ${!camp&&!pend&&!S.ended?'pulse':''}" id="endT"><span class="fd">${dots}</span>${lbl}</button>`;
  $('#endT').onclick=()=>S.ended?showEnding():endTurn();
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.querySelectorAll('.ring').forEach(r=>r.style.strokeDashoffset=r.dataset.to)));
  const cur={ap:AP(),cp:S.stats.cp,ip:S.stats.ip,et:S.stats.et,rj:S.stats.rj,pt:S.stats.pt,f:S.stats.f,money:S.money};
  if(PREV){ for(const k in cur){ const v=cur[k]-PREV[k]; document.querySelectorAll(`[data-k="${k}"],.qs[data-info="${k}"]`).forEach(el=>{ if(Math.abs(v)<(k==='money'?1:0.5)) return;
    const bad=k==='rj'?v>0:v<0; el.insertAdjacentHTML('beforeend',`<span class="dlt ${bad?'dn':'up'}">${v>0?'+':''}${k==='money'?fmt(v):v.toFixed(1)}</span>`); }); } }
  PREV=cur;
}
function bindV5(){
  document.querySelectorAll('[data-tip]').forEach(el=>el.addEventListener('click',e=>{ e.stopPropagation(); toast(el.getAttribute('data-tip')); }));
  document.querySelectorAll('[data-prom]').forEach(b=>b.onclick=()=>fulfillPromise(b.dataset.prom));
  document.querySelectorAll('[data-acc]').forEach(b=>b.onclick=()=>accelerateObra(b.dataset.acc));
  const e2=$('#endT2'); if(e2) e2.onclick=endTurn;
  const ex=$('#expBtn'); if(ex) ex.onclick=showExport;
  const mh=$('#menuHome'); if(mh) mh.onclick=()=>{ save(); S=null; PREV=null; SETUP.screen='title'; renderSetup(); window.scrollTo(0,0); };
}

// ---------- painel ----------
function spark(key,col){
  const h=(S.hist||[]).slice(-12); if(h.length<2) return '<div class="spark-empty">histórico a partir do próximo trimestre</div>';
  const vals=h.map(x=>key==='money'?x.money:x[key]); const mn=Math.min(...vals), mx=Math.max(...vals), rg=(mx-mn)||1;
  const W=120,H=34, xs=i=>2+(W-4)*i/(h.length-1), ys=v=>H-3-(H-8)*((v-mn)/rg);
  const pts=vals.map((v,i)=>`${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(' ');
  const lbl=v=>key==='money'?'R$ '+fmt(v)+' mil':(key==='ap'||key==='rj')?Math.round(v)+'%':Math.round(v);
  return `<svg viewBox="0 0 ${W} ${H}" class="spark" preserveAspectRatio="none"><polygon points="2,${H} ${pts} ${xs(h.length-1)},${H}" fill="${col}" opacity=".14"/><polyline points="${pts}" fill="none" stroke="${col}" stroke-width="2" vector-effect="non-scaling-stroke"/>${vals.map((v,i)=>`<circle cx="${xs(i)}" cy="${ys(v)}" r="${i===vals.length-1?3:6}" fill="${i===vals.length-1?col:'transparent'}" data-tip="${h[i].q}º tri ${h[i].y}: ${lbl(v)}"/>`).join('')}</svg>`;
}
function kpi(k,label,val,cur,prev){
  const d=prev==null?0:cur-prev, good=k==='rj'?d<0:d>0;
  return `<button class="kp" data-info="${k}" data-k="${k}" style="--sc:${STATCOL[k]}"><span class="kl">${label}</span><b class="kv2">${val}</b><span class="kd" style="color:${Math.abs(d)<0.5?'var(--muted)':good?'var(--green)':'var(--red)'}">${Math.abs(d)<0.5?'estável':(d>0?'▲ ':'▼ ')+(k==='money'?'R$ '+fmt(Math.abs(d)):num1(Math.abs(d)))}</span>${spark(k,STATCOL[k])}</button>`;
}
function caminhoHTML(){
  const ne=nextElectionInfo(); const items=[];
  S.promises.filter(p=>!p.done&&!p.failed).forEach(p=>{ const left=p.due-S.tick, c=promiseCost(); items.push(`<div class="cm"><span class="ct" style="--cc:var(--gold)">Promessa</span><div class="cb"><b>${esc(p.n)}</b><small>Prazo: ${p.yr} · faltam ${left} ${left===1?'trimestre':'trimestres'} · ${SEG[p.seg].n}</small></div><button class="ghost sm" data-prom="${p.id}">Cumprir (${c.f?'Fiscal −4, ':''}R$ ${fmt(-(c.$||0)*sc())} mil)</button></div>`); });
  S.obras.forEach(o=>{ const eta=obraETA(o), ok=eta<=ne.quarters; items.push(`<div class="cm"><span class="ct" style="--cc:var(--cyan)">Obra</span><div class="cb"><b>${esc(o.n)}</b><div class="bar" style="margin:4px 0"><i style="width:${clamp(o.prog/o.dur*100,0,100)}%;background:var(--cyan)"></i></div><small style="color:${ok?'var(--green)':'var(--red)'}">Pronta em ~${eta} ${eta===1?'trimestre':'trimestres'} · eleição em ${ne.quarters} · ${ok?'deve ficar pronta antes':'pode não ficar pronta a tempo'}</small></div><button class="ghost sm" data-acc="${o.id}" ${o.acc===S.tick?'disabled':''}>Acelerar (R$ ${fmt(obraAccCost())} mil)</button></div>`); });
  S.pending.forEach(p=>{ const left=p.due-S.tick; items.push(`<div class="cm"><span class="ct" style="--cc:var(--violet)">Repercussão</span><div class="cb"><b>${esc(p.src)}</b><small>Ainda vai repercutir em ${left} ${left===1?'trimestre':'trimestres'}</small>${fxHTML(p.fx)}</div></div>`); });
  return `<section class="sect"><h2>A caminho</h2>${items.length?`<div class="card cms">${items.join('')}</div>`:'<p class="muted" style="margin:0">Nenhuma promessa, obra ou repercussão pendente. Elas aparecem conforme suas decisões.</p>'}</section>`;
}
function mudouHTML(){
  const ch=[]; const P=S.segPrev||{};
  for(const k in SEG_SIZE[jurKey()]){ const d=segAP(k)-(P[k]??segAP(k)); if(Math.abs(d)>=0.8) ch.push({n:SEG[k].n,d,v:Math.round(segAP(k))+'%'}); }
  const h=S.hist||[], a=h[h.length-2], b=h[h.length-1];
  if(a&&b) [['cp','Capital político'],['ip','Articulação'],['et','Ética'],['rj','Risco judicial']].forEach(([k,n])=>{ const d=b[k]-a[k]; if(Math.abs(d)>=0.8) ch.push({n,d,v:Math.round(b[k]),inv:k==='rj'}); });
  ch.sort((x,y)=>Math.abs(y.d)-Math.abs(x.d));
  return `<section class="sect"><h2>O que mudou no último trimestre</h2>${ch.length?`<div class="card mud">${ch.slice(0,6).map(x=>{const good=x.inv?x.d<0:x.d>0;return `<div class="mr"><span>${esc(x.n)}</span><b class="mono">${x.v}</b><span class="mono" style="color:${good?'var(--green)':'var(--red)'}">${x.d>0?'▲':'▼'} ${num1(Math.abs(x.d))}</span></div>`}).join('')}</div>`:'<p class="muted" style="margin:0">Poucas mudanças relevantes desde o último trimestre.</p>'}</section>`;
}
function painelHTML(){
  if(inCampaign()) return noticeHTML()+`<section class="sect"><h2>Agenda de campanha <span class="mono muted" style="font-size:14px">${S.apLeft} ${S.apLeft===1?'ação livre':'ações livres'} nesta semana</span></h2>${actionsHTML()}</section>`+caminhoHTML();
  const st=S.stats, h=S.hist||[], pv=h[h.length-2]||null, L=areaList(), al=alertsList(L), pend=pendingDecisions().length;
  return `<section class="sect"><div class="kps">${kpi('ap','Aprovação',Math.round(AP())+'%',AP(),pv&&pv.ap)}${kpi('cp','Capital político',Math.round(st.cp),st.cp,pv&&pv.cp)}${kpi('et','Ética',Math.round(st.et),st.et,pv&&pv.et)}${kpi('rj','Risco judicial',Math.round(st.rj)+'%',st.rj,pv&&pv.rj)}${kpi('ip','Articulação',Math.round(st.ip),st.ip,pv&&pv.ip)}${kpi('money','Caixa','R$ '+fmt(S.money)+' mil',S.money,pv&&pv.money)}</div></section>
   <section class="sect"><h2>Onde está sua atenção</h2>${L.total<8?'<div class="alert z-nd"><b>Começando</b><span>Ainda não há histórico suficiente. Depois de alguns trimestres, este quadro mostra quem você está deixando de lado e onde está exagerando.</span></div>':al.length?`<div class="alerts">${al.map(a=>`<div class="alert z-${a.z}"><b>${a.z==='aband'?'Abandonado':'Exagero'}</b><span>${esc(a.t)}</span></div>`).join('')}</div>`:'<div class="alert z-ok"><b>Equilíbrio</b><span>Nenhuma área importante abandonada e nenhum exagero. Continue distribuindo suas escolhas.</span></div>'}</section>
   ${focoHTML()}${decisionsHTML()}${pend?'':`<div class="notice hot"><span>Tudo decidido neste trimestre.</span><button class="cta sm" id="endT2">Encerrar trimestre</button></div>`}
   ${balanceHTML(L)}
   ${caminhoHTML()}${mudouHTML()}<section class="sect">${noticeHTML()}</section>`;
}

// ---------- tutorial ----------
const TUT=[['Este é o seu Painel','No topo ficam seus números com a tendência dos últimos trimestres. Logo abaixo, os alertas mostram onde você está abandonando algo importante ou exagerando em algo que já vai bem.'],
 ['Quatro decisões por trimestre','Sempre uma crise (vermelha, todas as saídas custam), dois dilemas (ganha de um lado, perde do outro) e uma oportunidade (verde, todas ajudam). Antes de escolher você vê só a direção dos efeitos; os números aparecem depois, e parte deles chega meses mais tarde.'],
 ['Promessas, obras e rivais','Promessas têm prazo e obras levam trimestres para ficar prontas. Acompanhe em “A caminho”. Seus rivais também vivem: trocam de partido, sofrem escândalos e ganham cargos.'],
 ['Encerre o trimestre','Quando as quatro decisões estiverem tomadas, toque no botão dourado para avançar. A Equipe cuida de aliados e ministros; o Eleitorado mostra pesquisas e grupos.']];
function tutorial(i){
  if(!S||S.tut>=TUT.length||i>=TUT.length||$('.overlay')) return;
  const [t,x]=TUT[i];
  openModal(`<div class="sheet-pad"><div class="eyebrow">Como jogar · ${i+1} de ${TUT.length}</div><h2>${t}</h2><p class="txt">${x}</p><div class="row"><button class="cta" id="tN">${i<TUT.length-1?'Próximo':'Começar'}</button><button class="ghost" id="tS">Pular</button></div></div>`);
  $('#tN').onclick=()=>{ S.tut=i+1; save(); closeModal(); if(i<TUT.length-1) tutorial(i+1); };
  $('#tS').onclick=()=>{ S.tut=TUT.length; save(); closeModal(); };
}

// ---------- boot ----------
renderSetup();
