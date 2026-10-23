// ================= v7: TELA INICIAL, CRIAÇÃO DE PERSONAGEM, GOVERNOS =================
const WSTEPS=[['Identidade','Nome e tratamento'],['Visual','Rosto e estilo'],['Origem','De onde você vem'],['Cidade','Onde começa'],['Partido','Sua legenda'],['Revisão','Tudo pronto']];
const ARCH_IC={adv:'juridico',sind:'base',emp:'dinheiro',inf:'midia',rel:'star',prof:'leg'};
function nomeSetup(){ return SETUP.nome.trim()||(SETUP.gen==='f'?'Helena Duarte':'Rafael Duarte'); }
function startStats(){
  const st={cp:10,et:60,money:40}, a=ARCH[SETUP.arch].start; for(const k in a){ if(k==='money') st.money+=a[k]; else if(st[k]!=null) st[k]+=a[k]; }
  const aff=PARTIES[SETUP.party].aff||{}; const fav=Object.entries(aff).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).map(x=>SEG[x[0]].n), rej=Object.entries(aff).filter(x=>x[1]<0).sort((a,b)=>a[1]-b[1]).map(x=>SEG[x[0]].n);
  return {st,fav,rej};
}
function posterHTML(){
  const p=PARTIES[SETUP.party], c=CITIES[SETUP.city], col=PCOLOR[SETUP.party], ss=startStats();
  const bar=(l,v,mx,cl)=>`<div class="pbar"><span>${l}</span><div class="bar"><i style="width:${clamp(v/mx*100,4,100)}%;background:${cl}"></i></div><b class="mono">${v}</b></div>`;
  return `<aside class="poster" style="--pc:${col}"><div class="pglow"></div>
   <div class="pav">${prevAvatar()}</div>
   <div class="pname">${esc(nomeSetup())}</div>
   <div class="prole">${SETUP.gen==='f'?'Pré-candidata':'Pré-candidato'} · ${esc(c.n)}${c.sigla?'/'+c.sigla:''}</div>
   <div class="ptags"><span class="pchip"><i class="dot" style="background:${col};margin:0"></i>${p.sig}</span><span class="pchip">${ARCH[SETUP.arch].n}</span><span class="pchip">${CTYPE[c.type]?CTYPE[c.type].n:''}</span></div>
   <div class="pstats"><span class="eyebrow">Ponto de partida</span>${bar('Capital político',ss.st.cp,60,'var(--cyan)')}${bar('Ética',ss.st.et,100,'var(--teal)')}${bar('Caixa (R$ mil)',ss.st.money,160,'var(--lime)')}
    <div class="pseg"><span><b style="color:var(--green)">Base</b> ${ss.fav.slice(0,2).join(', ')||'neutra'}</span><span><b style="color:var(--red)">Resistência</b> ${ss.rej.slice(0,2).join(', ')||'nenhuma'}</span></div></div></aside>`;
}
function originPreview(){
  const R=rng('bio'+'me-'+nomeSetup()), r=a=>a[Math.floor(R()*a.length)], c=CITIES[SETUP.city];
  return genderize(`${nomeSetup()} nasceu em ${c.n}, ${r(BIO_PAIS[SETUP.arch])}. ${BIO_INF[c.type]||''}. ${BIO_FORM[SETUP.arch]}. Aos 25 anos, filia-se ao ${PARTIES[SETUP.party].sig} para disputar a primeira eleição.`,SETUP.gen);
}
function titleHTML(){
  const idx=slotIndex();
  const card=x=>{ const o=OFF[x.office]||OFF.none, c=CITIES[x.city]||{n:'',sigla:''};
    return `<div class="slot-card" style="--pc:${PCOLOR[x.party]||'#888'}"><div class="sav">${avatar(x.seed,x.gen,PCOLOR[x.party],{ring:'#F2C14E',look:x.look})}</div>
     <div class="sinfo"><b>${esc(x.nome)}</b><small>${x.ended?esc(x.endT):esc(o[x.gen])+(x.office!=='none'?' · '+esc(c.n):'')}</small><small class="mono">${x.q}º tri ${x.year} · ${x.age} anos · ${PARTIES[x.party]?PARTIES[x.party].sig:''} · aprovação ${x.ap}%</small></div>
     <div class="sbtn"><button class="cta sm" data-load="${x.id}">${x.ended?'Ver desfecho':'Continuar'}</button><button class="ghost sm" data-del="${x.id}" aria-label="Apagar carreira">Apagar</button></div></div>`; };
  return `<section class="title">
   <div class="tbg">${scene('planalto',{seed:'title',tod:'dusk'})}<div class="tshade"></div></div>
   <div class="tin"><span class="eyebrow">Simulador de carreira política brasileira</span><h1>Vossa<br>Excelência</h1><p class="tsub">A Arte do Possível</p>
    <p class="tlead">Comece aos 25 anos numa das 90 cidades reais do país. Quatro decisões por trimestre, campanhas semana a semana, aliados, rivais com vida própria e uma biografia que se escreve com as suas escolhas.</p>
    <div class="tcta"><button class="cta big" id="tNew">Nova carreira</button>${idx.find(x=>!x.ended)?`<button class="ghost big" id="tCont">Continuar ${esc(idx.find(x=>!x.ended).nome)}</button>`:''}<button class="ghost big" id="tCode">Carregar código</button></div>
    <div class="tfeat">${['90 cidades reais','10 partidos','Painel de atenção','Biografia viva','Rivais e governos'].map(t=>`<span>${t}</span>`).join('')}</div></div></section>
   ${idx.length?`<section class="sect"><h2>Suas carreiras</h2><div class="slots-list">${idx.map(card).join('')}</div><p class="muted" style="margin:0;font-size:12.5px">As carreiras ficam salvas neste navegador. Para jogar em outro aparelho, use “Copiar código da carreira” no Perfil.</p></section>`:''}`;
}
function wizardHTML(){
  const st=SETUP.step||0, c=SETUP, L=lookOf();
  const segList=(aff,pos)=>Object.entries(aff||{}).filter(([k,v])=>pos?v>0:v<0).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1])).map(([k])=>SEG[k].n).join(', ')||'—';
  let body='';
  if(st===0) body=`<label class="field"><span class="eyebrow">Nome na urna</span><input id="nome" class="big-in" maxlength="32" value="${esc(c.nome)}" placeholder="Helena Duarte" autocomplete="off"></label>
    <div class="field"><span class="eyebrow">Como quer ser chamado(a) nos cargos</span><div class="gpick">${[['f','Vereadora · Prefeita · Governadora'],['m','Vereador · Prefeito · Governador']].map(([g,t])=>`<button class="gcard" data-g="${g}" aria-pressed="${c.gen===g}"><b>${g==='f'?'Ela':'Ele'}</b><small>${t}</small></button>`).join('')}</div></div>`;
  if(st===1) body=`<div class="avstage"><div class="avbig">${prevAvatar()}</div><button class="ghost" id="dice">Sortear visual</button></div>
     <div class="avrow"><span class="eyebrow">Sugestões</span><div class="sugs">${Array.from({length:8},(_,i)=>{const lk=randomLook(c.gen,'s'+SUGN+'-'+i);return `<button class="sug" data-sug="${i}" aria-label="Sugestão ${i+1}">${avatar('me-setup',c.gen,PCOLOR[c.party],{look:lk})}</button>`}).join('')}<button class="ghost sm" id="moreSug">Outras</button></div></div>
     <div class="avgrid"><div class="avrow"><span class="eyebrow">Tom de pele</span><div class="sw">${SKIN.map((x,i)=>`<button class="swc" data-skin="${i}" aria-pressed="${L.skin===i}" style="background:${x}" aria-label="Tom ${i+1}"></button>`).join('')}</div></div>
     <div class="avrow"><span class="eyebrow">Cor do cabelo</span><div class="sw">${HAIR_COLORS.map(x=>`<button class="swc" data-hc="${x}" aria-pressed="${L.hc===x}" style="background:${x}" aria-label="Cor"></button>`).join('')}</div></div></div>
     <div class="avrow"><span class="eyebrow">Cabelo</span><div class="chips-sel">${HAIR_STYLES.map(([k,n])=>`<button class="chip-sel sm" data-hs="${k}" aria-pressed="${L.st===k}">${n}</button>`).join('')}</div></div>
     <div class="avrow"><span class="eyebrow">Detalhes</span><div class="chips-sel">${[['glasses','Óculos'],['beard','Barba'],['tie','Gravata'],['ear','Brincos']].map(([k,n])=>`<button class="chip-sel sm" data-tg="${k}" aria-pressed="${!!L[k]}">${n}</button>`).join('')}</div></div>`;
  if(st===2) body=`<div class="arch-grid">${Object.entries(ARCH).map(([k,a])=>{const fx={}; for(const x in a.start){ if(x==='money') fx.$=a.start[x]; else fx[x]=a.start[x]; } return `<button class="arch" data-a="${k}" aria-pressed="${c.arch===k}"><span class="aic">${icon(ARCH_IC[k])}</span><b>${a.n}</b><small>${esc(a.d)}</small>${fxHTML(fx,true)}<small class="ally">Aliado inicial: ${genderize(ALLY_DEF[ARCH_ALLY[k]].n,'f').toLowerCase()}</small></button>`}).join('')}</div>`;
  if(st===3) body=cityPickerHTML();
  if(st===4) body=`<p class="muted" style="margin:0">Dez legendas, da esquerda para a direita. O partido muda como cada grupo vê você logo no começo, o tamanho da bancada e o que rende mais.</p><div class="picks parties">${PARTY_ORDER.map(k=>{const p=PARTIES[k];return `<button class="pick" data-p="${k}" aria-pressed="${c.party===k}"><div class="pstripe" style="background:${PCOLOR[k]}"></div><div class="pb">
     <div class="phd"><b style="color:${PCOLOR[k]}">${p.sig}</b><span class="pseats">${p.seats}% da Câmara</span></div><small>${p.n}</small>
     <span class="pesp">${p.esp}</span>${spectrum(p.pos)}<p class="pideo">${p.ideo}</p>
     <div class="kv"><span>Gostam</span><span class="g">${segList(p.aff,true)}</span><span>Rejeitam</span><span class="b">${segList(p.aff,false)}</span><span>Vantagem</span><span>${p.bon}</span><span>Desvantagem</span><span>${p.pen}</span></div></div></button>`}).join('')}</div>`;
  if(st===5){ const cc=CITIES[c.city]; body=`<div class="review"><div class="rv"><span class="eyebrow">Sua história começa assim</span><p class="dropcap">${esc(originPreview())}</p></div>
     <div class="rgrid">${[['Nome',nomeSetup(),0],['Origem',ARCH[c.arch].n,2],['Cidade',cc.n+' ('+cc.sigla+') · '+fmt(cc.elec)+' eleitores',3],['Partido',PARTIES[c.party].sig+' · '+PARTIES[c.party].esp,4],['Primeira eleição','Vereança em outubro de 2028 · '+cc.seats+' vagas',3]].map(([l,v,s])=>`<button class="rrow" data-step="${s}"><span>${l}</span><b>${esc(v)}</b><i>Editar</i></button>`).join('')}</div></div>`; }
  return `<section class="wiz2"><div class="whead"><button class="ghost sm" id="wHome">← Início</button><div class="wprog"><i style="width:${(st+1)/WSTEPS.length*100}%"></i></div><span class="mono muted">${st+1}/${WSTEPS.length}</span></div>
   <div class="wsteps2">${WSTEPS.map(([n],i)=>`<button class="ws ${i===st?'on':i<st?'done':''}" data-step="${i}">${n}</button>`).join('')}</div>
   <div class="wgrid">${posterHTML()}<div class="wmain"><div class="card wbody2 fadein" key="${st}"><span class="eyebrow">${WSTEPS[st][1]}</span><h2>${WSTEPS[st][0]}</h2>${body}</div>
    <div class="wnav">${st>0?'<button class="ghost" id="wBack">Voltar</button>':'<span></span>'}${st<WSTEPS.length-1?'<button class="cta" id="wNext">Próximo</button>':'<button class="cta big" id="go">Começar aos 25 anos</button>'}</div></div></div></section>`;
}
function renderSetup(){
  $('#dock').hidden=true; const fb=$('#fab'); if(fb) fb.hidden=true;
  const scr=SETUP.screen||'title';
  $('#app').innerHTML=scr==='title'?titleHTML():wizardHTML();
  const rr=()=>renderSetup(), top=()=>window.scrollTo(0,0);
  if(scr==='title'){
    $('#tNew').onclick=()=>{ SETUP.screen='wiz'; SETUP.step=0; SFX.open(); rr(); top(); };
    const tc=$('#tCont'); if(tc) tc.onclick=()=>{ const id=slotIndex().find(x=>!x.ended).id; resume(id); };
    $('#tCode').onclick=showImport;
    document.querySelectorAll('[data-load]').forEach(b=>b.onclick=()=>resume(b.dataset.load));
    document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{ if(b.dataset.armed){ deleteSlot(b.dataset.del); rr(); } else { b.dataset.armed='1'; b.textContent='Confirmar'; b.classList.add('danger'); } });
    return;
  }
  const nm=$('#nome'); if(nm) nm.oninput=e=>{ SETUP.nome=e.target.value; const n=$('.pname'); if(n) n.textContent=nomeSetup(); };
  $('#wHome').onclick=()=>{ SETUP.screen='title'; rr(); top(); };
  document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{SETUP.step=+b.dataset.step;rr();top()});
  document.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{SETUP.gen=b.dataset.g;SETUP.look=randomLook(SETUP.gen,'g'+Math.random());rr()});
  document.querySelectorAll('[data-sug]').forEach(b=>b.onclick=()=>{SETUP.look=randomLook(SETUP.gen,'s'+SUGN+'-'+b.dataset.sug);rr()});
  const ms=$('#moreSug'); if(ms) ms.onclick=()=>{SUGN++;rr()};
  const dc=$('#dice'); if(dc) dc.onclick=()=>{SETUP.look=randomLook(SETUP.gen,'d'+Math.random());SFX.click();rr()};
  const L=lookOf();
  document.querySelectorAll('[data-skin]').forEach(b=>b.onclick=()=>{L.skin=+b.dataset.skin;rr()});
  document.querySelectorAll('[data-hs]').forEach(b=>b.onclick=()=>{L.st=b.dataset.hs;rr()});
  document.querySelectorAll('[data-hc]').forEach(b=>b.onclick=()=>{L.hc=b.dataset.hc;rr()});
  document.querySelectorAll('[data-tg]').forEach(b=>b.onclick=()=>{L[b.dataset.tg]=!L[b.dataset.tg];rr()});
  document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{SETUP.arch=b.dataset.a;rr()});
  document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{SETUP.city=b.dataset.c;rr()});
  document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{SETUP.party=b.dataset.p;rr()});
  const nx=$('#wNext'); if(nx) nx.onclick=()=>{SETUP.step=(SETUP.step||0)+1;SFX.click();rr();top()};
  const bk=$('#wBack'); if(bk) bk.onclick=()=>{SETUP.step=(SETUP.step||0)-1;rr();top()};
  const go=$('#go'); if(go) go.onclick=()=>{ SFX.win(); SETUP.step=0; SETUP.screen='title'; newGame(); };
  if((SETUP.step||0)===3) bindCityPicker();
}
function resume(id){ const s=load(id); if(!s){ toast('Não foi possível abrir essa carreira neste navegador.',null,true); return; } S=s; PREV=null; TAB='agenda'; SFX.open(); renderGame(); window.scrollTo(0,0); if(S.ended) showEnding(); }
function showImport(){
  openModal(`<div class="sheet-pad"><div class="eyebrow">Carreiras</div><h2>Carregar código</h2><p class="txt">Cole aqui o código copiado no Perfil de outra partida ou de outro aparelho.</p><textarea id="impT" class="codebox" rows="5" placeholder="VE1:..."></textarea><div class="row"><button class="cta" id="impOk">Carregar</button><button class="ghost" id="impNo">Cancelar</button></div><p id="impMsg" class="muted" style="margin:0"></p></div>`);
  $('#impNo').onclick=closeModal;
  $('#impOk').onclick=()=>{ const o=importCode($('#impT').value); if(!o){ $('#impMsg').textContent='Código inválido. Confira se copiou tudo, do “VE” ao final.'; return; } S=o; save(); closeModal(); PREV=null; TAB='agenda'; renderGame(); toast('Carreira carregada.'); };
}
function showExport(){
  const code=exportCode();
  openModal(`<div class="sheet-pad"><div class="eyebrow">Carreira</div><h2>Código da carreira</h2><p class="txt">Guarde este código para continuar em outro aparelho ou navegador. Na tela inicial, use “Carregar código”.</p><textarea id="expT" class="codebox" rows="6" readonly>${esc(code)}</textarea><div class="row"><button class="cta" id="expCp">Copiar</button><button class="ghost" id="expNo">Fechar</button></div><p id="expMsg" class="muted" style="margin:0">${fmt(code.length)} caracteres</p></div>`);
  $('#expNo').onclick=closeModal;
  $('#expCp').onclick=()=>{ const t=$('#expT'); const ok=()=>{$('#expMsg').textContent='Copiado.'}; try{ navigator.clipboard.writeText(code).then(ok,()=>{t.select();$('#expMsg').textContent='Selecionei o código: copie com Ctrl+C ou segurando o dedo.'}); }catch(e){ t.select(); $('#expMsg').textContent='Selecionei o código: copie com Ctrl+C ou segurando o dedo.'; } };
}

// ---------- governos ----------
function satCol(v){ return v<35?'var(--red)':v<55?'var(--orange)':'var(--green)'; }
function govSpark(h){ if(!h||h.length<2) return ''; const W=120,H=28, mn=Math.min(...h)-2, mx=Math.max(...h)+2, xs=i=>2+(W-4)*i/(h.length-1), ys=v=>H-2-(H-6)*((v-mn)/(mx-mn||1)); return `<svg viewBox="0 0 ${W} ${H}" class="spark" preserveAspectRatio="none"><polyline points="${h.map((v,i)=>`${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(' ')}" fill="none" stroke="var(--gold)" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`; }
function govCard(lv){
  const g=S.govs[lv], ap=govAP(g), H=S.world.heat, iss=ISS_KEYS.filter(i=>H[i]>=25).sort((a,b)=>H[b]-H[a]).slice(0,7);
  return `<div class="card govc"><div class="ghd">${g.me?myPortrait('av-md'):portrait(g,'av-md')}<div style="min-width:0;flex:1"><span class="eyebrow">${esc(govTitle(lv))}</span><b>${esc(g.name)}${g.me?' <span class="tagg">você</span>':''}</b><small class="muted"><i class="dot" style="background:${PCOLOR[g.party]}"></i>${PARTIES[g.party].sig} · desde ${g.since}${g.terms>1?' · reeleito(a)':''}</small></div><div class="gap"><b class="mono" style="color:${satCol(ap)}">${Math.round(ap)}%</b><small>aprovação</small>${govSpark(g.hist)}</div></div>
   <div class="gsat">${iss.map(i=>`<div class="gs"><span>${ISS[i].n}</span><div class="bar"><i style="width:${g.sat[i]}%;background:${satCol(g.sat[i])}"></i></div><b class="mono">${Math.round(g.sat[i])}%</b></div>`).join('')}</div>
   ${g.me?'':`<p class="gtip"><b>Onde atacar:</b> ${govWorst(g,3).map(i=>ISS[i].n.toLowerCase()).join(', ')}. <b>Onde não vale a pena:</b> ${govBest(g,2).map(i=>ISS[i].n.toLowerCase()).join(', ')}.</p>`}
   ${g.past&&g.past.length?`<details class="gpast"><summary>Governos anteriores (${g.past.length})</summary><div class="tbl-wrap"><table><tr><th>Quem</th><th>Partido</th><th>Período</th><th>Aprovação final</th></tr>${g.past.slice().reverse().map(p=>`<tr><td>${esc(p.name)}${p.me?' (você)':''}</td><td>${PARTIES[p.party]?PARTIES[p.party].sig:''}</td><td class="mono">${p.from}–${p.to}</td><td class="n" style="color:${satCol(p.ap)}">${p.ap}%</td></tr>`).join('')}</table></div></details>`:''}</div>`;
}
function governosHTML(){
  if(!S.govs) return '';
  return `<section class="sect"><h2>Governos em exercício</h2><p class="muted" style="margin:-4px 0 0;font-size:13.5px">Satisfação da população com cada área. Onde o governo vai mal, a pauta esquenta e quem apresenta solução ganha votos.</p><div class="grid3">${['mun','est','fed'].map(govCard).join('')}</div></section>`;
}
function targetLevel(){ const ne=nextElectionInfo(); const k=targetOffice(ne.y); return {ver:'mun',pref:'mun',dest:'est',gov:'est',sen:'est',dfed:'fed',pres:'fed'}[k]||'mun'; }
function focoHTML(){
  if(!S.govs) return ''; const lv=targetLevel(), g=S.govs[lv]; if(g.me) return '';
  const w=govWorst(g,3);
  return `<section class="sect"><h2>Onde focar</h2><div class="card foco"><div class="ghd">${portrait(g,'av-sm')}<div style="flex:1;min-width:0"><b>${esc(govTitle(lv))}: ${esc(g.name)}</b><small class="muted">${PARTIES[g.party].sig} · aprovação ${Math.round(govAP(g))}% · ${g.party===S.party?'governo do seu partido':'oposição a você'}</small></div><button class="ghost sm" data-tab="campanha">Ver governos</button></div>
   <div class="fchips">${w.map(i=>`<span class="fchip" style="--fc:${satCol(g.sat[i])}"><b>${ISS[i].n}</b> ${Math.round(g.sat[i])}% aprovam · temperatura ${Math.round(S.world.heat[i])}</span>`).join('')}</div>
   <p class="muted" style="margin:0;font-size:12.5px">Esses são os pontos fracos de quem governa hoje o nível que você vai disputar. Ganhar credibilidade nessas pautas rende mais votos.</p></div></section>`;
}
