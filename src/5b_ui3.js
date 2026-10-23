// ================= ELEITORADO, PESQUISAS E JORNAL =================
function arrow(d,goodUp){ if(Math.abs(d)<0.05) return '<span class="muted">=</span>'; const good=goodUp?d>0:d<0; return `<span style="color:var(${good?'--green':'--red'})">${d>0?'▲':'▼'}</span>`; }
const num1=v=>v.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1});
function apHistoryChart(){
  const ps=S.polls.slice(-16); if(ps.length<2) return '<p class="muted" style="margin:0;font-size:12.5px">O histórico aparece a partir da segunda pesquisa.</p>';
  const W=320,H=110,pad=24, xs=i=>pad+(W-pad-8)*(i/(ps.length-1)), ys=v=>H-18-(H-30)*(v/100);
  const line=ps.map((p,i)=>`${xs(i).toFixed(1)},${ys(p.ap).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Histórico de aprovação">${[25,50,75].map(v=>`<line x1="${pad}" x2="${W-8}" y1="${ys(v)}" y2="${ys(v)}" stroke="var(--line)"/><text x="${pad-4}" y="${ys(v)+3}" text-anchor="end">${v}</text>`).join('')}<polygon points="${pad},${ys(0)} ${line} ${xs(ps.length-1)},${ys(0)}" fill="var(--green)" opacity=".12"/><polyline points="${line}" fill="none" stroke="var(--green)" stroke-width="2.5"/><circle cx="${xs(ps.length-1)}" cy="${ys(ps[ps.length-1].ap)}" r="4" fill="var(--green)"/>${ps.map((p,i)=>`<circle cx="${xs(i)}" cy="${ys(p.ap)}" r="9" fill="transparent" data-tip="${p.q}º tri ${p.y} · ${esc(p.inst)}: ${Math.round(p.ap)}%"/>`).join('')}<text x="${pad}" y="${H-3}">${ps[0].q}º/${String(ps[0].y).slice(2)}</text><text x="${W-8}" y="${H-3}" text-anchor="end">${ps[ps.length-1].q}º/${String(ps[ps.length-1].y).slice(2)}</text></svg>`;
}
function pollCard(){
  const p=S.polls[S.polls.length-1]; if(!p) return '';
  const prev=S.polls[S.polls.length-2];
  let aval='';
  if(p.aval) aval=`<div class="stack"><i style="width:${p.aval.bom}%;background:var(--green)"></i><i style="width:${p.aval.reg}%;background:#7D8BA5"></i><i style="width:${p.aval.ruim}%;background:var(--red)"></i></div><div class="row" style="gap:12px;font-size:12px"><span><i class="dot" style="background:var(--green)"></i>Ótimo/bom ${Math.round(p.aval.bom)}%</span><span><i class="dot" style="background:#7D8BA5"></i>Regular ${Math.round(p.aval.reg)}%</span><span><i class="dot" style="background:var(--red)"></i>Ruim/péssimo ${Math.round(p.aval.ruim)}%</span></div>`;
  let scen='';
  if(p.scen&&p.scen.prop){ const mx=Math.max(p.scen.votes,p.scen.cut)*1.2; scen=`<div class="cand-row">${myPortrait('av-sm')}<div class="nm"><b>${esc(S.nome)}</b><small>projeção de votos</small></div><div class="pc">${fmt(p.scen.votes)}</div><div class="tr" style="position:relative"><i style="width:${p.scen.votes/mx*100}%;background:var(--gold)"></i><span class="cutline" style="left:${p.scen.cut/mx*100}%"></span></div></div><p class="muted" style="margin:0;font-size:12px">Linha dourada: corte estimado da legenda (${fmt(p.scen.cut)}).</p>`; }
  else if(p.scen) scen=p.scen.s.map(c=>`<div class="cand-row">${c.isMe?myPortrait('av-sm'):avatar(c.seed,c.gen,PCOLOR[c.party],{cls:'av-sm'})}<div class="nm"><b>${esc(c.name)}</b><small>${PARTIES[c.party].sig}${c.isMe?' · você':''}</small></div><div class="pc">${pct(c.v)}</div><div class="tr"><i style="width:${c.v*100}%;background:${c.isMe?'var(--gold)':PCOLOR[c.party]}"></i></div></div>`).join('');
  const hist=S.polls.slice(-5,-1).reverse().map(x=>`<tr><td class="mono">${x.q}º tri ${x.y}</td><td>${esc(x.inst)}</td><td class="n">${Math.round(x.ap)}%</td><td class="n">${x.scen&&x.scen.s?pct((x.scen.s.find(c=>c.isMe)||{v:0}).v):x.scen?fmt(x.scen.votes):'—'}</td></tr>`).join('');
  return `<div class="card"><div class="hd"><div><span class="eyebrow">Última pesquisa</span><h3>${esc(p.inst)} · ${p.q}º tri ${p.y}</h3></div><div style="text-align:right"><span class="big mono">${Math.round(p.ap)}%</span><small class="muted" style="display:block">aprovação ${prev?arrow(p.ap-prev.ap,true)+' '+num1(Math.abs(p.ap-prev.ap)):''}</small></div></div>
   ${aval}${apHistoryChart()}
   <div class="hd" style="margin-top:4px"><h3 style="font-size:16px">Cenário: ${oname(p.off)} em ${p.ey}</h3><span class="muted" style="font-size:12px">${sys(p.off)==='prop'?'proporcional':'1º turno, votos válidos'}</span></div>${scen}
   ${hist?`<div class="tbl-wrap"><table><tr><th>Data</th><th>Instituto</th><th>Aprov.</th><th>Você</th></tr>${hist}</table></div>`:''}</div>`;
}
function segPanelHTML(){
  const sz=SEG_SIZE[jurKey()], prev=S.segPrev||{};
  const rows=Object.keys(sz).sort((a,b)=>sz[b]-sz[a]).map(k=>{ const v=segAP(k), d=v-(prev[k]??v), c=topCare(k);
    return `<div class="segrow"><div class="sn"><b>${SEG[k].n}</b><small>${Math.round(sz[k]*100)}% do eleitorado · liga para ${ISS[c].n.toLowerCase()}</small></div><div class="sv"><span class="mono">${Math.round(v)}%</span><small>${arrow(d,true)} ${Math.abs(d)>=0.1?num1(Math.abs(d)):''}</small></div><div class="bar" style="grid-column:1/3"><i style="width:${v}%;background:${v>=50?'var(--green)':v>=35?'var(--gold)':'var(--red)'}"></i></div></div>`; }).join('');
  return `<section class="sect"><h2>Painel do eleitorado</h2><p class="muted" style="margin:-4px 0 0;font-size:13.5px">Aprovação por grupo ${jurName()}. Cada grupo pesa conforme o tamanho e reage às pautas que mais preocupam.</p><div class="card segs">${rows}</div></section>`;
}
function issuesHTML(){
  const W=S.world;
  return `<section class="sect"><h2>Pautas em alta</h2><p class="muted" style="margin:-4px 0 0;font-size:13.5px">Temperatura: quanto o tema mobiliza o eleitor agora. Credibilidade: o quanto o eleitor confia em você nesse tema. Pauta quente com credibilidade alta rende votos; com credibilidade baixa, tira.</p><div class="card">${hotIssues().map(i=>{const h=W.heat[i],o=W.own[i];return `<div class="issrow"><b>${ISS[i].n}${o>=70?' <span class="tagg">dono da pauta</span>':o<=30?' <span class="tag">desgastado</span>':''}</b><span class="lab">Temperatura</span><div class="bar"><i style="width:${h}%;background:linear-gradient(90deg,#F2C14E,#FF6363)"></i></div><span class="lab">Credibilidade</span><div class="bar blue"><i style="width:${o}%"></i></div></div>`}).join('')}</div></section>`;
}
function ecoHTML(){
  const e=S.world.eco, p=S.world.ecoPrev||e;
  const t=(n,v,pv,suf,goodUp)=>`<div class="kpi"><small>${n}</small><b>${v.toLocaleString('pt-BR',{minimumFractionDigits:suf==='R$'?2:1,maximumFractionDigits:suf==='R$'?2:1})}${suf==='R$'?'':suf}</b><small>${arrow(v-pv,goodUp)} antes ${pv.toLocaleString('pt-BR',{maximumFractionDigits:2})}</small></div>`;
  return `<section class="sect"><h2>Economia do país</h2><div class="card"><div class="ecogrid">${t('Inflação 12m',e.infl,p.infl,'%',false)}${t('Desemprego',e.desemp,p.desemp,'%',false)}${t('PIB (ritmo anual)',e.pib,p.pib,'%',true)}${t('Selic',e.selic,p.selic,'%',false)}${t('Dólar (R$)',e.dolar,p.dolar,'R$',false)}</div><p class="muted" style="margin:0;font-size:12.5px">${{pres:'Como presidente, a economia pesa inteira na sua aprovação.',gov:'Como governador(a), metade do humor econômico cai na sua conta.',pref:'Como prefeito(a), a economia nacional respinga na sua aprovação.'}[S.office]?genderize({pres:'Como presidente, a economia pesa inteira na sua aprovação.',gov:'Como governador(a), metade do humor econômico cai na sua conta.',pref:'Como prefeito(a), a economia nacional respinga na sua aprovação.'}[S.office]):'Desemprego alto esquenta a pauta de emprego; inflação alta esquenta o custo de vida.'}</p></div></section>`;
}
function eleitoradoHTML(){
  const ne=nextElectionInfo(), N=S.nemesis;
  return `<section class="sect"><div class="card"><div class="hd"><div><span class="eyebrow">Próxima eleição</span><h3 style="font-size:24px">${ne.t==='mun'?'Municipal':'Geral'} · outubro de ${ne.y}</h3></div><span class="mono muted">${ne.quarters<=0?'convenção neste trimestre':ne.quarters+' trimestres'}</span></div>
   <div class="rival" style="background:none;padding:0">${portrait(N,'av-md')}<div><small class="eyebrow" style="font-size:10px">Rival histórico</small><b>${esc(N.name)}</b><small><i class="dot" style="background:${PCOLOR[N.party]}"></i>${PARTIES[N.party].sig} · ${genderize(profName(N.prof),N.gen)}</small></div></div>
   <div class="row"><button class="ghost sm" id="doPoll" ${canDo(ACT.pesquisa).ok?'':'disabled'}>Pesquisa interna com chance por cargo (1 ação)</button></div>
   ${S.poll?`<div class="tbl-wrap"><table><tr><th>Chance em ${S.poll.year}</th><th></th></tr>${Object.entries(S.poll.res).map(([k,v])=>`<tr><td>${oname(k)}</td><td class="n">${Math.round(v*100)}%</td></tr>`).join('')}</table></div>`:''}</div>
   ${pollCard()}</section>${governosHTML()}${segPanelHTML()}${issuesHTML()}${ecoHTML()}`;
}
function showInfo(k){
  const I=RES_INFO[k]; if(!I) return;
  const val={ap:Math.round(AP())+'%',cp:Math.round(S.stats.cp),ip:Math.round(S.stats.ip),et:Math.round(S.stats.et),rj:Math.round(S.stats.rj)+'%',pt:Math.round(S.stats.pt),f:Math.round(S.stats.f),money:'R$ '+fmt(S.money)+' mil'}[k];
  let extra='';
  if(k==='ap'){ const sz=SEG_SIZE[jurKey()]; extra=`<div class="card segs" style="padding:10px">${Object.keys(sz).sort((a,b)=>segAP(a)-segAP(b)).slice(0,3).map(s=>`<div class="segrow"><div class="sn"><b>${SEG[s].n}</b><small>grupo onde você está mais fraco</small></div><div class="sv"><span class="mono">${Math.round(segAP(s))}%</span></div></div>`).join('')}</div>`; }
  if(k==='ip'&&S.cabinet) extra=`<p class="muted" style="margin:0">Sua base hoje: ${Math.round(coalition().base)}% das cadeiras. A articulação tende a ${Math.round(10+coalition().base*1.1)}.</p>`;
  openModal(`<div class="sheet-pad"><div class="eyebrow">Recurso</div><h2>${I[0]} <span class="mono" style="color:var(--gold);font-size:.8em">${val}</span></h2><p class="txt">${esc(genderize(I[1]))}</p><p class="txt muted">${esc(genderize(I[2]))}</p>${extra}<button class="cta" id="infOk">Entendi</button></div>`);
  $('#infOk').onclick=closeModal;
}
function papersHTML(){
  if(!S.papers.length) return `<section class="sect"><h2>Jornal</h2><div class="paper"><div class="mast"><b>Gazeta Cívica de ${esc(CITIES[S.city].n)}</b><span>edição em preparação</span></div><h3>A primeira edição sai no fim deste trimestre</h3><p style="margin:0;font-family:Georgia,serif">Suas decisões, a economia, o mundo, o futebol e a coluna de opinião vão estar aqui.</p></div></section>`;
  const idx=PAPER<0||PAPER>=S.papers.length?S.papers.length-1:PAPER, P=S.papers[idx], E=P.eco;
  const tiles=[['Inflação',E.infl,E.pinfl,false],['Desemprego',E.desemp,E.pdes,false],['PIB',E.pib,E.ppib,true]].map(([n,v,pv,g])=>`<span>${n} <b>${num1(v)}%</b> ${arrow(v-pv,g)}</span>`).join('');
  return `<section class="sect"><div class="row" style="justify-content:space-between"><h2>Jornal</h2><div class="cats" style="padding:0">${S.papers.slice(-8).map((p,i,arr)=>{const j=S.papers.length-arr.length+i;return `<button data-paper="${j}" aria-pressed="${j===idx}">${p.q}º/${String(p.y).slice(2)}</button>`}).join('')}</div></div>
  <article class="paper np">
   <div class="mast"><b>Gazeta Cívica de ${esc(CITIES[S.city].n)}</b><span>${P.q}º trimestre de ${P.y} · edição nº ${idx+1}</span></div>
   <div class="npman"><h3>${esc(P.man.t)}</h3><p>${esc(P.man.l)}</p></div>
   <div class="npgrid">
    <div class="npcol"><h4>Política</h4>${P.pol.length?P.pol.map(n=>`<p><b>${esc(n.t.replace(/\.$/,''))}.</b> ${esc(n.r)}</p>`).join(''):'<p>Trimestre morno nos gabinetes.</p>'}</div>
    <div class="npcol"><h4>Economia</h4><div class="npeco">${tiles}<span>Selic <b>${num1(E.selic)}%</b></span><span>Dólar <b>R$ ${E.dolar.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}</b></span></div>
     <h4>Brasil e mundo</h4>${P.mundo.map(t=>`<p>${esc(t)}.</p>`).join('')}
     ${P.poll?`<div class="npbox"><b>Pesquisa ${esc(P.poll.inst)}</b><br>Aprovação de ${esc(S.nome)}: ${Math.round(P.poll.ap)}%</div>`:''}</div>
    <div class="npcol"><h4>Opinião</h4><p class="opin">“${esc(P.col)}”</p><p class="byl">Marta Figueiredo, colunista</p>
     <h4>Esportes</h4>${P.esporte.map(t=>`<p>${esc(t)}</p>`).join('')}
     <h4>Cultura</h4><p>${esc(P.cult)}.</p>
     <h4>Tempo</h4><p>${esc(P.tempo)}.</p>
     <h4>Classificados</h4><p class="cls">${esc(P.cls)}</p></div>
   </div></article></section>`;
}
