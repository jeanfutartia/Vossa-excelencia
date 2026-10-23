// ================= v6: CIDADES, BALANÇA DE ATENÇÃO, BIOGRAFIA =================
const REGS=['Norte','Nordeste','Centro-Oeste','Sudeste','Sul'];
function cityPickerHTML(){
  const f=SETUP.cf=SETUP.cf||{reg:'todas',type:'todas'}, sel=CITIES[SETUP.city]||CITIES[CITY_KEYS[0]];
  const list=CITY_KEYS.filter(k=>{const c=CITIES[k]; return (f.reg==='todas'||c.reg===f.reg)&&(f.type==='todas'||c.type===f.type);}).sort((a,b)=>CITIES[b].popK-CITIES[a].popK);
  const diff=c=>{const d=(c.verMod+c.prefMod+8)/4; return Math.max(1,Math.min(5,Math.round(d)));};
  return `<p class="muted" style="margin:0">90 cidades reais. A cidade define o tamanho do eleitorado, os grupos que pesam mais, o estado pelo qual você disputará os cargos estaduais e federais, e a dificuldade das primeiras eleições.</p>
   <div class="card cdet"><div class="cthumb">${scene(CTYPE[sel.type].scene,{seed:SETUP.city,tod:'dusk'})}</div><div class="cinfo"><span class="eyebrow">Cidade escolhida</span><b>${esc(sel.n)} <span class="muted">· ${sel.sigla}</span></b><small>${esc(sel.uf)} · ${sel.reg} · ${CTYPE[sel.type].n}</small>
    <div class="kv"><span>População</span><span class="mono">${sel.pop}</span><span>Eleitorado (est.)</span><span class="mono">${fmt(sel.elec)}</span><span>Câmara Municipal</span><span class="mono">${sel.seats} vereadores</span><span>Prefeito</span><span>${sel.twoRound?'Dois turnos':'Turno único'}</span><span>Estado</span><span class="mono">${sel.dfedSeats} dep. federais · ${sel.destSeats} estaduais</span><span>Canais</span><span>${sel.canais}</span><span>Desafio</span><span>${sel.dif}</span></div></div></div>
   <div class="cflt"><input id="csearch" type="search" placeholder="Buscar cidade ou estado" autocomplete="off" aria-label="Buscar cidade">
    <div class="chips-sel">${['todas',...REGS].map(r=>`<button class="chip-sel sm" data-cfr="${r}" aria-pressed="${f.reg===r}">${r==='todas'?'Todas as regiões':r}</button>`).join('')}</div>
    <div class="chips-sel">${['todas',...Object.keys(CTYPE)].map(t=>`<button class="chip-sel sm" data-cft="${t}" aria-pressed="${f.type===t}">${t==='todas'?'Todos os perfis':CTYPE[t].n}</button>`).join('')}</div></div>
   <div class="clist" id="clist">${list.map(k=>{const c=CITIES[k];return `<button class="crow" data-c="${k}" data-q="${esc(slug(c.n+' '+c.uf+' '+c.sigla))}" aria-pressed="${SETUP.city===k}"><span class="cn"><b>${esc(c.n)}</b><small>${c.sigla} · ${CTYPE[c.type].n}</small></span><span class="cp mono">${c.pop.replace(' hab.','')}</span><span class="cd" title="Dificuldade">${'●'.repeat(diff(c))}${'○'.repeat(5-diff(c))}</span></button>`}).join('')||'<p class="muted">Nenhuma cidade com esses filtros.</p>'}</div>`;
}
function bindCityPicker(){
  document.querySelectorAll('[data-cfr]').forEach(b=>b.onclick=()=>{SETUP.cf.reg=b.dataset.cfr;renderSetup()});
  document.querySelectorAll('[data-cft]').forEach(b=>b.onclick=()=>{SETUP.cf.type=b.dataset.cft;renderSetup()});
  const s=$('#csearch'); if(s){ s.value=SETUP.cq||''; const ap=()=>{ const q=slug(s.value); SETUP.cq=s.value; document.querySelectorAll('#clist .crow').forEach(r=>r.hidden=!!q&&!r.dataset.q.includes(q)); }; s.oninput=ap; ap(); }
  const cur=document.querySelector('#clist .crow[aria-pressed="true"]'); if(cur&&cur.scrollIntoView) try{ cur.scrollIntoView({block:'nearest'}); }catch(e){}
}

// ---------- balança de atenção ----------
function balRow(a,nd){
  const b=nd?0:a.bal, w=Math.min(50,Math.abs(b)/2*50), side=b<0?'l':'r', col=Math.abs(b)<0.6?'var(--green)':b<0?'var(--red)':'var(--orange)';
  return `<div class="brow" data-tip="${esc(a.n)}: ${esc(a.why)}${a.since!=null?` · última decisão a favor há ${a.since} tri`:''}"><div class="bh"><b>${esc(a.n)}</b><span class="mono muted">${esc(String(a.val))}</span><span class="zc" style="--zc:${ZONE[a.zone].c}">${ZONE[a.zone].n}</span></div>
   <div class="btrack"><i class="bmid"></i>${nd?'':`<i class="bfill ${side}" style="width:${w}%;background:${col}"></i>`}</div></div>`;
}
function balanceHTML(L){
  const nd=L.total<8, ord={aband:0,exag:1,ok:2,nd:2,irr:3};
  const grp=(fam,t)=>{ const rows=L.filter(a=>a.fam===fam).sort((x,y)=>(ord[x.zone]-ord[y.zone])||(Math.abs(y.bal)*y.imp-Math.abs(x.bal)*x.imp)); return `<div class="card bcard"><h3>${t}</h3>${rows.map(a=>balRow(a,nd)).join('')}</div>`; };
  return `<section class="sect"><h2>Balança de atenção</h2><div class="card bleg"><p class="muted" style="margin:0;font-size:13px">Compara o peso de cada área hoje com quanto das suas decisões dos últimos dois anos foi para ela. Barra para a esquerda: está faltando atenção. Para a direita: atenção demais. Perto do meio: equilibrado. Toque numa linha para ver o detalhe.</p>
   <div class="bscale"><span style="color:var(--red)">← falta atenção</span><span style="color:var(--green)">equilibrado</span><span style="color:var(--orange)">atenção demais →</span></div></div>
   <div class="grid3">${grp('seg','Grupos do eleitorado')}${grp('iss','Pautas em alta')}${grp('inst','Recursos e instituições')}</div></section>`;
}

// ---------- biografia ----------
function bioHTML(){
  const ps=bioParagraphs();
  return `<article class="card bio"><div class="bio-hd">${myPortrait('av-lg')}<div><span class="eyebrow">Biografia</span><h3>${esc(S.nome)}</h3><small class="muted">Escrita a partir das suas escolhas · atualizada a cada trimestre</small></div></div>
   ${ps.map((p,i)=>`<section class="bsec"><h4>${p.h}</h4><p class="${i===0?'dropcap':''}">${esc(p.t)}</p></section>`).join('')}</article>`;
}
