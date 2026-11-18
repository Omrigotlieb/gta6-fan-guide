(function(){
  // Countdown to Israel unlock (00:00 Thu 19 Nov 2026 IST = 22:00 UTC Nov 18)
  var el=document.getElementById('cd'),lb=document.getElementById('cd-label');
  var target=Date.UTC(2026,10,18,22,0,0);
  function tick(){var d=target-Date.now();
    if(d<=0){lb.textContent='Status';el.textContent='Unlocked in Israel · Nov 19';return}
    var h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3);
    lb.textContent='Unlocks in Israel (00:00 IST) in';
    el.textContent=h+'h '+('0'+m).slice(-2)+'m '+('0'+s).slice(-2)+'s'}
  if(el){tick();setInterval(tick,1000)}

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

  // Lazy posters for non-featured videos
  var vids=[].slice.call(document.querySelectorAll('video[data-poster]'));
  function setp(v){if(v.dataset.poster){v.poster=v.dataset.poster;delete v.dataset.poster}}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setp(e.target);io.unobserve(e.target)}})},{rootMargin:'300px'});vids.forEach(function(v){io.observe(v)})}else{vids.forEach(setp)}
  // Pause other videos when one plays
  document.addEventListener('play',function(e){document.querySelectorAll('video').forEach(function(v){if(v!==e.target)v.pause()})},true);

  // Active nav link
  var links=[].slice.call(document.querySelectorAll('#menu a')),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  if('IntersectionObserver' in window){var no=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=secs.indexOf(e.target);links.forEach(function(l,k){l.classList.toggle('on',k===i)});if(i>-1)links[i].scrollIntoView({block:'nearest',inline:'center'})}})},{rootMargin:'-30% 0px -60% 0px'});secs.forEach(function(s){s&&no.observe(s)})}
})();
