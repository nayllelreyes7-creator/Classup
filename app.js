const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const avatarSVG=`<svg viewBox="0 0 100 100" width="80%" fill="#B0B3B6"><circle cx="50" cy="38" r="20"/><path d="M12 100c0-24 17-38 38-38s38 14 38 38z"/></svg>`;
$$('.mini').forEach(m=>m.innerHTML=avatarSVG);
let tt; function toast(t){const el=$('#toast');el.textContent=t;el.hidden=false;clearTimeout(tt);tt=setTimeout(()=>el.hidden=true,2400)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-toast]');if(t){e.preventDefault();toast(t.dataset.toast)}});

/* Navegación */
function go(id){$$('.view').forEach(v=>{if(v.id!=='login')v.hidden=v.id!==id});
  $$('nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.go===id));}
$$('nav button').forEach(b=>b.onclick=()=>go(b.dataset.go));

/* Login */
$('#eye').onclick=()=>{const p=$('#pass');p.type=p.type==='password'?'text':'password'};
$('#loginForm').addEventListener('submit',e=>{e.preventDefault();$('#login').hidden=true;$('#shell').hidden=false;go('inicio');toast('¡Bienvenido a Class Up!')});

/* Chat */
const chats=[
  {n:'Rosa González',m:[['La lección se retrasará 20 minutos',0],['Ok.',1]]},
  {n:'Ángel Rodríguez',m:[['Hola, ¿repasamos trigonometría el jueves?',0],['Sí, a las 3:00 pm me sirve.',1]]}];
let cur=0;
function renderChat(){$('#cName').textContent=chats[cur].n;
  $('#msgs').innerHTML=chats[cur].m.map(([t,me])=>`<div class="msg ${me?'me':''}"></div>`).join('');
  $$('#msgs .msg').forEach((d,i)=>d.textContent=chats[cur].m[i][0]);
  $$('.contact').forEach(c=>c.classList.toggle('on',+c.dataset.c===cur));
  const box=$('#msgs');box.scrollTop=box.scrollHeight;}
$$('.contact').forEach(c=>c.onclick=()=>{cur=+c.dataset.c;renderChat()});
$('#compose').addEventListener('submit',e=>{e.preventDefault();const v=$('#msgIn').value.trim();if(!v)return;
  chats[cur].m.push([v,1]);$('#msgIn').value='';renderChat();
  setTimeout(()=>{chats[cur].m.push(['¡Perfecto, nos vemos en la tutoría!',0]);renderChat()},900)});
renderChat();

/* Suscripción */
$$('.plan').forEach(p=>p.querySelector('.elegir').onclick=()=>{
  $$('.plan').forEach(x=>{x.classList.remove('on');x.querySelector('.elegir').textContent='Elegir'});
  p.classList.add('on');p.querySelector('.elegir').textContent='Plan actual';
  toast('Elegiste el '+p.querySelector('h3').textContent)});

/* Perfiles */
const tutors=[
  {c:'b',n:'Rosa González',h:'Lun a Vie, 2:00 – 6:00 pm',mat:'Guías PDF y ejercicios',d:'60 min',p:'₡3 000',s:'Matemáticas'},
  {c:'g',n:'Ángel Rodríguez',h:'Sáb, 8:00 am – 12:00 md',mat:'Presentaciones y quices',d:'45 min',p:'₡2 500',s:'Ciencias'}];
$('#tutors').innerHTML=tutors.map(t=>`<article class="tutor ${t.c}"><div class="avatar">${avatarSVG}</div><dl>
 <div><dt>Nombre del tutor: </dt><dd>${t.n}</dd></div><div><dt>Horas disponibles: </dt><dd>${t.h}</dd></div>
 <div><dt>Material didáctico: </dt><dd>${t.mat}</dd></div><div><dt>Duración de lecciones: </dt><dd>${t.d}</dd></div>
 <div><dt>Costo de lecciones: </dt><dd>${t.p}</dd></div><div><dt>Materia: </dt><dd>${t.s}</dd></div></dl>
 <button class="reservar" data-t="${t.n}">Reservar</button></article>`).join('');
$$('.reservar').forEach(b=>b.onclick=()=>{go('horario');toast('Elige un horario con '+b.dataset.t)});

/* Contenido */
const ico={
 esp:'<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.3"><path d="M2 5c3-1 7-1 10 1 3-2 7-2 10-1v14c-3-1-7-1-10 1-3-2-7-2-10-1z"/><path d="M12 6v14"/></svg>',
 cie:'<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.2"><path d="M6 8l3-2 3 2v4l-3 2-3-2zM12 12l3-2 3 2v4l-3 2-3-2zM6 12v4l3 2 3-2"/><circle cx="16" cy="5" r="1.6"/><circle cx="20" cy="3" r="1.2"/><path d="M12 8l2.8-2"/></svg>',
 ing:'<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.2"><rect x="9" y="3" width="13" height="9"/><text x="11" y="9.5" font-size="4" fill="#111" stroke="none" font-style="italic">English</text><circle cx="5" cy="7" r="2" fill="#111"/><path d="M5 9v7M3 21l2-5 2 5M5 11l5-2" /><g fill="#111" stroke="none"><circle cx="12" cy="17" r="1.4"/><circle cx="16" cy="17" r="1.4"/><circle cx="20" cy="17" r="1.4"/><rect x="10" y="19" width="12" height="3"/></g></svg>',
 mat:'<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.2"><rect x="3" y="3" width="13" height="10"/><path d="M5 9l1 2 2-6h4M10 6l2 3M12 6l-2 3"/><rect x="15" y="12" width="6" height="10" rx="1"/><path d="M16 14h4M17 17h0M19 17h0M17 20h0M19 20h0"/><path d="M3 22V14l8 8z"/></svg>',
 soc:'<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.2"><rect x="3" y="4" width="18" height="12"/><path d="M2 4h20M12 16v4"/><circle cx="12" cy="21" r="1"/><path d="M6 8c2-1 3 1 5 0s3 2 5 1 2 2 1 3-3 0-5 1-3-1-5 0-2-3-1-5z"/></svg>'};
const subj=[
 {t:'Español',bg:'var(--yellow)',i:'esp',l:['Gramática','Ortografía','Redacción','Comprensión de lectura']},
 {t:'Ciencias',bg:'var(--green)',i:'cie',l:['Biología','Química','Física','Investigación científica']},
 {t:'Inglés',bg:'var(--purple)',i:'ing',l:['Vocabulario','Conversación','Gramática','Pronunciación']},
 {t:'Matemáticas',bg:'var(--red)',i:'mat',l:['Álgebra','Geometría','Trigonometría','Estadística']},
 {t:'Estudios Sociales',bg:'var(--steel)',i:'soc',l:['Historia','Geografía','Educación cívica','Cultura general']}];
function renderSubj(q=''){q=q.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'');
 const norm=s=>s.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'');
 const list=subj.map(s=>({...s,l:norm(s.t).includes(q)?s.l:s.l.filter(x=>norm(x).includes(q))})).filter(s=>s.l.length);
 $('#subjects').innerHTML=list.map(s=>`<div class="subj" style="background:${s.bg}"><h3>${s.t}</h3><ul>${s.l.map(x=>`<li><button data-toast="Abriendo: ${s.t} › ${x} (demo)">${x}.</button></li>`).join('')}</ul>${ico[s.i]}</div>`).join('')
  + (q?'' : `<div style="display:grid;place-items:center"><svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="#000" stroke-width="7" stroke-linejoin="round" aria-hidden="true"><path d="M6 6h32v28l-12 8V34H6zM62 6h32v28H74l-12 8z"/><circle cx="22" cy="60" r="8"/><circle cx="78" cy="60" r="8"/><path d="M4 96c4-12 30-12 36 0M60 96c4-12 30-12 36 0" stroke-linecap="round"/></svg></div>`)
  || '<p>No se encontraron temas.</p>';}
$('#q').oninput=e=>renderSubj(e.target.value); renderSubj();

/* Horario */
const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
let y=2026,m=4,sel=16,slot=null;
function renderCal(){$('#mLabel').textContent=meses[m]+' '+y;
 const first=(new Date(y,m,1).getDay()+6)%7, n=new Date(y,m+1,0).getDate();
 let h=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d=>`<div class="dh">${d}</div>`).join('');
 h+='<div></div>'.repeat(first);
 for(let d=1;d<=n;d++)h+=`<button class="${d===sel?'sel':''}" data-d="${d}">${d}</button>`;
 $('#days').innerHTML=h;$$('#days button').forEach(b=>b.onclick=()=>{sel=+b.dataset.d;renderCal()});}
$('#prev').onclick=()=>{m--;if(m<0){m=11;y--}sel=1;renderCal()};
$('#next').onclick=()=>{m++;if(m>11){m=0;y++}sel=1;renderCal()};
const times=['8:00 am','3:00 pm','10:00 am','4:30 pm','12:30 md','6:00 pm','2:00 pm','9:00 pm'];
$('#slots').innerHTML=times.map(t=>`<button>${t}</button>`).join('');
$$('#slots button').forEach(b=>b.onclick=()=>{$$('#slots button').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');slot=b.textContent});
$('#reservar').onclick=()=>toast(slot?`Tutoría reservada: ${sel} de ${meses[m].toLowerCase()}, ${slot}`:'Elige un horario primero');
renderCal();
