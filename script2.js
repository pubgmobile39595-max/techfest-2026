(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};
var LS={get:function(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},set:function(k,v){localStorage.setItem(k,JSON.stringify(v))}};

// 1. ERKEN KAYIT BANNER
function earlyBanner(){
  var nav=$('.nav');if(!nav||$('.early-banner'))return;
  var b=document.createElement('div');b.className='early-banner';b.style.cssText='background:linear-gradient(90deg,#ef4444,#f59e0b);color:#fff;padding:12px 20px;text-align:center;font-weight:600;font-size:.9rem;position:sticky;top:70px;z-index:99';
  var h=47,m=23,s=15;
  function up(){s--;if(s<0){s=59;m--}if(m<0){m=59;h--}if(h<0){h=0;m=0;s=0}var p=function(n){return String(n).padStart(2,'0')};b.innerHTML='⏰ ERKEN KAYIT — Son <strong style="font-family:monospace;font-size:1.1rem">'+p(h)+':'+p(m)+':'+p(s)+'</strong> · Kod: <strong>ERKEN30</strong> %30 indirim!';}
  up();setInterval(up,1000);nav.parentNode.insertBefore(b,nav.nextSibling);
}

// 2. KONUŞMACI MODAL
var spData=[
{name:'Dr. Ayşe Yılmaz',role:'AI Araştırmacısı · Google',img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',bio:'Yapay zeka alanında 15 yıllık deneyim. Google Brain ekibinde. 50+ akademik makale yazarı.'},
{name:'Mehmet Demir',role:'CTO · Trendyol',img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',bio:'Trendyol CTO. E-ticaret altyapısında 20+ yıl deneyim.'},
{name:'Zeynep Kaya',role:'Founder · AI Startup',img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',bio:'AI girişimi kurucusu. 3 başarılı exit.'},
{name:'Can Öztürk',role:'Blockchain Uzmanı',img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',bio:'Blockchain ve Web3 uzmanı.'},
{name:'Selin Arslan',role:'UX Direktörü · Meta',img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',bio:'Meta UX Direktörü. Tasarım kitapları yazarı.'},
{name:'Emre Şahin',role:'Siber Güvenlik · Microsoft',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',bio:'Microsoft güvenlik ekibi. Zero-trust uzmanı.'},
{name:'Deniz Ak',role:'Cloud Mimarı · AWS',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',bio:'AWS çözüm mimarı. Serverless uzmanı.'},
{name:'Merve Yıldız',role:'Veri Bilimci · Netflix',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',bio:'Netflix veri bilimci. Öneri sistemleri uzmanı.'}
];

function speakerModal(){
  document.addEventListener('click',function(e){
    var sp=e.target.closest('.speaker');if(!sp)return;
    var n=sp.querySelector('.speaker__name').textContent;
    var d=spData.filter(function(x){return x.name===n})[0];if(!d)return;
    var m=document.createElement('div');m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close" type="button">✕</button>'+
      '<div class="speaker-modal-img" style="background-image:url('+d.img+')"></div>'+
      '<div class="speaker-modal-name">'+d.name+'</div>'+
      '<div class="speaker-modal-role">'+d.role+'</div>'+
      '<div class="speaker-modal-bio">'+d.bio+'</div>'+
      '<button type="button" class="sp-btn sp-btn--primary" style="width:100%" onclick="alert(\'⏰ Takvime eklendi!\')">📅 Takvime Ekle</button></div>';
    document.body.appendChild(m);
    m.querySelector('.sp-modal__close').addEventListener('click',function(){m.remove()});
    m.addEventListener('click',function(e){if(e.target===m)m.remove()});
  });
}

// 3. CANLI YAYIN
function liveSection(){
  var s=$('#schedule');if(!s||$('.live-section'))return;
  var el=document.createElement('section');el.className='live-section';
  el.innerHTML='<div class="container" style="text-align:center;position:relative;z-index:1"><span class="live-badge">CANLI</span><h2 style="font-family:monospace;font-size:clamp(1.6rem,4vw,2.4rem);margin-bottom:12px;color:#fff">Konferansı <span class="grad">canlı izle</span></h2><p style="color:rgba(255,255,255,.7);max-width:520px;margin:0 auto 20px">Tüm oturumlar HD kalitede canlı yayınlanır.</p><div class="live-video"></div><div style="margin-top:20px"><button class="sp-btn sp-btn--primary" onclick="alert(\'📧 Hatırlatıcı gönderildi!\')">🔔 Hatırlatıcı</button></div></div>';
  s.parentNode.insertBefore(el,s.nextSibling);
}

// 4. SPONSOR BAŞVURU
function sponsorApply(){
  var sp=$('#sponsors .container');if(!sp||$('.sponsor-apply'))return;
  var b=document.createElement('div');b.className='sponsor-apply';b.style.cssText='text-align:center;margin-top:40px';
  b.innerHTML='<button type="button" class="sp-btn sp-btn--primary" id="sponsorApplyBtn">🤝 Sponsor Olmak İster misiniz?</button>';
  sp.appendChild(b);
  b.querySelector('#sponsorApplyBtn').addEventListener('click',function(){
    var m=document.createElement('div');m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close" type="button">✕</button><h3 class="sp-modal__title">🤝 Sponsor Başvurusu</h3><p class="sp-modal__sub">Size özel teklif için formu doldurun.</p><form style="display:flex;flex-direction:column;gap:14px"><input type="text" placeholder="Şirket Adı" style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--text);font-family:inherit;outline:0"><input type="email" placeholder="E-posta" style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--text);font-family:inherit;outline:0"><select style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--text);font-family:inherit;outline:0"><option>Platin</option><option>Altın</option><option>Gümüş</option></select><button type="button" class="sp-btn sp-btn--primary" style="width:100%" onclick="alert(\'✅ Başvuru alındı!\');this.closest(\'.sp-modal\').remove()">Gönder</button></form></div>';
    document.body.appendChild(m);
    m.querySelector('.sp-modal__close').addEventListener('click',function(){m.remove()});
    m.addEventListener('click',function(e){if(e.target===m)m.remove()});
  });
}

// 5. KUPON SİSTEMİ
function coupons(){
  document.addEventListener('click',function(e){
    if(!e.target.closest('.ticket-btn'))return;
    setTimeout(function(){
      var modal=$('#registerModal');if(!modal||$('.coupon-row'))return;
      var form=modal.querySelector('form');if(!form)return;
      var row=document.createElement('div');row.className='coupon-row';
      row.innerHTML='<input type="text" id="couponField" placeholder="Kupon (ERKEN30)"><button type="button" class="sp-btn sp-btn--primary" id="applyCoupon">Uygula</button>';
      form.insertBefore(row,form.querySelector('button[type=submit]'));
      row.querySelector('#applyCoupon').addEventListener('click',function(){
        var c=row.querySelector('#couponField').value.trim().toUpperCase();
        var v={ERKEN30:30,STUDENT50:50,TECHFEST:15};
        if(v[c]){LS.set('coupon',{code:c,disc:v[c]});alert('🎉 %'+v[c]+' indirim!');}
        else alert('❌ Geçersiz. Deneyin: ERKEN30, STUDENT50, TECHFEST');
      });
    },300);
  });
}

// 6. SOSYAL PAYLAŞ
function socialShare(){
  var c=$('.cta__actions');if(!c||$('.share-row'))return;
  var r=document.createElement('div');r.className='share-row';
  var u=encodeURIComponent(location.href);
  var t=encodeURIComponent('TechFest 2026!');
  r.innerHTML='<a class="share-btn" href="https://twitter.com/intent/tweet?text='+t+'&url='+u+'" target="_blank">𝕏 Twitter</a><a class="share-btn" href="https://wa.me/?text='+t+'%20'+u+'" target="_blank">💬 WhatsApp</a><a class="share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url='+u+'" target="_blank">💼 LinkedIn</a><button type="button" class="share-btn" id="copyLink">🔗 Kopyala</button>';
  c.appendChild(r);
  r.querySelector('#copyLink').addEventListener('click',function(){navigator.clipboard.writeText(location.href);alert('🔗 Kopyalandı!')});
}

// 7. iCal İNDİR
function icalDownload(){
  var c=$('.cta__actions');if(!c||$('#icalBtn'))return;
  var b=document.createElement('button');b.id='icalBtn';b.className='sp-btn sp-btn--ghost';b.type='button';b.textContent='📅 iCal İndir';
  c.appendChild(b);
  b.addEventListener('click',function(){
    var ic='BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:tf2026\nDTSTART:20261115T100000Z\nDTEND:20261117T180000Z\nSUMMARY:TechFest 2026\nLOCATION:İstanbul\nEND:VEVENT\nEND:VCALENDAR';
    var bl=new Blob([ic],{type:'text/calendar'});var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='techfest.ics';a.click();
  });
}

// 8. FAVORİ ⭐
function speakerFav(){
  setTimeout(function(){
    $$('.speaker').forEach(function(sp,i){
      if(sp.querySelector('.fav-star'))return;
      var b=document.createElement('button');b.className='fav-star';b.type='button';b.innerHTML='⭐';
      var f=LS.get('favSpeakers',[]);if(f.indexOf(i)>=0)b.classList.add('active');
      b.addEventListener('click',function(e){
        e.stopPropagation();
        var f=LS.get('favSpeakers',[]);var idx=f.indexOf(i);
        if(idx>=0){f.splice(idx,1);b.classList.remove('active')}else{f.push(i);b.classList.add('active')}
        LS.set('favSpeakers',f);
      });
      sp.style.position='relative';sp.appendChild(b);
    });
  },800);
}

// 9. KİŞİSEL PROGRAM ✓
function personalSched(){
  setTimeout(function(){
    $$('.sched-item').forEach(function(it,i){
      if(it.querySelector('.sched-check'))return;
      var b=document.createElement('span');b.className='sched-check';b.textContent='✓';
      var k='s_'+i;var m=LS.get('mySchedule',[]);if(m.indexOf(k)>=0)b.classList.add('active');
      b.addEventListener('click',function(e){
        e.stopPropagation();
        var m=LS.get('mySchedule',[]);var idx=m.indexOf(k);
        if(idx>=0){m.splice(idx,1);b.classList.remove('active')}else{m.push(k);b.classList.add('active');alert('✅ Eklendi!')}
        LS.set('mySchedule',m);updateBadge();
      });
      var t=it.querySelector('.sched-time');if(t)t.parentNode.insertBefore(b,t);
    });
    updateBadge();
  },900);
  var mb=document.createElement('button');mb.className='my-schedule-btn';mb.id='mySchedBtn';mb.type='button';
  mb.innerHTML='📋<span class="my-schedule-btn__badge" id="schedBadge">0</span>';
  document.body.appendChild(mb);
  mb.addEventListener('click',function(){var m=LS.get('mySchedule',[]);alert('📋 Programınızda '+m.length+' oturum var.')});
}
function updateBadge(){var b=$('#schedBadge');if(b)b.textContent=LS.get('mySchedule',[]).length}

// 10. TWEET AKIŞI
function tweetFeed(){
  var l=$('.live-section');if(!l)return;
  var s=document.createElement('section');s.className='section';
  s.innerHTML='<div class="container"><div class="section__head"><span class="eyebrow">Sosyal</span><h2>Canlı <span class="grad">tweet akışı</span></h2></div><div class="tweet-feed" id="tweetFeed"></div></div>';
  l.parentNode.insertBefore(s,l.nextSibling);
  var tw=[
    {u:'Ahmet',h:'@ahmetdev',t:'TechFest 2026 muhteşem! #TechFest2026 🚀',l:42},
    {u:'Selin',h:'@selinux',t:'AI paneli harikaydı! #TechFest2026',l:87},
    {u:'Burak',h:'@burakk',t:'Blockchain oturumu süper! Web3 gelecek!',l:31},
    {u:'Elif',h:'@elifd',t:'Networking kokteyli mükemmel!',l:56}
  ];
  var i=0;
  function add(){
    if(i>=tw.length)i=0;var t=tw[i++];var f=$('#tweetFeed');if(!f)return;
    var el=document.createElement('div');el.className='tweet';
    el.innerHTML='<div class="tweet__avatar">'+t.u[0]+'</div><div class="tweet__body"><div class="tweet__user">'+t.u+' <span>'+t.h+'</span></div><div class="tweet__text">'+t.t+'</div><div class="tweet__meta"><span>❤️ '+t.l+'</span></div></div>';
    f.insertBefore(el,f.firstChild);if(f.children.length>4)f.removeChild(f.lastChild);
  }
  for(var j=0;j<3;j++)add();setInterval(add,4000);
}

// 11. PROFİL
function profileWidget(){
  var b=document.createElement('button');b.className='fab';b.style.bottom='230px';b.type='button';b.innerHTML='👤';b.title='Profil';
  document.body.appendChild(b);
  var w=document.createElement('div');w.className='profile-widget';w.id='profileWidget';
  w.innerHTML='<div class="profile-widget__header"><strong>👤 Profil</strong><button type="button" class="sp-modal__close" style="position:static;width:26px;height:26px;font-size:.8rem" id="pClose">✕</button></div><input type="text" id="pName" placeholder="Adınız" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:10px 12px;color:var(--text);font-family:inherit;font-size:.85rem;outline:0;margin-bottom:8px"><input type="text" id="pComp" placeholder="Şirket" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:10px 12px;color:var(--text);font-family:inherit;font-size:.85rem;outline:0;margin-bottom:14px"><button type="button" class="sp-btn sp-btn--primary" style="width:100%" id="pSave">💾 Kaydet</button>';
  document.body.appendChild(w);
  b.addEventListener('click',function(){
    w.classList.toggle('open');
    var p=LS.get('profile',{});if($('#pName'))$('#pName').value=p.name||'';if($('#pComp'))$('#pComp').value=p.company||'';
  });
  if($('#pClose'))$('#pClose').addEventListener('click',function(){w.classList.remove('open')});
  if($('#pSave'))$('#pSave').addEventListener('click',function(){LS.set('profile',{name:$('#pName').value,company:$('#pComp').value});alert('✅ Kaydedildi!');w.classList.remove('open')});
}

// 12. AI NETWORKING
function aiNetwork(){
  var v=$('#venue');if(!v||$('.ai-network'))return;
  var s=document.createElement('section');s.className='section section--alt ai-network';
  s.innerHTML='<div class="container"><div class="section__head"><span class="eyebrow">🤖 AI Öneri</span><h2>Sizin için <span class="grad">eşleşmeler</span></h2></div><div style="max-width:520px;margin:0 auto">'+
    [['Ali Veli','Full Stack Developer',95],['Deniz Yıldız','Product Manager',88],['Ceren Ak','Data Analyst',82]].map(function(x){
      return '<div class="network-card"><div class="network-card__avatar">'+x[0][0]+'</div><div class="network-card__info"><div class="network-card__name">'+x[0]+'</div><div class="network-card__role">'+x[1]+'</div></div><div class="network-card__match">'+x[2]+'%</div></div>';
    }).join('')+'</div></div>';
  v.parentNode.insertBefore(s,v.nextSibling);
}

// 13. FOTOĞRAF YÜKLEME
function photoUpload(){
  var g=$('#gallery .container');if(!g||$('.upload-zone'))return;
  var w=document.createElement('div');w.style.marginTop='32px';
  w.innerHTML='<div class="upload-zone" id="uploadZone"><div class="upload-zone__icon">📸</div><div class="upload-zone__text">Fotoğraf yükleyin (tıkla veya sürükle)</div></div><div class="upload-preview" id="uploadPrev"></div>';
  g.appendChild(w);
  var z=$('#uploadZone');var p=$('#uploadPrev');if(!z)return;
  z.addEventListener('click',function(){
    var inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.multiple=true;
    inp.addEventListener('change',function(e){Array.from(e.target.files).forEach(load)});
    inp.click();
  });
  z.addEventListener('dragover',function(e){e.preventDefault();z.classList.add('dragover')});
  z.addEventListener('dragleave',function(){z.classList.remove('dragover')});
  z.addEventListener('drop',function(e){e.preventDefault();z.classList.remove('dragover');Array.from(e.dataTransfer.files).forEach(load)});
  function load(f){
    if(!f.type.startsWith('image/'))return;
    var r=new FileReader();r.onload=function(e){var img=document.createElement('img');img.src=e.target.result;p.appendChild(img)};r.readAsDataURL(f);
  }
}

// 14. ANKET
function poll(){
  var t=$('#testimonials');if(!t||$('.poll-box'))return;
  var s=document.createElement('section');s.className='section';
  s.innerHTML='<div class="container"><div class="section__head"><span class="eyebrow">Anket</span><h2>En çok hangi <span class="grad">konu</span>?</h2></div><div class="poll-box"><div class="poll-question">Hangi konuyu merak ediyorsunuz?</div><div class="poll-options" id="pollOpts"></div></div></div>';
  t.parentNode.insertBefore(s,t);
  var opts=[{id:'ai',t:'🤖 Yapay Zeka',v:234},{id:'bc',t:'⛓️ Blockchain',v:156},{id:'cl',t:'☁️ Cloud',v:189},{id:'ux',t:'🎨 UX',v:98}];
  var voted=LS.get('voted',null);
  function render(){
    var list=$('#pollOpts');if(!list)return;
    var tot=opts.reduce(function(s,o){return s+o.v},0);
    list.innerHTML=opts.map(function(o){
      var pct=Math.round((o.v/tot)*100);
      return '<div class="poll-option'+(voted===o.id?' voted':'')+'" data-id="'+o.id+'"><div class="poll-option__fill" style="width:'+pct+'%"></div><div class="poll-option__content"><span>'+o.t+'</span><span class="poll-option__pct">'+pct+'%</span></div></div>';
    }).join('');
    list.querySelectorAll('.poll-option').forEach(function(el){
      el.addEventListener('click',function(){
        if(voted)return;
        voted=el.dataset.id;LS.set('voted',voted);
        var o=opts.filter(function(x){return x.id===voted})[0];if(o)o.v++;
        render();alert('✅ Oyunuz kaydedildi!');
      });
    });
  }
  render();
}

// 15. Q&A
function qa(){
  var f=$('#faq');if(!f||$('.qa-list'))return;
  var s=document.createElement('section');s.className='section section--alt';
  s.innerHTML='<div class="container container--narrow"><div class="section__head"><span class="eyebrow">Q&A</span><h2>Konuşmacılara <span class="grad">soru sorun</span></h2></div><div class="qa-list" id="qaList"><div class="qa-item"><div class="qa-item__q">❓ AI geliştiricilerin işini elinden alacak mı?</div><div class="qa-item__a">💬 Hayır, AI işleri dönüştürecek.</div></div><div class="qa-item"><div class="qa-item__q">❓ Web3 gerçekten gelecek mi?</div><div class="qa-item__a">💬 Uzun vadede evet, sabırlı olmak lazım.</div></div></div><form style="display:flex;flex-direction:column;gap:10px;max-width:640px;margin:0 auto"><textarea id="qaText" placeholder="Sorunuzu yazın..." rows="3" style="background:var(--paper);border:1px solid var(--border);border-radius:12px;padding:14px;color:var(--text);font-family:inherit;font-size:.9rem;outline:0;resize:vertical"></textarea><button type="button" class="sp-btn sp-btn--primary" id="qaBtn">📤 Gönder</button></form></div>';
  f.parentNode.insertBefore(s,f.nextSibling);
  if($('#qaBtn'))$('#qaBtn').addEventListener('click',function(){
    if(!$('#qaText').value.trim())return;
    alert('✅ Sorunuz iletildi!');$('#qaText').value='';
  });
}

// 16. MOBİL BİLET
function mobileTicket(){
  var obs=new MutationObserver(function(){
    var st=$('#registerStatus');
    if(st&&st.textContent.indexOf('alındı')>=0&&!$('.mobile-ticket-btn'))showTicketBtn();
  });
  var modal=$('#registerModal');if(modal)obs.observe(modal,{childList:true,subtree:true,characterData:true});
  function showTicketBtn(){
    if($('.mobile-ticket-btn'))return;
    var b=document.createElement('button');b.className='mobile-ticket-btn sp-btn sp-btn--primary';b.type='button';
    b.innerHTML='📱 Biletimi Göster';b.style.cssText='margin-top:14px;width:100%';
    var modal=$('#registerModal');if(!modal)return;
    var content=modal.querySelector('.modal__content')||modal.querySelector('.sp-modal__box');
    if(content)content.appendChild(b);
    b.addEventListener('click',function(){showTicket();});
  }
  function showTicket(){
    var p=LS.get('profile',{});var tt=LS.get('lastTicket','Standart');
    var m=document.createElement('div');m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close" type="button">✕</button><h3 class="sp-modal__title">🎫 Biletim</h3><p class="sp-modal__sub">'+tt+' · TechFest 2026</p><div class="ticket-card"><div class="ticket-card__name">🚀 TechFest 2026</div><div class="ticket-card__meta">15-17 Kasım · İstanbul</div><div class="qr-box" id="ticketQR"></div><div style="font-family:monospace;font-size:1rem;margin-top:12px">'+(p.name||'Katılımcı')+'</div></div><button type="button" class="sp-btn sp-b
