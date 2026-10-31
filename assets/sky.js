(()=>{
  'use strict';
  const directory=document.querySelector('.home-index-details');
  if(!directory)return;
  // The visible article list is the source of truth, including future admin publications.
  const nav=directory.querySelector('nav');
  const existing=new Map([...nav.querySelectorAll('a')].map(a=>[a.getAttribute('href'),a.querySelector('.index-copy>span').textContent]));
  const cards=[...document.querySelectorAll('#post-list .post-card')];
  const fragment=document.createDocumentFragment();
  cards.forEach((card,i)=>{
    const source=card.querySelector('h3 a');if(!source)return;
    const link=document.createElement('a');link.className='index-article';link.href=source.getAttribute('href');link.title=source.textContent;
    const number=document.createElement('span');number.className='index-number';number.textContent=String(i+1).padStart(2,'0');
    const copy=document.createElement('span');copy.className='index-copy';
    const title=document.createElement('span');title.textContent=existing.get(source.getAttribute('href'))||source.textContent;
    const date=card.querySelector('time')?.cloneNode(true);if(date)date.textContent=date.dateTime.slice(5).replace('-','.');
    copy.append(title);if(date)copy.append(date);link.append(number,copy);fragment.append(link);
  });
  nav.replaceChildren(fragment);
  directory.querySelector('summary>span').textContent=cards.length+' 篇手记';
  const status=document.querySelector('.studio-status>span:last-child');if(status)status.textContent='共 '+cards.length+' 篇手记';
  const mobile=matchMedia('(max-width:760px)');
  const sync=()=>{directory.open=!mobile.matches};
  sync();mobile.addEventListener('change',sync);
})();
