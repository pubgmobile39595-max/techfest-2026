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
