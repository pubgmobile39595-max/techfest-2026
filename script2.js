(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};
var LS={get:function(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},set:function(k,v){localStorage.setItem(k,JSON.stringify(v))}};

// 1. ERKEN KAYIT BANNER
function banner(){
  var nav=$('.nav');if(!nav||$('.early-banner'))return;
  var b=document.createElement('div');b.className='early-banner';
  b.style.cssText='background:linear-gradient(90deg,#ef4444,#f59e0b);color:#fff;padding:12px;text-align:center;font-weight:600;position:sticky;top:70px;z-index:99';
  var h=47,m=23,s=15;
  function u(){s--;if(s<0){s=59;m--}if(m<0){m=59;h--}if(h<0){h=0;m=0;s=0}
    var p=function(n){return String(n).padStart(2,'0')};
    b.innerHTML='⏰ ERKEN KAYIT — <strong style="font-family:monospace">'+p(h)+':'+p(m)+':'+p(s)+'</strong> · Kod: <strong>ERKEN30</strong>';
  }
  u();setInterval(u,1000);nav.parentNode.insertBefore(b,nav.nextSibling);
}

// 2. TR/EN DİL
function lang(){
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

// 3. KONUŞMACI FAVORİ ⭐
function fav(){
  setTimeout(function(){
    $$('.speaker').forEach(function(sp,i){
      if(sp.querySelector('.fav-star'))return;
      var b=document.createElement('button');b.className='fav-star';b.innerHTML='⭐';b.type='button';
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

// 4. PROGRAM KUTULARI ✓
function sched(){
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

// 5. FOOTER MODALLAR (İletişim, Basın Kiti, Gizlilik)
function footer(){
  var modals={
    'İletişim':'<h3 class="sp-modal__title">📞 İletişim</h3><div style="padding:14px;background:var(--bg-alt);border-radius:12px;margin-bottom:10px"><strong>📧 E-posta</strong><p style="color:var(--text-dim);font-size:.9rem">info@techfest.com.tr</p></div><div style="padding:14px;background:var(--bg-alt);border-radius:12px;margin-bottom:10px"><strong>📞 Telefon</strong><p style="color:var(--text-dim);font-size:.9rem">+90 (212) 555 00 00</p></div><div style="padding:14px;background:var(--bg-alt);border-radius:12px"><strong>📍 Adres</strong><p style="color:var(--text-dim);font-size:.9rem">Harbiye, Şişli / İstanbul</p></div>',
    'Basın Kiti':'<h3 class="sp-modal__title">📄 Basın Kiti</h3><div style="display:flex;flex-direction:column;gap:10px;margin-top:14px"><div style="padding:12px;background:var(--bg-alt);border-radius:10px">🎨 Logo paketi · 2.4 MB</div><div style="padding:12px;background:var(--bg-alt);border-radius:10px">📰 Basın bülteni · 840 KB</div><div style="padding:12px;background:var(--bg-alt);border-radius:10px">📸 Konuşmacı fotoğrafları · 12 MB</div><div style="padding:12px;background:var(--bg-alt);border-radius:10px">🎬 Tanıtım videosu · 45 MB</div></div><button type="button" class="sp-btn sp-btn--primary" style="width:100%;margin-top:14px" onclick="alert(\'📥 İndiriliyor\')">📥 Tümünü İndir</button>',
    'Gizlilik':'<h3 class="sp-modal__title">🔒 Gizlilik Politikası</h3><div style="margin-top:14px;font-size:.88rem;line-height:1.6;color:var(--text-dim);max-height:400px;overflow-y:auto"><p style="margin-bottom:12px"><strong style="color:var(--text)">1. Toplanan Bilgiler</strong><br>Kayıt sırasında ad, e-posta, telefon bilgileriniz toplanır.</p><p style="margin-bottom:12px"><strong style="color:var(--text)">2. Kullanım Amacı</strong><br>Bilet gönderimi ve bilgilendirme için kullanılır.</p><p style="margin-bottom:12px"><strong style="color:var(--text)">3. Üçüncü Taraflar</strong><br>Hiçbir koşulda paylaşılmaz.</p><p style="margin-bottom:12px"><strong style="color:var(--text)">4. KVKK Haklarınız</strong><br>Erişme, düzeltme ve silme hakkınız var.</p><p style="margin-bottom:12px"><strong style="color:var(--text)">5. İletişim</strong><br>kvkk@techfest.com.tr</p></div>'
  };
  document.addEventListener('click',function(e){
    var a=e.target.closest('.footer__grid a');
    if(!a||a.getAttribute('href')!=='#')return;
    var txt=a.textContent.trim();
    if(!modals[txt])return;
    e.preventDefault();
    var m=document.createElement('div');m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close" type="button">✕</button>'+modals[txt]+'</div>';
    document.body.appendChild(m);
    m.querySelector('.sp-modal__close').onclick=function(){m.remove()};
    m.onclick=function(ev){if(ev.target===m)m.remove()};
  });
}

// BAŞLAT
window.addEventListener('load',function(){
  setTimeout(function(){
    try{banner()}catch(e){}
    try{lang()}catch(e){}
    try{fav()}catch(e){}
    try{sched()}catch(e){}
    try{footer()}catch(e){}
    console.log('✅ 5 özellik yüklendi');
  },600);
});

})();
// ===== EK ÖZELLİKLER PART 2 =====
(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};

// 6. CANLI YAYIN BÖLÜMÜ
function live(){
  var s=$('#schedule');if(!s||$('.live-section'))return;
  var el=document.createElement('section');el.className='live-section';
  el.innerHTML='<div class="container" style="text-align:center;position:relative;z-index:1;padding:60px 20px"><span class="live-badge">🔴 CANLI</span><h2 style="font-family:monospace;font-size:2rem;margin:20px 0 12px;color:#fff">Canlı <span class="grad">Yayın</span></h2><div style="aspect-ratio:16/9;max-width:800px;margin:20px auto 0;background:#000;border-radius:20px;display:grid;place-items:center;color:#fff;border:2px solid rgba(239,68,68,.3);font-family:monospace;font-size:1.3rem">▶ CANLI YAYIN</div></div>';
  s.parentNode.insertBefore(el,s.nextSibling);
}

// 7. TWEET AKIŞI
function tweet(){
  var l=$('.live-section');if(!l)return;
  var s=document.createElement('section');s.className='section';
  s.innerHTML='<div class="container"><div class="section__head"><h2>Canlı <span class="grad">Tweet</span></h2></div><div class="tweet-feed" id="twF" style="display:flex;flex-direction:column;gap:12px;max-width:640px;margin:0 auto"></div></div>';
  l.parentNode.insertBefore(s,l.nextSibling);
  var tw=['TechFest 2026 muhteşem! 🚀','AI paneli harikaydı!','Blockchain oturumu süper!','Networking mükemmel!','Konuşmacılar dünya standartı!'];
  var i=0;
  function add(){
    var f=$('#twF');if(!f)return;
    var el=document.createElement('div');
    el.style.cssText='background:var(--paper);border:1px solid var(--border);border-radius:14px;padding:16px;display:flex;gap:12px';
    el.innerHTML='<div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:grid;place-items:center;color:#fff;font-weight:700;flex-shrink:0">K</div><div style="flex:1"><div style="font-weight:600;font-size:.88rem;margin-bottom:4px">Kullanıcı <span style="color:var(--text-dim);font-weight:400">@user</span></div><div style="font-size:.9rem">'+tw[i++%tw.length]+'</div></div>';
    f.insertBefore(el,f.firstChild);
    if(f.children.length>4)f.removeChild(f.lastChild);
  }
  for(var j=0;j<3;j++)add();
  setInterval(add,4000);
}

// 8. SPONSOR OL BUTONU
function sponsor(){
  var sp=$('#sponsors .container');if(!sp||$('.sponsor-apply'))return;
  var b=document.createElement('div');b.className='sponsor-apply';
  b.style.cssText='text-align:center;margin-top:40px';
  b.innerHTML='<button type="button" class="sp-btn sp-btn--primary" id="spApply" style="padding:12px 22px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;border:0;border-radius:12px;font-weight:600;cursor:pointer;font-size:.9rem">🤝 Sponsor Olmak İster misiniz?</button>';
  sp.appendChild(b);
  b.querySelector('#spApply').onclick=function(){
    var m=document.createElement('div');m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box" style="background:var(--paper);border:1px solid var(--border);border-radius:24px;padding:32px;max-width:600px;width:100%;position:relative"><button class="sp-modal__close" style="position:absolute;top:14px;right:14px;background:var(--bg-alt);border:0;border-radius:50%;width:36px;height:36px;cursor:pointer;color:var(--text)" type="button">✕</button><h3 style="font-family:monospace;font-size:1.5rem;margin-bottom:6px">🤝 Sponsor Başvurusu</h3><p style="color:var(--text-dim);font-size:.9rem;margin-bottom:22px">Size özel teklif için formu doldurun.</p><form style="display:flex;flex-direction:column;gap:14px"><input placeholder="Şirket Adı" style="padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text)"><input placeholder="E-posta" style="padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text)"><select style="padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text)"><option>Platin</option><option>Altın</option><option>Gümüş</option></select><button type="button" style="padding:12px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;border:0;border-radius:10px;font-weight:600;cursor:pointer" onclick="alert(\'✅ Başvurunuz alındı!\');this.closest(\'.sp-modal\').remove()">Gönder</button></form></div>';
    document.body.appendChild(m);
    m.querySelector('.sp-modal__close').onclick=function(){m.remove()};
    m.onclick=function(ev){if(ev.target===m)m.remove()};
  };
}

// 9. AI EŞLEŞMELER
function ai(){
  var v=$('#venue');if(!v||$('.ai-network'))return;
  var s=document.createElement('section');s.className='section section--alt ai-network';
  s.innerHTML='<div class="container"><div class="section__head"><h2>🤖 <span class="grad">AI Eşleşmeler</span></h2><p style="color:var(--text-dim);font-size:.9rem;margin-top:8px">Konferansta tanışmanız gereken kişiler</p></div><div style="max-width:520px;margin:0 auto"><div style="display:flex;gap:12px;align-items:center;padding:12px;background:var(--bg-alt);border-radius:12px;margin-bottom:10px"><div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:grid;place-items:center;color:#fff;font-weight:700">A</div><div style="flex:1"><div style="font-weight:600;font-size:.9rem">Ali Veli</div><div style="font-size:.78rem;color:var(--text-dim)">Full Stack Developer</div></div><div style="font-family:monospace;font-weight:700;color:#10b981">95%</div></div><div style="display:flex;gap:12px;align-items:center;padding:12px;background:var(--bg-alt);border-radius:12px;margin-bottom:10px"><div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:grid;place-items:center;color:#fff;font-weight:700">D</div><div style="flex:1"><div style="font-weight:600;font-size:.9rem">Deniz Yıldız</div><div style="font-size:.78rem;color:var(--text-dim)">Product Manager</div></div><div style="font-family:monospace;font-weight:700;color:#10b981">88%</div></div></div></div>';
  v.parentNode.insertBefore(s,v.nextSibling);
}

// 10. ANKET
function poll(){
  var t=$('#testimonials');if(!t||$('.poll-box'))return;
  var s=document.createElement('section');s.className='section';
  s.innerHTML='<div class="container"><div class="section__head"><h2>🗳️ <span class="grad">Anket</span></h2></div><div style="background:var(--paper);border:1px solid var(--border);border-radius:16px;padding:24px;max-width:520px;margin:0 auto"><div style="font-family:monospace;font-size:1.1rem;font-weight:700;margin-bottom:18px;text-align:center">En çok hangi konu?</div><div id="po" style="display:flex;flex-direction:column;gap:10px"></div></div></div>';
  t.parentNode.insertBefore(s,t);
  var opts=[{t:'🤖 AI',v:35},{t:'⛓️ Blockchain',v:23},{t:'☁️ Cloud',v:28},{t:'🎨 UX',v:14}];
  var l=$('#po');
  if(l){
    l.innerHTML=opts.map(function(o){
      return '<div style="padding:14px 18px;background:var(--bg-alt);border:1px solid var(--border);border-radius:12px;cursor:pointer"><div style="display:flex;justify-content:space-between;font-weight:600;font-size:.9rem"><span>'+o.t+'</span><span style="color:var(--primary-light);font-family:monospace">'+o.v+'%</span></div></div>';
    }).join('');
    l.querySelectorAll('div').forEach(function(el){
      el.onclick=function(){alert('✅ Oyunuz kaydedildi!')};
    });
  }
}

// BAŞLAT
window.addEventListener('load',function(){
  setTimeout(function(){
    try{live()}catch(e){console.log(e)}
    try{tweet()}catch(e){console.log(e)}
    try{sponsor()}catch(e){console.log(e)}
    try{ai()}catch(e){console.log(e)}
    try{poll()}catch(e){console.log(e)}
    console.log('✅ Part 2 yüklendi');
  },700);
});
})();
// ===== EK ÖZELLİKLER PART 3 =====
(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};
var LS={get:function(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},set:function(k,v){localStorage.setItem(k,JSON.stringify(v))}};

// 11. KUPON SİSTEMİ
function coupon(){
  document.addEventListener('click',function(e){
    var b=e.target.closest('.ticket-btn');
    if(b)LS.set('lt',b.dataset.ticket||'Standart');
    if(!b)return;
    setTimeout(function(){
      var mo=$('#registerModal');
      if(!mo||$('.coupon-row'))return;
      var f=mo.querySelector('form');if(!f)return;
      var r=document.createElement('div');r.className='coupon-row';
      r.style.cssText='display:flex;gap:8px;margin:14px 0';
      r.innerHTML='<input id="cpF" placeholder="Kupon (ERKEN30)" style="flex:1;padding:11px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text)"><button type="button" id="cpA" style="padding:11px 16px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;border:0;border-radius:10px;font-weight:600;cursor:pointer">Uygula</button>';
      f.insertBefore(r,f.querySelector('button[type=submit]'));
      r.querySelector('#cpA').onclick=function(){
        var c=r.querySelector('#cpF').value.trim().toUpperCase();
        var v={ERKEN30:30,STUDENT50:50,TECHFEST:15};
        alert(v[c]?'🎉 %'+v[c]+' indirim!':'❌ Geçersiz. ERKEN30 deneyin');
      };
    },300);
  });
}

// 12. MOBİL BİLET
function ticket(){
  setInterval(function(){
    var st=$('#registerStatus');
    if(st&&st.textContent.indexOf('alındı')>=0&&!$('.mt-btn')){
      var mo=$('#registerModal');if(!mo)return;
      var c=mo.querySelector('.modal__content');if(!c)return;
      var b=document.createElement('button');b.className='mt-btn';b.innerHTML='📱 Biletimi Göster';b.type='button';
      b.style.cssText='margin-top:14px;width:100%;padding:12px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;border:0;border-radius:10px;font-weight:600;cursor:pointer';
      c.appendChild(b);
      b.onclick=function(){
        var p=LS.get('prof',{});var tt=LS.get('lt','Standart');
        var m=document.createElement('div');m.className='sp-modal active';
        var data='TECHFEST2026-'+(p.n||'KATILIMCI')+'-'+Date.now();
        m.innerHTML='<div class="sp-modal__box" style="background:var(--paper);border:1px solid var(--border);border-radius:24px;padding:32px;max-width:500px;width:100%;position:relative"><button class="sp-modal__close" style="position:absolute;top:14px;right:14px;background:var(--bg-alt);border:0;border-radius:50%;width:36px;height:36px;cursor:pointer;color:var(--text)" type="button">✕</button><h3 style="font-family:monospace;font-size:1.5rem;margin-bottom:6px">🎫 Biletim</h3><p style="color:var(--text-dim);font-size:.9rem;margin-bottom:22px">'+tt+'</p><div style="background:linear-gradient(135deg,var(--paper),var(--bg-alt));border:2px dashed #7c3aed;border-radius:20px;padding:24px;text-align:center"><div style="font-family:monospace;font-size:1.3rem;font-weight:800;margin-bottom:6px">🚀 TechFest 2026</div><div style="color:var(--text-dim);font-size:.85rem;margin-bottom:16px">15-17 Kasım · İstanbul</div><div id="tq" style="background:#fff;padding:16px;border-radius:16px;display:inline-block"></div><div style="font-family:monospace;margin-top:12px;word-break:break-all;font-size:.75rem">'+data+'</div></div></div>';
        document.body.appendChild(m);
        m.querySelector('.sp-modal__close').onclick=function(){m.remove()};
        m.onclick=function(ev){if(ev.target===m)m.remove()};
        var qr=$('#tq');
        if(qr){
          qr.innerHTML='<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+encodeURIComponent(data)+'" style="width:200px;height:200px;display:block" alt="QR">';
        }
      };
    }
  },2000);
}

// 13. SOSYAL PAYLAŞ
function share(){
  var c=$('.cta__actions');if(!c||$('.share-row'))return;
  var r=document.createElement('div');r.className='share-row';
  r.style.cssText='display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:14px';
  var u=encodeURIComponent(location.href);
  r.innerHTML='<a href="https://twitter.com/intent/tweet?url='+u+'" target="_blank" style="padding:10px 16px;border:1px solid var(--border);border-radius:999px;background:var(--paper);color:var(--text);text-decoration:none;font-size:.82rem">𝕏 Twitter</a><a href="https://wa.me/?text='+u+'" target="_blank" style="padding:10px 16px;border:1px solid var(--border);border-radius:999px;background:var(--paper);color:var(--text);text-decoration:none;font-size:.82rem">💬 WhatsApp</a><a href="https://www.linkedin.com/sharing/share-offsite/?url='+u+'" target="_blank" style="padding:10px 16px;border:1px solid var(--border);border-radius:999px;background:var(--paper);color:var(--text);text-decoration:none;font-size:.82rem">💼 LinkedIn</a><button type="button" id="cpL" style="padding:10px 16px;border:1px solid var(--border);border-radius:999px;background:var(--paper);color:var(--text);cursor:pointer;font-size:.82rem">🔗 Kopyala</button>';
  c.appendChild(r);
  r.querySelector('#cpL').onclick=function(){navigator.clipboard.writeText(location.href);alert('🔗 Kopyalandı')};
}

// 14. iCAL İNDİR
function ical(){
  var c=$('.cta__actions');if(!c||$('#icalBtn'))return;
  var b=document.createElement('button');b.id='icalBtn';b.type='button';b.textContent='📅 iCal';
  b.style.cssText='padding:12px 22px;background:var(--paper);border:1px solid var(--border);color:var(--text);border-radius:12px;font-weight:600;cursor:pointer;margin-top:10px';
  c.appendChild(b);
  b.onclick=function(){
    var ic='BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:tf\nDTSTART:20261115T100000Z\nDTEND:20261117T180000Z\nSUMMARY:TechFest 2026\nEND:VEVENT\nEND:VCALENDAR';
    var bl=new Blob([ic],{type:'text/calendar'});
    var a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='tf.ics';a.click();
  };
}

// 15. PAYLAŞIM KARTI
function card(){
  var c=$('.cta__actions');if(!c||$('#scB'))return;
  var b=document.createElement('button');b.id='scB';b.type='button';b.textContent='🎨 Kart';
  b.style.cssText='padding:12px 22px;background:var(--paper);border:1px solid var(--border);color:var(--text);border-radius:12px;font-weight:600;cursor:pointer;margin-top:10px';
  c.appendChild(b);
  b.onclick=function(){
    var m=document.createElement('div');m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box" style="background:var(--paper);border:1px solid var(--border);border-radius:24px;padding:32px;max-width:500px;width:100%;position:relative"><button class="sp-modal__close" style="position:absolute;top:14px;right:14px;background:var(--bg-alt);border:0;border-radius:50%;width:36px;height:36px;cursor:pointer;color:var(--text)" type="button">✕</button><h3 style="font-family:monospace;font-size:1.5rem;margin-bottom:6px">🎨 Paylaşım Kartı</h3><div style="background:linear-gradient(135deg,var(--paper),var(--bg-alt));border:2px solid #7c3aed;border-radius:20px;padding:32px;text-align:center;margin:16px 0"><div style="font-family:monospace;font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:8px">TechFest 2026</div><div style="color:var(--text-dim);font-size:.9rem;margin-bottom:16px">15-17 Kasım · İstanbul</div><div style="font-size:3rem">🚀</div></div></div>';
    document.body.appendChild(m);
    m.querySelector('.sp-modal__close').onclick=function(){m.remove()};
    m.onclick=function(ev){if(ev.target===m)m.remove()};
  };
}

// 16. PROFİL WIDGET
function profile(){
  if($('.profile-btn'))return;
  var b=document.createElement('button');b.className='profile-btn';b.type='button';b.innerHTML='👤';
  b.style.cssText='position:fixed;bottom:230px;right:24px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;font-size:1.4rem;box-shadow:0 10px 30px rgba(124,58,237,.5);z-index:900;cursor:pointer;border:0';
  document.body.appendChild(b);
  var w=document.createElement('div');w.id='pw';
  w.style.cssText='position:fixed;bottom:90px;right:24px;width:280px;background:var(--paper);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.3);z-index:901;display:none';
  w.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><strong style="font-family:monospace">👤 Profil</strong><button type="button" id="pc" style="background:var(--bg-alt);border:0;border-radius:50%;width:26px;height:26px;cursor:pointer;color:var(--text)">✕</button></div><input id="pn" placeholder="Adınız" style="width:100%;padding:10px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--text);margin-bottom:10px"><button type="button" id="ps" style="width:100%;padding:10px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;border:0;border-radius:10px;font-weight:600;cursor:pointer">💾 Kaydet</button>';
  document.body.appendChild(w);
  b.onclick=function(){
    w.style.display=w.style.display==='block'?'none':'block';
    var p=LS.get('prof',{});if($('#pn'))$('#pn').value=p.n||'';
  };
  $('#pc').onclick=function(){w.style.display='none'};
  $('#ps').onclick=function(){LS.set('prof',{n:$('#pn').value});alert('✅ Kaydedildi');w.style.display='none'};
}

// 17. FOTOĞRAF YÜKLEME
function photo(){
  var g=$('#gallery .container');if(!g||$('.upload-zone'))return;
  var w=document.createElement('div');w.style.marginTop='32px';
  w.innerHTML='<div class="upload-zone" id="uz" style="border:2px dashed var(--border);border-radius:16px;padding:32px;text-align:center;cursor:pointer;background:var(--bg-alt)"><div style="font-size:2.5rem;margin-bottom:10px;opacity:.6">📸</div><div style="font-size:.9rem;color:var(--text-dim)">Fotoğraf yükleyin (tıkla)</div></div><div id="up" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px"></div>';
  g.appendChild(w);
  var z=$('#uz');var p=$('#up');
  z.onclick=function(){
    var inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.multiple=true;
    inp.onchange=function(e){Array.from(e.target.files).forEach(function(f){
      if(!f.type.startsWith('image/'))return;
      var r=new FileReader();r.onload=function(ev){var im=document.createElement('img');im.src=ev.target.result;im.style.cssText='width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px';p.appendChild(im)};r.readAsDataURL(f);
    })};
    inp.click();
  };
}

// 18. Q&A
function qa(){
  var f=$('#faq');if(!f||$('.qa-list'))return;
  var s=document.createElement('section');s.className='section section--alt';
  s.innerHTML='<div class="container container--narrow"><div class="section__head"><h2>❓ <span class="grad">Q&A</span></h2></div><div style="display:flex;flex-direction:column;gap:12px;max-width:640px;margin:0 auto 24px"><div style="background:var(--paper);border:1px solid var(--border);border-radius:14px;padding:16px"><div style="font-weight:600;font-size:.9rem;margin-bottom:6px;color:#a855f7">❓ AI işleri alacak mı?</div><div style="font-size:.85rem;color:var(--text-dim)">💬 Hayır, dönüştürecek.</div></div><div style="background:var(--paper);border:1px solid var(--border);border-radius:14px;padding:16px"><div style="font-weight:600;font-size:.9rem;margin-bottom:6px;color:#a855f7">❓ Web3 gelecek mi?</div><div style="font-size:.85rem;color:var(--text-dim)">💬 Uzun vadede evet.</div></div></div><form style="max-width:640px;margin:0 auto;display:flex;flex-direction:column;gap:10px"><textarea id="qt" rows="3" placeholder="Sorunuzu yazın" style="padding:14px;background:var(--paper);border:1px solid var(--border);border-radius:12px;color:var(--text)"></textarea><button type="button" id="qb" style="padding:12px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;border:0;border-radius:12px;font-weight:600;cursor:pointer">📤 Gönder</button></form></div>';
  f.parentNode.insertBefore(s,f.nextSibling);
  if($('#qb'))$('#qb').onclick=function(){alert('✅ Gönderildi');$('#qt').value=''};
}

// 19. HIZLI AKSİYONLAR
function quick(){
  var h=$('.hero__cta');if(!h||$('.quick-actions'))return;
  var w=document.createElement('div');w.className='quick-actions';
  w.style.cssText='display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:20px';
  w.innerHTML='<button type="button" onclick="alert(\'📞 info@techfest.com.tr\')" style="padding:8px 14px;background:var(--paper);border:1px solid var(--border);color:var(--text);border-radius:999px;cursor:pointer;font-size:.82rem">📞 İletişim</button>';
  h.parentNode.insertBefore(w,h.nextSibling);
}

// 20. YUKARI ÇIK
function top(){
  var b=$('#fabTop');if(!b)return;
  b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
  window.addEventListener('scroll',function(){
    b.style.opacity=window.scrollY>400?'1':'0.5';
  });
}

// BAŞLAT
window.addEventListener('load',function(){
  setTimeout(function(){
    try{coupon()}catch(e){}
    try{ticket()}catch(e){}
    try{share()}catch(e){}
    try{ical()}catch(e){}
    try{card()}catch(e){}
    try{profile()}catch(e){}
    try{photo()}catch(e){}
    try{qa()}catch(e){}
    try{quick()}catch(e){}
    try{top()}catch(e){}
    console.log('✅ Part 3 yüklendi - 20 özellik tamam!');
  },800);
});
})();
// ===== DÜZELTME PAKETİ =====
(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};

// 1. FOTOĞRAF YÜKLEME (DÜZELTİLDİ)
function fixPhoto(){
  if($('#uploadBtn'))return;
  var g=$('#gallery .container');
  if(!g)return;
  var w=document.createElement('div');
  w.style.cssText='margin-top:32px';
  w.innerHTML='<label for="fileInput" id="uploadBtn" style="display:block;border:2px dashed var(--border);border-radius:16px;padding:32px;text-align:center;cursor:pointer;background:var(--bg-alt)"><div style="font-size:2.5rem;margin-bottom:10px;opacity:.6">📸</div><div style="font-size:.9rem;color:var(--text-dim)">Fotoğraf yükleyin (tıkla)</div></label><input type="file" id="fileInput" accept="image/*" multiple style="display:none"><div id="up" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px"></div>';
  g.appendChild(w);
  var inp=$('#fileInput');
  var p=$('#up');
  inp.onchange=function(e){
    Array.from(e.target.files).forEach(function(f){
      if(!f.type.startsWith('image/'))return;
      var r=new FileReader();
      r.onload=function(ev){
        var im=document.createElement('img');
        im.src=ev.target.result;
        im.style.cssText='width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px';
        p.appendChild(im);
      };
      r.readAsDataURL(f);
    });
  };
}

// 2. BASIN KİTİ (DÜZELTİLDİ - tüm link metinlerini yakalar)
function fixFooter(){
  var modals={
    'basın kiti':'<h3 style="font-family:monospace;font-size:1.5rem;margin-bottom:14px">📄 Basın Kiti</h3><p style="color:var(--text-dim);font-size:.9rem;margin-bottom:18px">TechFest 2026 medya dosyaları</p><div style="display:flex;flex-direction:column;gap:10px"><div style="padding:14px;background:var(--bg-alt);border-radius:10px;display:flex;justify-content:space-between"><span>🎨 Logo paketi</span><span style="color:var(--text-dim);font-size:.8rem">2.4 MB</span></div><div style="padding:14px;background:var(--bg-alt);border-radius:10px;display:flex;justify-content:space-between"><span>📰 Basın bülteni</span><span style="color:var(--text-dim);font-size:.8rem">840 KB</span></div><div style="padding:14px;background:var(--bg-alt);border-radius:10px;display:flex;justify-content:space-between"><span>📸 Konuşmacı fotoğrafları</span><span style="color:var(--text-dim);font-size:.8rem">12 MB</span></div><div style="padding:14px;background:var(--bg-alt);border-radius:10px;display:flex;justify-content:space-between"><span>📋 Bilgi dosyası</span><span style="color:var(--text-dim);font-size:.8rem">320 KB</span></div><div style="padding:14px;background:var(--bg-alt);border-radius:10px;display:flex;justify-content:space-between"><span>🎬 Tanıtım videosu</span><span style="color:var(--text-dim);font-size:.8rem">45 MB</span></div></div><button type="button" style="width:100%;padding:14px;margin-top:16px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;border:0;border-radius:12px;font-weight:600;cursor:pointer" onclick="alert(\'📥 İndiriliyor... (demo)\')">📥 Tümünü İndir</button>',
    'iletişim':'<h3 style="font-family:monospace;font-size:1.5rem;margin-bottom:14px">📞 İletişim</h3><div style="display:flex;flex-direction:column;gap:12px"><div style="padding:14px;background:var(--bg-alt);border-radius:12px"><strong>📧 E-posta</strong><p style="color:var(--text-dim);font-size:.9rem;margin-top:4px">info@techfest.com.tr</p></div><div style="padding:14px;background:var(--bg-alt);border-radius:12px"><strong>📞 Telefon</strong><p style="color:var(--text-dim);font-size:.9rem;margin-top:4px">+90 (212) 555 00 00</p></div><div style="padding:14px;background:var(--bg-alt);border-radius:12px"><strong>📍 Adres</strong><p style="color:var(--text-dim);font-size:.9rem;margin-top:4px">Harbiye, Şişli / İstanbul</p></div></div>',
    'gizlilik':'<h3 style="font-family:monospace;font-size:1.5rem;margin-bottom:14px">🔒 Gizlilik Politikası</h3><div style="display:flex;flex-direction:column;gap:14px;font-size:.88rem;line-height:1.6;color:var(--text-dim);max-height:400px;overflow-y:auto"><p><strong style="color:var(--text)">1. Toplanan Bilgiler</strong><br>Kayıt sırasında ad, e-posta, telefon bilgileriniz toplanır.</p><p><strong style="color:var(--text)">2. Kullanım Amacı</strong><br>Bilet gönderimi için kullanılır.</p><p><strong style="color:var(--text)">3. Üçüncü Taraflar</strong><br>Hiçbir koşulda paylaşılmaz.</p><p><strong style="color:var(--text)">4. KVKK Haklarınız</strong><br>Erişme, düzeltme ve silme hakkınız var.</p></div>'
  };
  document.addEventListener('click',function(e){
    var a=e.target.closest('.footer__grid a');
    if(!a)return;
    var txt=a.textContent.trim().toLowerCase();
    if(a.getAttribute('href')!=='#')return;
    if(!modals[txt])return;
    e.preventDefault();
    e.stopPropagation();
    var m=document.createElement('div');m.className='sp-modal active';
    m.style.cssText='position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);display:grid;place-items:center;padding:20px';
    m.innerHTML='<div style="background:var(--paper);border:1px solid var(--border);border-radius:24px;padding:32px;max-width:500px;width:100%;position:relative"><button type="button" style="position:absolute;top:14px;right:14px;background:var(--bg-alt);border:0;border-radius:50%;width:36px;height:36px;cursor:pointer;color:var(--text);font-size:1rem" class="fmclose">✕</button>'+modals[txt]+'</div>';
    document.body.appendChild(m);
    m.querySelector('.fmclose').onclick=function(){m.remove()};
    m.onclick=function(ev){if(ev.target===m)m.remove()};
  },true);
}

// 3. KONUŞMACI DETAY MODALI (DÜZELTİLDİ)
function fixSpeaker(){
  document.addEventListener('click',function(e){
    var sp=e.target.closest('.speaker');
    if(!sp)return;
    if(e.target.closest('.fav-star'))return;
    e.preventDefault();
    e.stopPropagation();
    var n=sp.querySelector('.speaker__name');
    var r=sp.querySelector('.speaker__role');
    if(!n)return;
    var name=n.textContent;
    var role=r?r.textContent:'';
    var img='';
    var imgEl=sp.querySelector('.speaker__img');
    if(imgEl){
      var bg=imgEl.style.backgroundImage;
      if(bg)img=bg.replace(/^url\(["']?/,'').replace(/["']?\)$/,'');
    }
    var m=document.createElement('div');m.className='sp-modal active';
    m.style.cssText='position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);display:grid;place-items:center;padding:20px';
    m.innerHTML='<div style="background:var(--paper);border:1px solid var(--border);border-radius:24px;padding:32px;max-width:500px;width:100%;position:relative;text-align:center"><button type="button" style="position:absolute;top:14px;right:14px;background:var(--bg-alt);border:0;border-radius:50%;width:36px;height:36px;cursor:pointer;color:var(--text);font-size:1rem" class="smclose">✕</button>'+(img?'<div style="width:120px;height:120px;border-radius:50%;background-image:url('+img+');background-size:cover;background-position:center;margin:0 auto 16px;border:4px solid #7c3aed"></div>':'')+'<div style="font-family:monospace;font-size:1.3rem;margin-bottom:4px">'+name+'</div><div style="color:var(--text-dim);font-size:.9rem;margin-bottom:20px">'+role+'</div><div style="color:var(--text-dim);font-size:.9rem;line-height:1.6;padding:16px;background:var(--bg-alt);border-radius:12px;margin-bottom:16px">TechFest 2026\'nın değerli konuşmacısı. Sektörde uzun yıllara dayanan deneyimiyle ilham verici bir sunum gerçekleştirecek.</div><button type="button" style="width:100%;padding:14px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;border:0;border-radius:12px;font-weight:600;cursor:pointer" onclick="alert(\'✅ Takvime eklendi!\');this.closest(\'.sp-modal\').remove()">📅 Takvime Ekle</button></div>';
    document.body.appendChild(m);
    m.querySelector('.smclose').onclick=function(){m.remove()};
    m.onclick=function(ev){if(ev.target===m)m.remove()};
  },true);
}

// BAŞLAT
window.addEventListener('load',function(){
  setTimeout(function(){
    try{fixPhoto()}catch(e){console.log('photo:',e)}
    try{fixFooter()}catch(e){console.log('footer:',e)}
    try{fixSpeaker()}catch(e){console.log('speaker:',e)}
    console.log('✅ Düzeltmeler yüklendi');
  },1000);
});
})();
