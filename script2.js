(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};
var LS={get:function(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},set:function(k,v){localStorage.setItem(k,JSON.stringify(v))}};

var spData=[
{n:'Dr. Ayşe Yılmaz',r:'AI Araştırmacısı · Google',i:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',b:'Yapay zeka alanında 15 yıllık deneyim. 50+ makale yazarı.'},
{n:'Mehmet Demir',r:'CTO · Trendyol',i:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',b:'E-ticaret altyapısında 20+ yıl deneyim.'},
{n:'Zeynep Kaya',r:'Founder · AI Startup',i:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',b:'AI girişimi kurucusu. 3 başarılı exit.'},
{n:'Can Öztürk',r:'Blockchain Uzmanı',i:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',b:'Web3 ve DeFi uzmanı.'},
{n:'Selin Arslan',r:'UX Direktörü · Meta',i:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',b:'Meta UX Direktörü.'},
{n:'Emre Şahin',r:'Siber Güvenlik · Microsoft',i:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',b:'Zero-trust mimarı.'},
{n:'Deniz Ak',r:'Cloud Mimarı · AWS',i:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',b:'Serverless uzmanı.'},
{n:'Merve Yıldız',r:'Veri Bilimci · Netflix',i:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',b:'Öneri sistemleri uzmanı.'}
];

// 1. BANNER
function b1(){
  var nav=$('.nav');if(!nav||$('.early-banner'))return;
  var b=document.createElement('div');b.className='early-banner';
  b.style.cssText='background:linear-gradient(90deg,#ef4444,#f59e0b);color:#fff;padding:12px 20px;text-align:center;font-weight:600;font-size:.9rem;position:sticky;top:70px;z-index:99';
  var h=47,m=23,s=15;
  function u(){s--;if(s<0){s=59;m--}if(m<0){m=59;h--}if(h<0){h=0;m=0;s=0}
    var p=function(n){return String(n).padStart(2,'0')};
    b.innerHTML='⏰ ERKEN KAYIT — <strong style="font-family:monospace">'+p(h)+':'+p(m)+':'+p(s)+'</strong> · Kod: <strong>ERKEN30</strong>';
  }
  u();setInterval(u,1000);nav.parentNode.insertBefore(b,nav.nextSibling);
}

// 2. SPEAKER MODAL
function b2(){
  document.addEventListener('click',function(e){
    var sp=e.target.closest('.speaker');if(!sp)return;
    var n=sp.querySelector('.speaker__name').textContent;
    var d=spData.filter(function(x){return x.n===n})[0];if(!d)return;
    var m=document.createElement('div');m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close">✕</button><div class="speaker-modal-img" style="background-image:url('+d.i+')"></div><div class="speaker-modal-name">'+d.n+'</div><div class="speaker-modal-role">'+d.r+'</div><div class="speaker-modal-bio">'+d.b+'</div><button class="sp-btn sp-btn--primary" style="width:100%" onclick="alert(\'✅ Eklendi\')">📅 Takvime Ekle</button></div>';
    document.body.appendChild(m);
    m.querySelector('.sp-modal__close').onclick=function(){m.remove()};
    m.onclick=function(e){if(e.target===m)m.remove()};
  });
}

// 3. LIVE
function b3(){
  var s=$('#schedule');if(!s||$('.live-section'))return;
  var el=document.createElement('section');el.className='live-section';
  el.innerHTML='<div class="container" style="text-align:center;position:relative;z-index:1"><span class="live-badge">CANLI</span><h2 style="font-family:monospace;font-size:2rem;margin-bottom:12px;color:#fff">Canlı <span class="grad">Yayın</span></h2><div class="live-video"></div></div>';
  s.parentNode.insertBefore(el,s.nextSibling);
}

// 4. SPONSOR
function b4(){
  var sp=$('#sponsors .container');if(!sp||$('.sponsor-apply'))return;
  var b=document.createElement('div');b.className='sponsor-apply';b.style.cssText='text-align:center;margin-top:40px';
  b.innerHTML='<button type="button" class="sp-btn sp-btn--primary" id="spApply">🤝 Sponsor Ol</button>';
  sp.appendChild(b);
  b.querySelector('#spApply').onclick=function(){
    var m=document.createElement('div');m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close">✕</button><h3 class="sp-modal__title">🤝 Sponsor Başvurusu</h3><form style="display:flex;flex-direction:column;gap:14px"><input placeholder="Şirket" style="padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text)"><input placeholder="E-posta" style="padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text)"><button type="button" class="sp-btn sp-btn--primary" onclick="alert(\'✅ Alındı\');this.closest(\'.sp-modal\').remove()">Gönder</button></form></div>';
    document.body.appendChild(m);
    m.querySelector('.sp-modal__close').onclick=function(){m.remove()};
    m.onclick=function(e){if(e.target===m)m.remove()};
  };
}

// 5. KUPON
function b5(){
  document.addEventListener('click',function(e){
    if(!e.target.closest('.ticket-btn'))return;
    setTimeout(function(){
      var mo=$('#registerModal');if(!mo||$('.coupon-row'))return;
      var f=mo.querySelector('form');if(!f)return;
      var r=document.createElement('div');r.className='coupon-row';
      r.innerHTML='<input id="cpF" placeholder="Kupon (ERKEN30)"><button type="button" class="sp-btn sp-btn--primary" id="cpA">Uygula</button>';
      f.insertBefore(r,f.querySelector('button[type=submit]'));
      r.querySelector('#cpA').onclick=function(){
        var c=r.querySelector('#cpF').value.trim().toUpperCase();
        var v={ERKEN30:30,STUDENT50:50,TECHFEST:15};
        alert(v[c]?'🎉 %'+v[c]+' indirim!':'❌ Geçersiz. ERKEN30 deneyin');
      };
    },300);
  });
}

// 6. PAYLAŞ
function b6(){
  var c=$('.cta__actions');if(!c||$('.share-row'))return;
  var r=document.createElement('div');r.className='share-row';
  var u=encodeURIComponent(location.href);
  r.innerHTML='<a class="share-btn" href="https://twitter.com/intent/tweet?url='+u+'" target="_blank">𝕏</a><a class="share-btn" href="https://wa.me/?text='+u+'" target="_blank">💬</a><a class="share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url='+u+'" target="_blank">💼</a><button type="button" class="share-btn" id="cpL">🔗</button>';
  c.appendChild(r);
  r.querySelector('#cpL').onclick=function(){navigator.clipboard.writeText(location.href);alert('🔗 Kopyalandı')};
}

// 7. iCAL
function b7(){
  var c=$('.cta__actions');if(!c||$('#icalBtn'))return;
  var b=document.createElement('button');b.id='icalBtn';b.className='sp-btn sp-btn--ghost';b.textContent='📅 iCal';
  c.appendChild(b);
  b.onclick=function(){
    var ic='BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:tf\nDTSTART:20261115T100000Z\nDTEND:20261117T180000Z\nSUMMARY:TechFest 2026\nEND:VEVENT\nEND:VCALENDAR';
    var bl=new Blob([ic],{type:'text/calendar'});
    var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='tf.ics';a.click();
  };
}

// 8. FAVORİ
function b8(){
  setTimeout(function(){
    $$('.speaker').forEach(function(sp,i){
      if(sp.querySelector('.fav-star'))return;
      var b=document.createElement('button');b.className='fav-star';b.innerHTML='⭐';
      var f=LS.get('fS',[]);if(f.indexOf(i)>=0)b.classList.add('active');
      b.onclick=function(e){
        e.stopPropagation();
        var f=LS.get('fS',[]);var x=f.indexOf(i);
        if(x>=0){f.splice(x,1);b.classList.remove('active')}else{f.push(i);b.classList.add('active')}
        LS.set('fS',f);
      };
      sp.style.position='relative';sp.appendChild(b);
    });
  },800);
}

// 9. PROGRAM
function b9(){
  setTimeout(function(){
    $$('.sched-item').forEach(function(it,i){
      if(it.querySelector('.sched-check'))return;
      var b=document.createElement('span');b.className='sched-check';b.textContent='✓';
      var k='s'+i;var m=LS.get('myS',[]);if(m.indexOf(k)>=0)b.classList.add('active');
      b.onclick=function(e){
        e.stopPropagation();
        var m=LS.get('myS',[]);var x=m.indexOf(k);
        if(x>=0){m.splice(x,1);b.classList.remove('active')}else{m.push(k);b.classList.add('active')}
        LS.set('myS',m);
      };
      var t=it.querySelector('.sched-time');if(t)t.parentNode.insertBefore(b,t);
    });
  },900);
}

// 10. TWEET
function b10(){
  var l=$('.live-section');if(!l)return;
  var s=document.createElement('section');s.className='section';
  s.innerHTML='<div class="container"><div class="section__head"><h2>Canlı <span class="grad">Tweet</span></h2></div><div class="tweet-feed" id="twF"></div></div>';
  l.parentNode.insertBefore(s,l.nextSibling);
  var tw=['TechFest 2026 muhteşem! #TechFest2026 🚀','AI paneli harikaydı!','Blockchain oturumu süper!','Networking mükemmel!'];
  var i=0;
  function add(){
    var f=$('#twF');if(!f)return;
    var el=document.createElement('div');el.className='tweet';
    el.innerHTML='<div class="tweet__avatar">K</div><div class="tweet__body"><div class="tweet__user">Kullanıcı <span>@user</span></div><div class="tweet__text">'+tw[i++%4]+'</div></div>';
    f.insertBefore(el,f.firstChild);if(f.children.length>4)f.removeChild(f.lastChild);
  }
  for(var j=0;j<3;j++)add();setInterval(add,4000);
}

// 11. PROFİL
function b11(){
  var b=document.createElement('button');b.className='fab';b.style.bottom='230px';b.innerHTML='👤';
  document.body.appendChild(b);
  var w=document.createElement('div');w.className='profile-widget';w.id='pw';
  w.innerHTML='<div class="profile-widget__header"><strong>👤 Profil</strong><button class="sp-modal__close" style="position:static;width:26px;height:26px" id="pc">✕</button></div><input id="pn" placeholder="Adınız" style="width:100%;padding:10px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text);margin-bottom:10px"><button class="sp-btn sp-btn--primary" style="width:100%" id="ps">💾 Kaydet</button>';
  document.body.appendChild(w);
  b.onclick=function(){
    w.classList.toggle('open');
    var p=LS.get('prof',{});if($('#pn'))$('#pn').value=p.n||'';
  };
  $('#pc').onclick=function(){w.classList.remove('open')};
  $('#ps').onclick=function(){LS.set('prof',{n:$('#pn').value});alert('✅ Kaydedildi');w.classList.remove('open')};
}

// 12. AI NETWORK
function b12(){
  var v=$('#venue');if(!v||$('.ai-network'))return;
  var s=document.createElement('section');s.className='section section--alt ai-network';
  s.innerHTML='<div class="container"><div class="section__head"><h2>🤖 <span class="grad">AI Eşleşmeler</span></h2></div><div style="max-width:520px;margin:0 auto"><div class="network-card"><div class="network-card__avatar">A</div><div class="network-card__info"><div class="network-card__name">Ali Veli</div><div class="network-card__role">Full Stack</div></div><div class="network-card__match">95%</div></div><div class="network-card"><div class="network-card__avatar">D</div><div class="network-card__info"><div class="network-card__name">Deniz Yıldız</div><div class="network-card__role">PM</div></div><div class="network-card__match">88%</div></div></div></div>';
  v.parentNode.insertBefore(s,v.nextSibling);
}

// 13. FOTO
function b13(){
  var g=$('#gallery .container');if(!g||$('.upload-zone'))return;
  var w=document.createElement('div');w.style.marginTop='32px';
  w.innerHTML='<div class="upload-zone" id="uz"><div class="upload-zone__icon">📸</div><div class="upload-zone__text">Fotoğraf yükleyin</div></div><div class="upload-preview" id="up"></div>';
  g.appendChild(w);
  var z=$('#uz');var p=$('#up');
  z.onclick=function(){
    var inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.multiple=true;
    inp.onchange=function(e){Array.from(e.target.files).forEach(function(f){
      if(!f.type.startsWith('image/'))return;
      var r=new FileReader();r.onload=function(ev){var im=document.createElement('img');im.src=ev.target.result;p.appendChild(im)};r.readAsDataURL(f);
    })};
    inp.click();
  };
}

// 14. ANKET
function b14(){
  var t=$('#testimonials');if(!t||$('.poll-box'))return;
  var s=document.createElement('section');s.className='section';
  s.innerHTML='<div class="container"><div class="section__head"><h2>🗳️ <span class="grad">Anket</span></h2></div><div class="poll-box"><div class="poll-question">En çok hangi konu?</div><div class="poll-options" id="po"></div></div></div>';
  t.parentNode.insertBefore(s,t);
  var opts=[{id:'ai',t:'🤖 AI',v:234},{id:'bc',t:'⛓️ Blockchain',v:156},{id:'cl',t:'☁️ Cloud',v:189},{id:'ux',t:'🎨 UX',v:98}];
  function r(){
    var l=$('#po');if(!l)return;
    var tot=opts.reduce(function(s,o){return s+o.v},0);
    l.innerHTML=opts.map(function(o){var p=Math.round(o.v/tot*100);
      return '<div class="poll-option" data-id="'+o.id+'"><div class="poll-option__fill" style="width:'+p+'%"></div><div class="poll-option__content"><span>'+o.t+'</span><span class="poll-option__pct">'+p+'%</span></div></div>';
    }).join('');
    l.querySelectorAll('.poll-option').forEach(function(el){
      el.onclick=function(){if(LS.get('vt',null))return;LS.set('vt',el.dataset.id);alert('✅ Oyunuz kaydedildi');r()};
    });
  }
  r();
}

// 15. Q&A
function b15(){
  var f=$('#faq');if(!f||$('.qa-list'))return;
  var s=document.createElement('section');s.className='section section--alt';
  s.innerHTML='<div class="container container--narrow"><div class="section__head"><h2>❓ <span class="grad">Q&A</span></h2></div><div class="qa-list"><div class="qa-item"><div class="qa-item__q">❓ AI işleri alacak mı?</div><div class="qa-item__a">💬 Hayır, dönüştürecek.</div></div><div class="qa-item"><div class="qa-item__q">❓ Web3 gelecek mi?</div><div class="qa-item__a">💬 Uzun vadede evet.</div></div></div><form style="max-width:640px;margin:24px auto 0;display:flex;flex-direction:column;gap:10px"><textarea id="qt" rows="3" placeholder="Sorunuz" style="padding:14px;background:var(--paper);border:1px solid var(--border);border-radius:12px;color:var(--text)"></textarea><button type="button" class="sp-btn sp-btn--primary" id="qb">Gönder</button></form></div>';
  f.parentNode.insertBefore(s,f.nextSibling);
  if($('#qb'))$('#qb').onclick=function(){alert('✅ Gönderildi');$('#qt').value=''};
}

// 16. BİLET
function b16(){
  document.addEventListener('click',function(e){
    var b=e.target.closest('.ticket-btn');if(b)LS.set('lt',b.dataset.ticket||'Standart');
  });
  // Kayıt başarılı olunca bilet butonu
  setInterval(function(){
    var st=$('#registerStatus');
    if(st&&st.textContent.indexOf('alındı')>=0&&!$('.mt-btn')){
      var mo=$('#registerModal');if(!mo)return;
      var c=mo.querySelector('.modal__content');if(!c)return;
      var b=document.createElement('button');b.className='mt-btn sp-btn sp-btn--primary';b.innerHTML='📱 Biletimi Göster';
      b.style.cssText='margin-top:14px;width:100%';
      c.appendChild(b);
      b.onclick=function(){
        var p=LS.get('prof',{});var tt=LS.get('lt','Standart');
        var m=document.createElement('div');m.className='sp-modal active';
        var data=encodeURIComponent('TF-'+Date.now());
        m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close">✕</button><h3 class="sp-modal__title">🎫 Biletim</h3><p class="sp-modal__sub">'+tt+'</p><div class="ticket-card"><div class="ticket-card__name">🚀 TechFest 2026</div><div class="ticket-card__meta">15-17 Kasım · İstanbul</div><div class="qr-box"><img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+data+'" style="width:200px;height:200px"></div><div style="font-family:monospace;margin-top:12px">'+(p.n||'Katılımcı')+'</div></div></div>';
        document.body.appendChild(m);
        m.querySelector('.sp-modal__close').onclick=function(){m.remove()};
      };
    }
  },2000);
}

// 17. DİL
function b17(){
  var a=$('.nav__actions');if(!a||$('.lang-switch'))return;
  var sw=document.createElement('div');sw.className='lang-switch';
  sw.innerHTML='<button type="button" class="active">TR</button><button type="button">EN</button>';
  a.insertBefore(sw,a.firstChild);
  sw.querySelectorAll('button').forEach(function(b){
    b.onclick=function(){
      sw.querySelectorAll('button').forEach(function(x){x.classList.remove('active')});
      b.classList.add('active');
      alert('🌐 Dil: '+(b.textContent==='TR'?'Türkçe':'English'));
    };
  });
}

// 18. KART
function b18(){
  var c=$('.cta__actions');if(!c||$('#scB'))return;
  var b=document.createElement('button');b.id='scB';b.className='sp-btn sp-btn--ghost';b.textContent='🎨 Kart';
  c.appendChild(b);
  b.onclick=function(){
    var m=document.createElement('div');m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close">✕</button><h3 class="sp-modal__title">🎨 Paylaşım Kartı</h3><div class="share-card-preview"><div class="share-card-preview__title">TechFest 2026</div><div class="share-card-preview__date">15-17 Kasım · İstanbul</div><div style="font-size:3rem">🚀</div></div></div>';
    document.body.appendChild(m);
    m.querySelector('.sp-modal__close').onclick=function(){m.remove()};
    m.onclick=function(e){if(e.target===m)m.remove()};
  };
}

// 19. HIZLI
function b19(){
  var h=$('.hero__cta');if(!h||$('.quick-actions'))return;
  var w=document.createElement('div');w.className='quick-actions';
  w.innerHTML='<button type="button" class="sp-btn sp-btn--ghost sp-btn--sm" onclick="alert(\'📞 info@techfest.com\')">📞 İletişim</button>';
  h.parentNode.insertBefore(w,h.nextSibling);
}

// 20. YUKARI
function b20(){
  var b=$('#fabTop');if(!b)return;
  b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
}

// BAŞLAT
window.addEventListener('load',function(){
  setTimeout(function(){
    b1();b2();b3();b4();b5();b6();b7();b8();b9();b10();
    b11();b12();b13();b14();b15();b16();b17();b18();b19();b20();
    console.log('✅ 20 özellik yüklendi');
  },600);
});

})();
