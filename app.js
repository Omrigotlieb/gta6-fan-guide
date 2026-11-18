(function(){
  // Live status: midnight local on Thu 19 Nov 2026 (rolling worldwide unlock)
  var el=document.getElementById('cd'),lb=document.getElementById('cd-label');
  var target=new Date(2026,10,19,0,0,0);
  function tick(){var d=target-Date.now();
    if(d<=0){lb.textContent='Status';el.textContent='OUT NOW on PS5 & Xbox Series X|S';el.parentNode.classList.add('live');if(timer)clearInterval(timer);return}
    var h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4);
    lb.textContent='Launch';
    el.textContent='Unlocks in '+h+'h '+m+'m — midnight your time, Thu 19 Nov'}
  var timer=null;if(el){tick();if(target-Date.now()>0)timer=setInterval(tick,1000)}

  // Rumor filter + search
  var chips=document.querySelectorAll('.chip'),rows=[].slice.call(document.querySelectorAll('.rumor-table tbody tr')),rq=document.getElementById('rq'),rc=document.getElementById('rcount'),cur='all';
  rows.forEach(function(r){r.dataset.t=r.textContent.toLowerCase()});
  function rfilter(){var q=(rq.value||'').toLowerCase().trim(),n=0;
    rows.forEach(function(r){var ok=(cur==='all'||r.querySelector('.b.'+cur))&&(!q||r.dataset.t.indexOf(q)>-1);r.style.display=ok?'':'none';if(ok)n++});
    rc.textContent=n+' of '+rows.length+' shown'}
  chips.forEach(function(c){c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false')});c.classList.add('on');c.setAttribute('aria-pressed','true');cur=c.dataset.f;rfilter()})});
  if(rq){rq.addEventListener('input',rfilter);rfilter()}

  // Tips search
  var tq=document.getElementById('tipq'),tl=[].slice.call(document.querySelectorAll('#tiplist li')),tc=document.getElementById('tipcount'),te=document.getElementById('tipempty');
  function tfilter(){var q=(tq.value||'').toLowerCase().trim(),n=0;
    tl.forEach(function(li){var ok=!q||li.dataset.t.indexOf(q)>-1;li.style.display=ok?'':'none';if(ok)n++});
    tc.textContent=n+' of '+tl.length+' tips';te.hidden=n>0}
  if(tq){tq.addEventListener('input',tfilter);tfilter()}

  // Region tabs
  var tabs=[].slice.call(document.querySelectorAll('.rtab')),panels=[].slice.call(document.querySelectorAll('.rpanel'));
  function sel(i,focus){tabs.forEach(function(t,k){var on=k===i;t.classList.toggle('on',on);t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;panels[k].hidden=!on});if(focus)tabs[i].focus()}
  tabs.forEach(function(t,i){t.tabIndex=i?-1:0;t.addEventListener('click',function(){sel(i)});
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight')sel((i+1)%tabs.length,1);else if(e.key==='ArrowLeft')sel((i-1+tabs.length)%tabs.length,1)})});

  // Click-to-play highlight cards: the video element is only created when asked for
  [].slice.call(document.querySelectorAll('a.clip-play')).forEach(function(a){
    a.addEventListener('click',function(e){
      if(e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
      e.preventDefault();
      var m=a.parentNode,v=document.createElement('video');
      v.controls=true;v.autoplay=true;v.playsInline=true;v.preload='auto';v.src=a.getAttribute('href');v.setAttribute('aria-label',a.dataset.title||'Highlight clip');
      var d=m.querySelector('.clip-dur');if(d)d.remove();
      m.replaceChild(v,a);v.focus({preventScroll:true});
    })});
  // Pause other videos when one plays
  document.addEventListener('play',function(e){document.querySelectorAll('video').forEach(function(v){if(v!==e.target)v.pause()})},true);

  // Mobile menu
  var btn=document.querySelector('.menu-btn'),menu=document.getElementById('menu');
  function setMenu(open){if(!btn)return;menu.classList.toggle('open',open);btn.setAttribute('aria-expanded',open);btn.lastElementChild.textContent=open?'Close':'Menu'}
  if(btn){btn.hidden=false;
    btn.addEventListener('click',function(){setMenu(!menu.classList.contains('open'))});
    menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);btn.focus()}});
    document.addEventListener('click',function(e){if(menu.classList.contains('open')&&!e.target.closest('.nav'))setMenu(false)});
    window.addEventListener('resize',function(){if(window.innerWidth>=1240)setMenu(false)})}

  // Active nav link
  var links=[].slice.call(document.querySelectorAll('#menu a')),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function reveal(l){if(menu.scrollWidth>menu.clientWidth&&getComputedStyle(menu).display==='flex'){menu.scrollLeft=l.offsetLeft-(menu.clientWidth-l.offsetWidth)/2}}
  if('IntersectionObserver' in window){var no=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=secs.indexOf(e.target);links.forEach(function(l,k){l.classList.toggle('on',k===i);if(k===i)l.setAttribute('aria-current','true');else l.removeAttribute('aria-current')});if(i>-1)reveal(links[i])}})},{rootMargin:'-30% 0px -60% 0px'});secs.forEach(function(s){s&&no.observe(s)})}
})();
