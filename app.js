(function(){
  // Countdown to Israel unlock (00:00 Thu 19 Nov 2026, Asia/Jerusalem = 22:00 UTC Nov 18), or local midnight message
  var el=document.getElementById('cd'),lb=document.getElementById('cd-label');
  var target=Date.UTC(2026,10,18,22,0,0); // 00:00 Nov 19 Israel (UTC+2)
  function tick(){var d=target-Date.now();
    if(d<=0){lb.textContent='Status';el.textContent='Unlocked in Israel · Nov 19';return}
    var h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3);
    lb.textContent='Unlocks in Israel (00:00 IST) in';
    el.textContent=h+'h '+('0'+m).slice(-2)+'m '+('0'+s).slice(-2)+'s'}
  if(el){tick();setInterval(tick,1000)}
  // Rumor filter
  var chips=document.querySelectorAll('.chip'),rows=document.querySelectorAll('.rumor-table tbody tr');
  chips.forEach(function(c){c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.remove('on')});c.classList.add('on');
    var f=c.dataset.f;
    rows.forEach(function(r){r.style.display=(f==='all'||r.querySelector('.b.'+f))?'':'none'})})});
})();
