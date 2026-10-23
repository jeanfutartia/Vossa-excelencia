// ================= ARTE (SVG gerado) =================
function hash(s){s=String(s);let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}return h>>>0}
function rng(seed){let a=hash(seed);return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const SKIN=['#F4D5BC','#EBC09C','#D9A274','#C08655','#9A6440','#74472A','#4E2F1C'];
const HAIRC=['#15100C','#2B1D14','#45301F','#6A4A2C','#9C6E44','#C9A266'];
let AVN=0;
function avatar(seed,gen,color,o){
  o=o||{}; const R=rng('av'+seed); const r=a=>a[Math.floor(R()*a.length)];
  let skin=r(SKIN); const old=R()<.18; let hc=old?(R()<.5?'#9A9A9A':'#D7D7D7'):r(HAIRC); const shirt=color||'#41557D';
  let st=r(gen==='f'?['long','bob','bun','curly','pony','long','bob']:['short','side','bald','buzz','curly','short','side']);
  let glasses=R()<.28, beard=gen==='m'&&R()<.3, tie=gen==='m'&&R()<.65, ear=gen==='f'&&R()<.6; const id='av'+(++AVN);
  if(o.look){ const L=o.look; skin=SKIN[L.skin]||skin; st=L.st||st; hc=L.hc||hc; glasses=!!L.glasses; beard=!!L.beard; tie=!!L.tie; ear=!!L.ear; }
  const H=c=>`fill="${c}"`;
  const back={long:`<path d="M23 34 C21 15 59 15 57 34 L61 66 L19 66Z" ${H(hc)}/>`,curly:`<circle cx="40" cy="31" r="21" ${H(hc)}/><circle cx="23" cy="41" r="8" ${H(hc)}/><circle cx="57" cy="41" r="8" ${H(hc)}/>`,
    bob:`<path d="M22 36 C20 13 60 13 58 36 L59 52 C52 55 28 55 21 52Z" ${H(hc)}/>`,pony:`<path d="M52 28 C66 32 66 56 57 62 C59 48 56 37 49 33Z" ${H(hc)}/>`,bun:`<circle cx="40" cy="15" r="7.5" ${H(hc)}/>`}[st]||'';
  const top={short:`<path d="M25 33 C24 16 56 14 55 33 C52 25 46 22 40 22 C33 22 28 25 25 33Z" ${H(hc)}/>`,
    side:`<path d="M25 34 C23 15 57 14 55 32 C50 22 38 21 33 27 C30 24 27 28 25 34Z" ${H(hc)}/>`,
    bald:`<path d="M24.6 37 C24.6 30 26.8 27.5 28.4 29.5 L28.4 39Z M55.4 37 C55.4 30 53.2 27.5 51.6 29.5 L51.6 39Z" ${H(hc)}/>`,
    buzz:`<path d="M25.5 33 C25 18 55 18 54.5 33 C51 26 29 26 25.5 33Z" ${H(hc)} opacity=".88"/>`,
    curly:`<path d="M25 32 C24 17 56 17 55 32 C50 25 30 25 25 32Z" ${H(hc)}/>`,
    long:`<path d="M24 37 C23 16 57 16 56 37 C52 26 44 23 40 23 C34 23 28 27 24 37Z" ${H(hc)}/>`,
    bob:`<path d="M24 37 C23 16 57 16 56 37 C50 27 30 27 24 37Z" ${H(hc)}/>`,
    bun:`<path d="M25 33 C24 17 56 17 55 33 C51 24 29 24 25 33Z" ${H(hc)}/>`,
    pony:`<path d="M25 33 C24 17 56 17 55 33 C51 24 29 24 25 33Z" ${H(hc)}/>`}[st];
  const mouthC=gen==='f'?'#B04A5E':'#7A3A34';
  return `<svg viewBox="0 0 80 80" class="avatar${o.cls?' '+o.cls:''}" role="img" aria-label="Retrato"><defs><clipPath id="${id}"><circle cx="40" cy="40" r="40"/></clipPath><radialGradient id="${id}b" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="${shirt}" stop-opacity=".55"/><stop offset="1" stop-color="#0D1526"/></radialGradient></defs>
  <g clip-path="url(#${id})"><rect width="80" height="80" fill="url(#${id}b)"/>${back}
  <path d="M5 84 C7 62 24 55 40 55 C56 55 73 62 75 84Z" ${H(shirt)}/><path d="M5 84 C7 62 24 55 40 55 C56 55 73 62 75 84Z" fill="#000" opacity=".18"/>
  <path d="M32.5 55.5 L40 66 L47.5 55.5Z" fill="#EEF1F6"/>${tie?`<path d="M38.4 60 L41.6 60 L43.2 75 L40 79 L36.8 75Z" fill="#141B2E"/>`:`<path d="M33 58 Q40 66 47 58" stroke="#F2C14E" fill="none" stroke-width="1.3"/>`}
  <rect x="35" y="45" width="10" height="12" rx="4" ${H(skin)}/><rect x="35" y="49" width="10" height="4" fill="#000" opacity=".12"/>
  <ellipse cx="25" cy="38" rx="3" ry="4.6" ${H(skin)}/><ellipse cx="55" cy="38" rx="3" ry="4.6" ${H(skin)}/>
  <ellipse cx="40" cy="36" rx="15" ry="17.5" ${H(skin)}/>${top}
  <path d="M30.5 32 Q34 30.2 37 31.9 M43 31.9 Q46 30.2 49.5 32" stroke="${hc}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
  <ellipse cx="34" cy="37" rx="1.7" ry="2.1" fill="#16161E"/><ellipse cx="46" cy="37" rx="1.7" ry="2.1" fill="#16161E"/>
  <path d="M40 38 Q38.4 42.6 40.9 43.1" stroke="#000" stroke-opacity=".22" fill="none" stroke-width="1.1"/>
  ${beard?`<path d="M26 40 C27 55 34 55.5 40 55.5 C46 55.5 53 55 54 40 C52 47.5 47 49.5 40 49.5 C33 49.5 28 47.5 26 40Z" ${H(hc)} opacity=".92"/>`:''}
  <path d="M35.5 46 Q40 49.6 44.5 46" stroke="${mouthC}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
  ${glasses?`<g fill="none" stroke="#0B1020" stroke-width="1.4"><circle cx="34" cy="37" r="4.3"/><circle cx="46" cy="37" r="4.3"/><path d="M38.3 37 L41.7 37"/></g>`:''}
  ${ear?`<circle cx="25" cy="43.5" r="1.3" fill="#F2C14E"/><circle cx="55" cy="43.5" r="1.3" fill="#F2C14E"/>`:''}</g>
  ${o.ring?`<circle cx="40" cy="40" r="38.5" fill="none" stroke="${o.ring}" stroke-width="3"/>`:''}</svg>`;
}

// ---------- cenários ----------
let SCN=0;
const B1='#1A2540',B2='#24345A',B3='#2E4170',WIN='#F2C14E',GROUND='#080D18';
function windows(x,y,cols,rows,dx,dy,R,p){let s='';for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){if(R()<(p||.55))s+=`<rect x="${x+i*dx}" y="${y+j*dy}" width="${dx*.45}" height="${dy*.45}" fill="${WIN}" opacity="${(.35+R()*.6).toFixed(2)}"/>`}return s}
function flag(x,y){return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y-34}" stroke="#AEB6C8" stroke-width="1.4"/><g class="wave" style="transform-origin:${x}px ${y-34}px"><rect x="${x}" y="${y-34}" width="20" height="13" fill="#1E9E5A"/><path d="M${x+10} ${y-31.5} L${x+17.5} ${y-27.5} L${x+10} ${y-23.5} L${x+2.5} ${y-27.5}Z" fill="#F2C14E"/><circle cx="${x+10}" cy="${y-27.5}" r="2.6" fill="#2A4DA8"/></g>`}
function crowd(R,y,n,col){let s='';for(let i=0;i<n;i++){const x=R()*400,r=4+R()*3;s+=`<g class="bob" style="animation-delay:${(R()*1.5).toFixed(2)}s"><circle cx="${x.toFixed(1)}" cy="${(y-r).toFixed(1)}" r="${r.toFixed(1)}" fill="${col||'#0F1728'}"/><rect x="${(x-r*1.3).toFixed(1)}" y="${(y-0.2).toFixed(1)}" width="${(r*2.6).toFixed(1)}" height="14" rx="4" fill="${col||'#0F1728'}"/></g>`}return s}
function skyline(R,y,n,col,h){let s='',x=0;while(x<400){const w=18+R()*34,hh=(h||40)+R()*(h||40);s+=`<rect x="${x.toFixed(1)}" y="${(y-hh).toFixed(1)}" width="${w.toFixed(1)}" height="${hh.toFixed(1)}" fill="${col}"/>`;s+=windows(x+4,y-hh+6,Math.floor(w/8),Math.floor(hh/9),8,9,R,.35);x+=w+2}return s}
function scene(kind,o){
  o=o||{}; const id='sc'+(++SCN); const R=rng(kind+(o.seed||'')); kind=kind||'skyline';
  const night=['pf','presidio','dinheiro','tv'].includes(kind);
  const TOD={night:['#04070E','#16203D'],twilight:['#0D1834','#3E2F5E'],dusk:['#1F1A45','#C35E48'],dawn:['#172852','#E39A5C'],day:['#285A9E','#93BCE3'],storm:['#0C1019','#343E52']};
  const special={fumaca:['#3A1C14','#B8642C'],enchente:['#141C2B','#34465E'],campo:['#24365F','#E2A35C'],estrada:['#22325A','#D98C4E']}[kind];
  const tod=special?'x':(o.tod||(night?'night':['twilight','dusk','dawn','day','night','storm','twilight'][Math.floor(R()*7)]));
  const sky=special||TOD[tod];
  let s=`<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" class="scene" aria-hidden="true"><defs><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient><radialGradient id="${id}l"><stop offset="0" stop-color="#FFE3A0" stop-opacity=".85"/><stop offset="1" stop-color="#FFE3A0" stop-opacity="0"/></radialGradient></defs><rect width="400" height="150" fill="url(#${id}g)"/>`;
  const stars={night:30,twilight:22,dusk:8,dawn:6}[tod]||0;
  for(let i=0;i<stars;i++) s+=`<circle class="tw" style="animation-delay:${(R()*3).toFixed(2)}s" cx="${(R()*400).toFixed(1)}" cy="${(R()*70).toFixed(1)}" r="${(.5+R()*.9).toFixed(2)}" fill="#fff" opacity=".7"/>`;
  if(tod==='day') s+=`<circle cx="320" cy="30" r="34" fill="url(#${id}l)"/><circle cx="320" cy="30" r="12" fill="#FFF4C8"/>`;
  else if(tod==='dusk'||tod==='dawn') s+=`<circle cx="${tod==='dusk'?300:90}" cy="112" r="40" fill="url(#${id}l)"/><circle cx="${tod==='dusk'?300:90}" cy="112" r="15" fill="#FFC98A" opacity=".95"/>`;
  else if(tod==='night'||tod==='twilight') s+=`<circle cx="330" cy="30" r="10" fill="#EEF1F8" opacity=".92"/><circle cx="335" cy="27" r="9" fill="${sky[0]}"/>`;
  if(tod==='day') for(let i=0;i<3;i++){ const x=R()*360,y=12+R()*40; s+=`<g opacity=".55" fill="#fff"><ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="26" ry="8"/><ellipse cx="${(x+16).toFixed(0)}" cy="${(y-5).toFixed(0)}" rx="16" ry="8"/></g>`; }
  if(tod==='storm') s+=`<path d="M250 0 L238 40 L250 40 L232 82" stroke="#E8F0FF" stroke-width="2" fill="none" class="flash"/>`;
  const G=`<rect y="132" width="400" height="18" fill="${GROUND}"/>`;
  const body={
   skyline:()=>skyline(R,134,0,B1,30)+skyline(R,134,0,B2,18),
   camara:()=>skyline(R,134,0,B1,22)+`<rect x="110" y="118" width="180" height="16" fill="${B3}"/><rect x="120" y="112" width="160" height="7" fill="${B3}"/><rect x="128" y="62" width="144" height="50" fill="${B2}"/>`+[0,1,2,3,4,5].map(i=>`<rect x="${136+i*24}" y="64" width="9" height="48" fill="#3A5185"/>`).join('')+`<path d="M120 62 L200 30 L280 62Z" fill="${B3}"/><circle cx="200" cy="50" r="6" fill="${WIN}" opacity=".8"/>`+flag(282,62),
   prefeitura:()=>skyline(R,134,0,B1,24)+`<rect x="100" y="70" width="200" height="64" fill="${B2}"/>`+windows(108,78,12,5,16,11,R,.7)+`<rect x="180" y="30" width="40" height="44" fill="${B3}"/><circle cx="200" cy="46" r="10" fill="#E9E2C8" opacity=".9"/><path d="M200 46 L200 39 M200 46 L205 48" stroke="#1A2540" stroke-width="1.6"/><path d="M176 30 L200 16 L224 30Z" fill="${B3}"/>`+flag(200,16),
   assembleia:()=>skyline(R,134,0,B1,22)+`<rect x="80" y="84" width="240" height="50" fill="${B2}"/>`+windows(88,92,14,4,16,10,R,.6)+`<path d="M150 84 A50 46 0 0 1 250 84Z" fill="${B3}"/><rect x="196" y="30" width="8" height="10" fill="${B3}"/>`+flag(204,38),
   congresso:()=>`<rect x="30" y="112" width="340" height="8" fill="${B3}"/><rect x="30" y="120" width="340" height="14" fill="${B2}"/><path d="M66 92 L170 92 Q156 112 118 112 Q80 112 66 92Z" fill="#3A5290"/><path d="M240 112 A40 28 0 0 1 320 112Z" fill="#3A5290"/><rect x="186" y="22" width="12" height="90" fill="${B3}"/><rect x="202" y="22" width="12" height="90" fill="${B3}"/><rect x="186" y="56" width="28" height="5" fill="${B3}"/>`+windows(187,26,1,9,9,9,R,.8)+windows(203,26,1,9,9,9,R,.8),
   planalto:()=>`<rect x="30" y="98" width="340" height="8" fill="${B3}"/><rect x="40" y="106" width="320" height="22" fill="${B2}"/>`+windows(48,110,24,2,13,9,R,.7)+Array.from({length:9},(_,i)=>`<path d="M${52+i*37} 128 Q${62+i*37} 112 ${52+i*37} 96 L${58+i*37} 96 Q${68+i*37} 112 ${58+i*37} 128Z" fill="#3F5793"/>`).join('')+`<path d="M110 128 L170 106 L176 106 L118 132Z" fill="${B3}"/>`+flag(360,98),
   palacio:()=>skyline(R,134,0,B1,20)+`<rect x="90" y="76" width="220" height="58" fill="${B2}"/>`+windows(98,84,13,4,16,12,R,.65)+`<path d="M170 76 L200 52 L230 76Z" fill="${B3}"/><rect x="186" y="96" width="28" height="38" fill="#3A5185"/>`+flag(200,52),
   comicio:()=>skyline(R,120,0,B1,18)+`<rect x="120" y="70" width="160" height="40" fill="#C62F3E"/><text x="200" y="97" text-anchor="middle" font-family="Bodoni Moda,Georgia,serif" font-style="italic" font-size="22" fill="#FFF3D6">Vote ${esc((o.num||'')+'')}</text><rect x="110" y="110" width="180" height="10" fill="${B3}"/>`+`<circle cx="70" cy="40" r="30" fill="url(#${id}l)" class="spot"/><circle cx="330" cy="50" r="30" fill="url(#${id}l)" class="spot" style="animation-delay:.8s"/>`+crowd(R,150,34,'#0B1222')+crowd(R,146,20,'#141F38'),
   tv:()=>`<rect x="0" y="0" width="400" height="150" fill="#070B14" opacity=".4"/><path d="M80 0 L40 150 L140 150Z" fill="url(#${id}l)" class="spot" opacity=".5"/><path d="M320 0 L260 150 L360 150Z" fill="url(#${id}l)" class="spot" style="animation-delay:1s" opacity=".5"/><rect x="150" y="20" width="100" height="56" rx="4" fill="#16244A"/><rect x="156" y="26" width="88" height="44" fill="#2B5DC0" opacity=".7"/><text x="200" y="54" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="10" fill="#fff">AO VIVO</text><rect x="70" y="92" width="60" height="42" fill="${B3}"/><rect x="270" y="92" width="60" height="42" fill="${B3}"/><circle cx="100" cy="80" r="10" fill="#0D1526"/><circle cx="300" cy="80" r="10" fill="#0D1526"/><circle cx="70" cy="10" r="4" fill="#F33" class="blink"/>`,
   enchente:()=>`<g class="rain">${Array.from({length:40},()=>`<line x1="${(R()*400).toFixed(0)}" y1="${(R()*120).toFixed(0)}" x2="${(R()*400).toFixed(0)}" y2="0" stroke="#9FB6D6" stroke-opacity=".0"/>`).join('')}${Array.from({length:50},()=>{const x=R()*400,y=R()*130;return `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x-4).toFixed(0)}" y2="${(y+10).toFixed(0)}" stroke="#9FB6D6" stroke-opacity=".45"/>`}).join('')}</g>`+Array.from({length:6},(_,i)=>`<rect x="${20+i*64}" y="${78+R()*14}" width="44" height="50" fill="${B2}"/><path d="M${16+i*64} ${80+R()*6} L${42+i*64} 62 L${68+i*64} 82Z" fill="${B3}"/>`).join('')+`<path class="wavey" d="M0 112 Q25 104 50 112 T100 112 T150 112 T200 112 T250 112 T300 112 T350 112 T400 112 L400 150 L0 150Z" fill="#2E5E8C" opacity=".85"/><path d="M0 122 Q25 116 50 122 T100 122 T150 122 T200 122 T250 122 T300 122 T350 122 T400 122 L400 150 L0 150Z" fill="#244B72"/>`,
   pf:()=>skyline(R,134,0,B1,26)+`<rect x="150" y="104" width="110" height="22" rx="6" fill="#E7ECF4"/><rect x="170" y="92" width="64" height="16" rx="4" fill="#D3DAE6"/><rect x="178" y="95" width="22" height="10" fill="#1A2540"/><rect x="204" y="95" width="22" height="10" fill="#1A2540"/><text x="205" y="120" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="9" font-weight="600" fill="#1A2540">POLÍCIA FEDERAL</text><circle cx="170" cy="128" r="7" fill="#0A0F1A"/><circle cx="240" cy="128" r="7" fill="#0A0F1A"/><rect x="190" y="86" width="12" height="6" fill="#F33" class="blink"/><rect x="204" y="86" width="12" height="6" fill="#36F" class="blink2"/><circle cx="196" cy="88" r="26" fill="#F33" opacity=".18" class="blink"/><circle cx="210" cy="88" r="26" fill="#36F" opacity=".18" class="blink2"/>`,
   tribunal:()=>`<rect x="90" y="122" width="220" height="12" fill="${B3}"/><rect x="110" y="62" width="180" height="60" fill="${B2}"/>`+[0,1,2,3,4,5,6].map(i=>`<rect x="${116+i*25}" y="64" width="10" height="58" fill="#3A5185"/>`).join('')+`<path d="M100 62 L200 30 L300 62Z" fill="${B3}"/><g stroke="${WIN}" stroke-width="1.6" fill="none"><line x1="200" y1="36" x2="200" y2="56"/><line x1="186" y1="40" x2="214" y2="40"/><path d="M182 40 L178 48 L190 48Z M218 40 L214 48 L226 48Z"/></g>`,
   hospital:()=>skyline(R,134,0,B1,20)+`<rect x="130" y="50" width="140" height="84" fill="${B2}"/>`+windows(138,70,8,5,16,12,R,.75)+`<rect x="190" y="30" width="20" height="56" fill="#E33" opacity=".0"/><rect x="186" y="54" width="28" height="8" fill="#E8464C"/><rect x="196" y="44" width="8" height="28" fill="#E8464C"/><rect x="60" y="112" width="56" height="20" rx="4" fill="#E9EDF4"/><rect x="66" y="106" width="8" height="5" fill="#F33" class="blink"/>`,
   fabrica:()=>`<rect x="40" y="84" width="300" height="50" fill="${B2}"/><path d="M40 84 L80 64 L80 84 L120 64 L120 84 L160 64 L160 84 L200 64 L200 84Z" fill="${B3}"/><rect x="250" y="30" width="16" height="56" fill="${B3}"/><rect x="290" y="40" width="16" height="46" fill="${B3}"/>`+windows(220,94,7,3,16,12,R,.6)+[0,1,2,3].map(i=>`<circle class="smoke" style="animation-delay:${i*.8}s" cx="${258+(i%2)*40}" cy="24" r="${8+i*2}" fill="#6B7590" opacity=".5"/>`).join(''),
   campo:()=>`<path d="M0 104 Q100 80 200 100 T400 92 L400 150 L0 150Z" fill="#2C4A35"/><path d="M0 120 Q120 100 240 118 T400 112 L400 150 L0 150Z" fill="#203826"/>`+Array.from({length:8},(_,i)=>`<path d="M${30+i*48} 150 L${70+i*44} 112" stroke="#3E6447" stroke-width="2"/>`).join('')+`<rect x="280" y="96" width="34" height="22" fill="#6B3A2A"/><path d="M276 96 L297 82 L318 96Z" fill="#8C4A33"/><circle cx="90" cy="104" r="12" fill="#1C3323"/><rect x="88" y="104" width="4" height="12" fill="#1C3323"/>`,
   estrada:()=>`<path d="M0 108 L400 100 L400 150 L0 150Z" fill="#1C2433"/><path d="M0 128 L400 120" stroke="#F2C14E" stroke-width="2" stroke-dasharray="14 10"/>`+Array.from({length:5},(_,i)=>`<g transform="translate(${20+i*78},${96-i})"><rect width="54" height="22" fill="${['#C0392B','#2E86C1','#E0A43A','#7D8BA5','#27AE60'][i]}"/><rect x="54" y="6" width="16" height="16" fill="#D7DDE8"/><circle cx="12" cy="24" r="5" fill="#0A0F1A"/><circle cx="58" cy="24" r="5" fill="#0A0F1A"/></g>`).join('')+crowd(R,136,10,'#0B1222'),
   igreja:()=>skyline(R,134,0,B1,18)+`<rect x="150" y="70" width="100" height="64" fill="${B2}"/><path d="M144 70 L200 40 L256 70Z" fill="${B3}"/><rect x="186" y="18" width="28" height="56" fill="${B3}"/><path d="M200 2 L200 18 M194 8 L206 8" stroke="${WIN}" stroke-width="2"/><circle cx="200" cy="90" r="10" fill="${WIN}" opacity=".7"/><rect x="190" y="108" width="20" height="26" fill="#3A5185"/>`,
   dinheiro:()=>`<rect x="0" y="96" width="400" height="54" fill="#2A1E16"/><circle cx="200" cy="30" r="60" fill="url(#${id}l)"/><path d="M196 0 L196 18 M180 18 L212 18 L222 34 L170 34Z" fill="#D8C08A" stroke="#D8C08A"/><rect x="150" y="84" width="110" height="60" rx="3" fill="#E9DCC0" transform="rotate(-6 205 114)"/><path d="M150 84 L205 118 L260 84" fill="none" stroke="#B9A47A" stroke-width="2" transform="rotate(-6 205 114)"/>`+[0,1,2].map(i=>`<rect x="${226+i*8}" y="${70-i*4}" width="70" height="32" rx="2" fill="#6FB38A" stroke="#3E7C57" transform="rotate(${12+i*6} 260 86)"/>`).join(''),
   imprensa:()=>skyline(R,120,0,B1,16)+[0,1,2,3,4,5].map(i=>{const x=130+i*28,y=70+(i%2)*10;return `<line x1="${x}" y1="${y}" x2="${200}" y2="140" stroke="#5B6C8F" stroke-width="2"/><rect x="${x-7}" y="${y-18}" width="14" height="22" rx="7" fill="#2B3A5E"/><rect x="${x-9}" y="${y-2}" width="18" height="8" fill="${['#E8464C','#3D8BFD','#F2C14E','#22B573','#E9EDF4','#8E44AD'][i]}"/>`}).join('')+`<circle cx="60" cy="40" r="40" fill="#fff" opacity=".0" class="flash"/><circle cx="340" cy="60" r="40" fill="#fff" opacity=".0" class="flash" style="animation-delay:1.3s"/>`,
   urna:()=>skyline(R,134,0,B1,16)+`<rect x="130" y="48" width="140" height="84" rx="6" fill="#D9DEE7"/><rect x="142" y="58" width="70" height="44" fill="#2D3B57"/><text x="177" y="84" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="12" fill="#7CF0B0">FIM</text>`+Array.from({length:12},(_,i)=>`<rect x="${222+(i%3)*14}" y="${60+Math.floor(i/3)*12}" width="11" height="9" rx="1.5" fill="#1C2438"/>`).join('')+`<rect x="222" y="110" width="12" height="9" fill="#ECECEC"/><rect x="236" y="110" width="12" height="9" fill="#E8833A"/><rect x="250" y="110" width="12" height="9" fill="#2BB463"/>`,
   protesto:()=>skyline(R,120,0,B1,22)+Array.from({length:9},(_,i)=>{const x=20+i*44+R()*10,y=78+R()*14;return `<g class="bob" style="animation-delay:${(i*.2).toFixed(1)}s"><line x1="${x+14}" y1="${y+22}" x2="${x+14}" y2="${y+50}" stroke="#8B7A5A" stroke-width="2"/><rect x="${x}" y="${y}" width="30" height="22" fill="${['#F2C14E','#E9EDF4','#E8464C'][i%3]}"/></g>`}).join('')+crowd(R,150,40,'#0B1222'),
   fumaca:()=>`<circle cx="300" cy="50" r="18" fill="#F59B4A" opacity=".55"/>`+Array.from({length:10},(_,i)=>`<circle class="smoke" style="animation-delay:${(i*.4).toFixed(1)}s" cx="${R()*400}" cy="${50+R()*50}" r="${20+R()*24}" fill="#5A3A2E" opacity=".35"/>`).join('')+Array.from({length:22},(_,i)=>`<path d="M${i*19} 134 L${i*19+8} ${100+R()*12} L${i*19+16} 134Z" fill="#1B2A1E"/>`).join(''),
   presidio:()=>`<rect x="40" y="70" width="320" height="64" fill="${B2}"/><rect x="40" y="62" width="320" height="8" fill="${B3}"/><rect x="60" y="30" width="26" height="40" fill="${B3}"/><path d="M73 36 L-20 150 L60 150Z" fill="url(#${id}l)" opacity=".35" class="spot"/>`+Array.from({length:16},(_,i)=>`<rect x="${100+i*15}" y="88" width="3" height="26" fill="#0D1526"/>`).join(''),
  }[kind]||(()=>skyline(R,134,0,B1,30));
  s+=body()+G;
  if(tod==='storm') s+=`<g class="rain">${Array.from({length:60},()=>{const x=R()*400,y=R()*140;return `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x-4).toFixed(0)}" y2="${(y+10).toFixed(0)}" stroke="#9FB6D6" stroke-opacity=".45"/>`}).join('')}</g>`;
  return s+'</svg>';
}

// ---------- ícones ----------
const ICON={
 agenda:'<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
 campanha:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
 equipe:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2c3 .2 5.5 2.4 5.5 5.8"/>',
 jornal:'<rect x="3" y="4" width="15" height="16" rx="1.5"/><path d="M18 8h3v10a2 2 0 0 1-2 2H5M6.5 8h8M6.5 12h8M6.5 16h5"/>',
 carreira:'<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 20h8"/>',
 base:'<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c0-3 2.7-5.5 6-5.5S14 17 14 20M10 20c0-3 2.7-5.5 6-5.5S22 17 22 20"/>',
 midia:'<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
 partido:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 dinheiro:'<ellipse cx="12" cy="6.5" rx="7" ry="3"/><path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
 leg:'<path d="M14 4l6 6M11.5 6.5l6 6M8 10l6 6-3 3-6-6zM15.5 9.5l-3.5 3.5M3 21h9"/>',
 exec:'<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/>',
 pres:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
 juridico:'<path d="M12 3v18M7 21h10M4 7h16M7 7l-3 7h6zM17 7l-3 7h6z"/>',
 camp:'<path d="M3 10v4h3l6 4V6L6 10zM16 8.5a4.5 4.5 0 0 1 0 7M19 6a8 8 0 0 1 0 12"/>',
 star:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
};
function icon(n,cls){return `<svg viewBox="0 0 24 24" class="ico ${cls||''}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]||''}</svg>`}

// ---------- hemiciclo ----------
function hemicycle(groups){ // groups: [{color,n,dim}]
  const total=groups.reduce((a,g)=>a+g.n,0); const rows=5, pts=[];
  const radii=Array.from({length:rows},(_,i)=>60+i*14), lens=radii.map(r=>r), L=lens.reduce((a,b)=>a+b,0);
  radii.forEach(r=>{const k=Math.round(total*r/L);for(let j=0;j<k;j++){const a=Math.PI*(j+.5)/k;pts.push({a,x:160-Math.cos(a)*r,y:140-Math.sin(a)*r})}});
  while(pts.length>total) pts.pop(); while(pts.length<total) pts.push({a:Math.PI/2,x:160,y:140-60});
  pts.sort((p,q)=>p.a-q.a); let i=0,s='';
  for(const g of groups) for(let j=0;j<g.n;j++){const p=pts[i++]; if(!p) break; s+=`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.6" fill="${g.color}" opacity="${g.dim?.25:1}"/>`}
  return `<svg viewBox="0 0 320 150" class="hemi" role="img" aria-label="Composição da Casa">${s}</svg>`;
}
