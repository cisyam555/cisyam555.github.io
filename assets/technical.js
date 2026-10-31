(()=>{
  'use strict';
  const q=s=>document.querySelector(s);
  const imageFor=href=>{
    if(/gesture-mouse/.test(href))return {src:'/posts/opencv-mediapipe-gesture-mouse/assets/06-hand-landmarks.png',alt:'MediaPipe 手部关键点与手势控制示意图',photo:'/assets/sky/garden.jpg'};
    if(/kalman/.test(href))return {src:'/posts/kalman-filter-explained/kalman-tracking.png',alt:'卡尔曼滤波的小车轨迹跟踪仿真',photo:'/assets/sky/guardian.jpg'};
    if(/yolov8-opencv/.test(href))return {src:'/posts/yolov8-opencv-differences-and-connections/figure-01.png',alt:'OpenCV 与 YOLOv8 的技术定位图',photo:'/assets/sky/garden.jpg'};
    if(/object-detection/.test(href))return {src:'/assets/cover-yolo.svg',alt:'目标检测框与视觉识别技术图',photo:'/assets/sky/garden.jpg'};
    if(/docker/.test(href))return {src:'/assets/cover-docker.svg',alt:'Docker 容器与 ROS 2 运行环境示意图',photo:'/assets/sky/morning.jpg'};
    if(/embodied/.test(href))return {src:'/posts/embodied-data-bottleneck/data_compare.png',alt:'具身智能与大语言模型的数据规模对比',photo:'/assets/sky/guardian.jpg'};
    if(/ros2/.test(href))return {src:'/assets/cover-ros.svg',alt:'ROS 2 节点与话题通信示意图',photo:'/assets/sky/guardian.jpg'};
    if(/python/.test(href))return {src:'/assets/photos/code.jpg',alt:'编辑器中的代码与 Python 开发实践',photo:'/assets/sky/morning.jpg'};
    return {src:'/assets/photos/code.jpg',alt:'代码与技术实践',photo:'/assets/sky/morning.jpg'};
  };
  document.querySelectorAll('#post-list .post-card').forEach(card=>{
    const link=card.querySelector('h3 a');if(!link||card.querySelector('.post-thumbnail'))return;
    const data=imageFor(link.getAttribute('href'));
    const cover=document.createElement('a');cover.className='post-thumbnail';cover.href=link.getAttribute('href');cover.tabIndex=-1;cover.setAttribute('aria-hidden','true');
    const img=document.createElement('img');img.src=data.src;img.alt='';img.loading='lazy';img.decoding='async';
    if(/\.png/.test(data.src))cover.classList.add('diagram-cover');
    const label=document.createElement('span');label.className='thumbnail-caption';label.textContent='翻开这篇手记 ↗';
    cover.append(img,label);card.prepend(cover);
  });
  // The lead photograph sets context; the original diagrams remain in the article body.
  const article=q('.journal-subpage article');const header=article?.querySelector(':scope > header');
  if(header&&location.pathname.startsWith('/posts/')&&!article.querySelector('.article-lead')){
    const data=imageFor(location.pathname);const figure=document.createElement('figure');figure.className='article-lead';
    const img=document.createElement('img');img.src=data.photo;img.alt='《天空之城》的天空与绿意场景，文章主题氛围配图';img.decoding='async';
    const caption=document.createElement('figcaption');const category=document.createElement('span');category.textContent='云间的小站 · cisyam';const detail=document.createElement('span');detail.textContent='学习的路上，慢慢记录';caption.append(category,detail);figure.append(img,caption);header.after(figure);
  }
  if(article&&header){
    const shell=article.parentElement;shell.classList.add('article-layout');
    const sections=[...article.querySelectorAll('.prose-blog h2')];
    const aside=document.createElement('aside');aside.className='article-outline';aside.setAttribute('aria-label','文章阅读导航');
    const details=document.createElement('details');details.open=!matchMedia('(max-width: 1000px)').matches;
    const summary=document.createElement('summary');summary.textContent='本篇目录';
    const total=document.createElement('span');total.textContent=String(sections.length).padStart(2,'0')+' SECTIONS';summary.append(total);details.append(summary);
    const nav=document.createElement('nav');nav.setAttribute('aria-label','章节目录');
    sections.forEach((heading,i)=>{if(!heading.id)heading.id='section-'+(i+1);const link=document.createElement('a');link.href='#'+heading.id;const number=document.createElement('span');number.textContent=String(i+1).padStart(2,'0');const name=document.createElement('span');name.textContent=heading.textContent;link.append(number,name);nav.append(link)});
    details.append(nav);aside.append(details);
    const progress=document.createElement('div');progress.className='reading-status';const label=document.createElement('span');label.textContent='阅读进度';const amount=document.createElement('span');amount.textContent='0%';const track=document.createElement('div');const fill=document.createElement('i');track.append(fill);progress.append(label,amount,track);aside.append(progress);
    const back=document.createElement('a');back.href='#top';back.className='outline-back';back.textContent='回到顶部 ↑';aside.append(back);shell.append(aside);
    const links=[...nav.querySelectorAll('a')];let scheduled=false;
    function updateReading(){scheduled=false;const rect=article.getBoundingClientRect();const distance=Math.max(1,article.offsetHeight-innerHeight+100);const value=Math.max(0,Math.min(100,Math.round((100-rect.top)/distance*100)));amount.textContent=value+'%';fill.style.width=value+'%';let current=0;sections.forEach((h,i)=>{if(h.getBoundingClientRect().top<180)current=i});links.forEach((a,i)=>{a.classList.toggle('active',i===current);if(i===current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}
    addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateReading)}},{passive:true});updateReading();
    matchMedia('(max-width: 1000px)').addEventListener('change',e=>{details.open=!e.matches});
  }
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced){
    document.documentElement.classList.add('motion-ready');
    requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add('page-entered')));
    const targets=document.querySelectorAll('.feature-card,#post-list .post-card,.studio-sidebar>section,.learning-strip,.journal-subpage article>header,.journal-subpage .article-lead,.journal-subpage .max-w-4xl>a');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target)}}),{threshold:.06,rootMargin:'0px 0px 40px 0px'});
    targets.forEach((node,i)=>{node.classList.add('reveal-item');node.style.setProperty('--reveal-delay',`${Math.min(i%3*55,110)}ms`);observer.observe(node)});
    // Pointer feedback remains confined to the diagram, away from reading content.
    const panel=q('.spatial-panel');
    if(panel&&matchMedia('(pointer:fine)').matches){
      let pending=false,lastX=50,lastY=50;
      panel.addEventListener('pointermove',e=>{const r=panel.getBoundingClientRect();lastX=(e.clientX-r.left)/r.width*100;lastY=(e.clientY-r.top)/r.height*100;if(!pending){pending=true;requestAnimationFrame(()=>{panel.style.setProperty('--pointer-x',lastX+'%');panel.style.setProperty('--pointer-y',lastY+'%');pending=false})}},{passive:true});
    }
  }
})();
