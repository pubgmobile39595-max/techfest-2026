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
