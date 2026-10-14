(function(){
  'use strict';
  const data=window.siteData,root=document.documentElement;
  const make=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;};
  const link=(label,href,cls)=>{const a=make('a',cls,label);a.href=href;if(!href.startsWith('mailto:')){a.target='_blank';a.rel='noopener noreferrer';}return a;};
  try{if(localStorage.getItem('theme')==='dark')root.dataset.theme='dark';}catch(_){}
  document.title=`${data.name} | Academic Homepage`;
  document.querySelectorAll('[data-field]').forEach(n=>{if(data[n.dataset.field])n.textContent=data[n.dataset.field];});
  document.getElementById('copyright-year').textContent=new Date().getFullYear();
  if(data.previousAffiliation){const n=document.getElementById('previous-affiliation');n.textContent=data.previousAffiliation;n.hidden=false;}
  const portrait=document.getElementById('portrait-image');portrait.addEventListener('error',()=>{portrait.hidden=true;document.querySelector('.portrait span').hidden=false;});portrait.src=data.avatarImage;portrait.alt=`Portrait of ${data.name}`;
  data.interests.forEach(t=>document.getElementById('interests').append(make('span','chip',t)));
  const icons={'Google Scholar':'◎',GitHub:'↗',Email:'✉'};
  data.links.forEach(item=>{const a=link(item.label==='Email'?data.email:item.label,item.href);const icon=make('span','link-icon',icons[item.label]||'↗');icon.setAttribute('aria-hidden','true');a.prepend(icon);document.getElementById('links').append(a);});
  const scholar=data.links.find(item=>item.label==='Google Scholar');if(scholar)document.getElementById('full-scholar-list').href=scholar.href;
  document.querySelector('[data-contact-link]').href=`mailto:${data.email}`;
  data.about.forEach(t=>{const p=make('p');p.innerHTML=t;document.getElementById('about-content').append(p);});
  const dialog=document.querySelector('.figure-dialog'),preview=document.getElementById('figure-preview');
  document.querySelector('.figure-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
  function publication(pub){
    const article=make('article',`publication${pub.image?'':' without-image'}`);
    if(pub.image){const visual=make('div','publication-visual'),button=make('button','publication-image-button'),im=make('img','publication-image');button.type='button';button.setAttribute('aria-label',`Enlarge framework: ${pub.title}`);im.src=pub.image;im.alt=pub.imageAlt||`${pub.title} framework`;im.loading='lazy';im.decoding='async';im.addEventListener('error',()=>{visual.remove();article.classList.add('without-image');});button.append(im);button.addEventListener('click',()=>{preview.src=pub.image;preview.alt=im.alt;document.getElementById('figure-title').textContent=pub.title;dialog.showModal();});visual.append(button,make('span','figure-hint','Click to enlarge ↗'));article.append(visual);}
    const body=make('div','publication-body'),title=make('h3'),authors=make('p','meta');body.append(make('p','venue',pub.venue));if(pub.link)title.append(link(pub.title,pub.link));else title.textContent=pub.title;
    const parts=pub.authors.split(data.name);parts.forEach((p,i)=>{authors.append(document.createTextNode(p));if(i<parts.length-1)authors.append(make('span','author-highlight',data.name));});body.append(title,authors);
    if(pub.description)body.append(make('p','description',pub.description));
    const bottom=make('div','publication-bottom'),links=make('div','publication-links');if(pub.topic)bottom.append(make('span','topic',pub.topic));if(pub.link)links.append(link('Paper ↗',pub.link,'publication-link'));if(pub.code)links.append(link('Code ↗',pub.code,'publication-link'));if(links.childElementCount)bottom.append(links);if(bottom.childElementCount)body.append(bottom);article.append(body);return article;
  }
  data.publications.filter(p=>p.selected).forEach(p=>document.getElementById('selected-publications').append(publication(p)));
  // Parse existing inline Markdown links; keep remaining news text literal.
  function linkedText(n,text){const pattern=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;let start=0;for(const m of text.matchAll(pattern)){n.append(document.createTextNode(text.slice(start,m.index)));n.append(link(m[1].replaceAll('&nbsp;',' ').trim(),m[2]));start=m.index+m[0].length;}n.append(document.createTextNode(text.slice(start)));}
  data.news.forEach(item=>{const row=make('div','news-item'),date=make('time','news-date',item.date),text=make('div','news-text');date.dateTime=item.date;if(item.icon)text.append(make('span','news-icon',item.icon));linkedText(text,item.text);row.append(date,text);document.getElementById('news-list').append(row);});
  data.honors.forEach(item=>{const li=make('li');li.innerHTML=item;document.getElementById('honors-list').append(li);});data.service.forEach(item=>document.getElementById('service-list').append(make('li','',item)));
  data.cv.forEach(item=>{const row=make('article',`cv-item${item.label?'':' no-label'}`);if(item.label)row.append(make('h3','',item.label));row.append(make('p','',item.text));document.getElementById('cv-list').append(row);});
  const theme=document.querySelector('.theme-toggle');function themeLabel(){const dark=root.dataset.theme==='dark',label=dark?'Switch to light mode':'Switch to dark mode';theme.setAttribute('aria-label',label);theme.title=label;theme.querySelector('span').textContent=dark?'☀':'☾';}theme.addEventListener('click',()=>{const dark=root.dataset.theme!=='dark';if(dark)root.dataset.theme='dark';else delete root.dataset.theme;try{if(dark)localStorage.setItem('theme','dark');else localStorage.removeItem('theme');}catch(_){}themeLabel();});themeLabel();
  const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('main-nav');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)nav.querySelectorAll('a').forEach(a=>{const active=a.hash===`#${e.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}),{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
})();
