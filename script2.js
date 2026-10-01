/* ========== 20 ÖZELLİK PAKETİ ========== */
(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};
var LS={
  get:function(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},
  set:function(k,v){localStorage.setItem(k,JSON.stringify(v))}
};

// ===== VERİ =====
var speakersData=[
  {name:'Dr. Ayşe Yılmaz',role:'AI Araştırmacısı · Google',img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',bio:'Yapay zeka alanında 15 yıllık deneyim. Google Brain ekibinde çalışıyor. 50+ akademik makale yazarı.',twitter:'@ayseyilmaz'},
  {name:'Mehmet Demir',role:'CTO · Trendyol',img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',bio:'Trendyol CTO\'su. E-ticaret altyapısında 20+ yıl deneyim. Mikroservis mimarisi uzmanı.',twitter:'@mehmetdemir'},
  {name:'Zeynep Kaya',role:'Founder · AI Startup',img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',bio:'AI girişimi kurucusu. 3 başarılı exit. Yapay zeka girişimciliği üzerine mentorluk yapıyor.',twitter:'@zeynepkaya'},
  {name:'Can Öztürk',role:'Blockchain Uzmanı',img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',bio:'Blockchain teknolojileri ve Web3 üzerine çalışıyor. Türkiye\'nin ilk DeFi projesinin mimarı.',twitter:'@canozturk'},
  {name:'Selin Arslan',role:'UX Direktörü · Meta',img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',bio:'Meta\'da UX Direktörü. Kullanıcı deneyimi tasarımı üzerine kitaplar yazdı.',twitter:'@selinarslan'},
  {name:'Emre Şahin',role:'Siber Güvenlik · Microsoft',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',bio:'Microsoft güvenlik ekibinde. Siber güvenlik ve zero-trust mimarisi uzmanı.',twitter:'@emresahin'},
  {name:'Deniz Ak',role:'Cloud Mimarı · AWS',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',bio:'AWS Türkiye çözüm mimarı. Serverless ve edge computing üzerine uzman.',twitter:'@denizak'},
  {name:'Merve Yıldız',role:'Veri Bilimci · Netflix',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',bio:'Netflix veri bilimi ekibinde. Öneri sistemleri ve veri görselleştirme uzmanı.',twitter:'@merveyildiz'}
];

// ===== 1. EARLY BIRD BANNER =====
function addEarlyBanner(){
  var nav=$('.nav');
  if(!nav||$('.early-banner'))return;
  var b=document.createElement('div');
  b.className='early-banner';
  var hours=47,min=23,sec=15;
  function update(){
    sec--;
    if(sec<0){sec=59;min--}
    if(min<0){min=59;hours--}
    if(hours<0){hours=0;min=0;sec=0}
    var pad=function(n){return String(n).padStart(2,'0')};
    b.innerHTML='⏰ ERKEN KAYIT FIRSATI — Son <strong>'+pad(hours)+':'+pad(min)+':'+pad(sec)+'</strong> · Kod: <strong>ERKEN30</strong> ile %30 indirim!';
  }
  update();
  setInterval(update,1000);
  nav.parentNode.insertBefore(b,nav.nextSibling);
}

// ===== 2. KONUŞMACI MODALI =====
function addSpeakerModal(){
  document.addEventListener('click',function(e){
    var sp=e.target.closest('.speaker');
    if(!sp)return;
    var name=sp.querySelector('.speaker__name').textContent;
    var data=speakersData.filter(function(s){return s.name===name})[0];
    if(!data)return;
    openSpeakerModal(data);
  });
}
function openSpeakerModal(s){
  var m=document.createElement('div');
  m.className='sp-modal active';
  m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close" type="button">✕</button>'+
    '<div class="speaker-modal-img" style="background-image:url('+s.img+')"></div>'+
    '<div class="speaker-modal-name">'+s.name+'</div>'+
    '<div class="speaker-modal-role">'+s.role+'</div>'+
    '<div class="speaker-modal-bio">'+s.bio+'</div>'+
    '<div class="speaker-modal-socials"><a href="#" title="Twitter">𝕏</a><a href="#" title="LinkedIn">💼</a><a href="#" title="Website">🌐</a></div>'+
    '<button type="button" class="sp-btn sp-btn--primary" style="width:100%" onclick="alert(\'⏰ '+s.name+' oturumu takviminize eklendi!\')">📅 Oturumu Takvime Ekle</button>'+
    '</div>';
  document.body.appendChild(m);
  m.querySelector('.sp-modal__close').addEventListener('click',function(){m.remove()});
  m.addEventListener('click',function(e){if(e.target===m)m.remove()});
}

// ===== 3. CANLI YAYIN =====
function addLiveSection(){
  var sched=$('#schedule');
  if(!sched||$('.live-section'))return;
  var s=document.createElement('section');
  s.className='live-section';
  s.innerHTML='<div class="container" style="text-align:center;position:relative;z-index:1">'+
    '<span class="live-badge">CANLI</span>'+
    '<h2 style="font-family:var(--mono);font-size:clamp(1.6rem,4vw,2.4rem);margin-bottom:12px;color:#fff">Konferansı <span class="grad">canlı izle</span></h2>'+
    '<p style="color:rgba(255,255,255,.7);max-width:520px;margin:0 auto 20px">Tüm oturumlar HD kalitede canlı yayınlanır. Kaçıranlar için kayıt mevcut.</p>'+
    '<div class="live-video"></div>'+
    '<div style="margin-top:20px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+
    '<button class="sp-btn sp-btn--primary" onclick="alert(\'📧 Yayın hatırlatıcısı e-posta adresinize gönderilecek!\')">🔔 Yayın Hatırlatıcısı</button>'+
    '<button class="sp-btn sp-btn--ghost" style="background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.2)">📺 YouTube\'da İzle</button>'+
    '</div></div>';
  sched.parentNode.insertBefore(s,sched.nextSibling);
}

// ===== 4. SPONSOR BAŞVURU =====
function addSponsorApply(){
  var sp=$('#sponsors .container');
  if(!sp||$('.sponsor-apply'))return;
  var b=document.createElement('div');
  b.className='sponsor-apply';
  b.style.cssText='text-align:center;margin-top:40px';
  b.innerHTML='<button type="button" class="sp-btn sp-btn--primary" id="sponsorApplyBtn">🤝 Sponsor Olmak İster misiniz?</button>';
  sp.appendChild(b);
  b.querySelector('#sponsorApplyBtn').addEventListener('click',function(){
    var m=document.createElement('div');
    m.className='sp-modal active';
    m.innerHTML='<div class="sp-modal__box"><button class="sp-modal__close" type="button">✕</button>'+
      '<h3 class="sp-modal__title">🤝 Sponsor Başvurusu</h3>'+
      '<p class="sp-modal__sub">Size özel teklif için formu doldurun.</p>'+
      '<form style="display:flex;flex-direction:column;gap:14px">'+
      '<input type="text" placeholder="Şirket Adı" required style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--text);font-family:inherit;font-size:.9rem;outline:0">'+
      '<input type="email" placeholder="E-posta" required style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--text);font-family:inherit;font-size:.9rem;outline:0">'+
      '<select style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--text);font-family:inherit;font-size:.9rem;outline:0">'+
      '<option>Platin Sponsor</option><option>Altın Sponsor</option><option>Gümüş Sponsor</option><option>Diğer</option></select>'+
      '<textarea placeholder="Mesajınız" rows="3" style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px 14px;color:var(--text);font-family:inherit;font-size:.9rem;outline:0;resize:vertical"></textarea>'+
      '<button type="button" class="sp-btn sp-btn--primary" style="width:100%" onclick="alert(\'✅ Başvurunuz alındı! 2 iş günü içinde dönüş yapılacak.\');this.closest(\'.sp-modal\').remove()">Başvuruyu Gönder</button>'+
      '</form></div>';
    document.body.appendChild(m);
    m.querySelector('.sp-modal__close').addEventListener('click',function(){m.remove()});
    m.addEventListener('click',function(e){if(e.target===m)m.remove()});
  });
}

// ===== 5. KUPON SİSTEMİ =====
function addCouponSystem(){
  document.addEventListener('click',function(e){
    if(e.target.closest('.ticket-btn')){
      setTimeout(function(){
        var modal=$('#registerModal');
        if(!modal||$('.coupon-row'))return;
        var form=modal.querySelector('form');
        if(!form)return;
        var row=document.createElement('div');
        row.className='coupon-row';
        row.innerHTML='<input type="text" id="couponField" placeholder="Kupon kodu (ERKEN30)"><button type="button" class="sp-btn sp-btn--primary" id="applyCoupon">Uygula</button>';
        form.insertBefore(row,form.querySelector('button[type=submit]'));
        row.querySelector('#applyCoupon').addEventListener('click',function(){
          var c=row.querySelector('#couponField').value.trim().toUpperCase();
          var valid={ERKEN30:30,STUDENT50:50,TECHFEST:15,SPEAKER100:100};
          if(valid[c]){
            LS.set('coupon',{code:c,disc:valid[c]});
            alert('🎉 Kupon uygulandı! %'+valid[c]+' indirim.');
          }else alert('❌ Geçersiz kupon. Deneyin: ERKEN30, STUDENT50, TECHFEST, SPEAKER100');
        });
      },300);
    }
  });
}

// ===== 6. SOSYAL PAYLAŞ =====
function addSocialShare(){
  var cta=$('.cta__actions');
  if(!cta||$('.share-row'))return;
  var row=document.createElement('div');
  row.className='share-row';
  var url=encodeURIComponent(location.href);
  var text=encodeURIComponent('TechFest 2026 - Türkiye\'nin en büyük teknoloji konferansı!');
  row.innerHTML=
    '<a class="share-btn share-btn--tw" href="https://twitter.com/intent/tweet?text='+text+'&url='+url+'" target="_blank">𝕏 Twitter</a>'+
    '<a class="share-btn share-btn--wa" href="https://wa.me/?text='+text+'%20'+url+'" target="_blank">💬 WhatsApp</a>'+
    '<a class="share-btn share-btn--li" href="https://www.linkedin.com/sharing/share-offsite/?url='+url+'" target="_blank">💼 LinkedIn</a>'+
    '<button type="button" class="share-btn" id="copyLink">🔗 Kopyala</button>';
  cta.appendChild(row);
  row.querySelector('#copyLink').addEventListener('click',function(){
    navigator.clipboard.writeText(location.href).then(function(){
      alert('🔗 Link kopyalandı!');
    });
  });
}

// ===== 7. iCAL TAKVİM =====
function addIcalDownload(){
  var cta=$('.cta__actions');
  if(!cta||$('#icalBtn'))return;
  var b=document.createElement('button');
  b.id='icalBtn';
  b.className='sp-btn sp-btn--ghost';
  b.type='button';
  b.textContent='📅 iCal İndir';
  cta.appendChild(b);
  b.addEventListener('click',function(){
    var ical='BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TechFest//TR\nBEGIN:VEVENT\nUID:techfest2026@techfest.com\nDTSTAMP:20260101T000000Z\nDTSTART:20261115T100000Z\nDTEND:20261117T180000Z\nSUMMARY:TechFest 2026\nDESCRIPTION:Türkiye\'nin en büyük teknoloji konferansı\nLOCATION:İstanbul Kongre Merkezi\nEND:VEVENT\nEND:VCALENDAR';
    var blob=new Blob([ical],{type:'text/calendar'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='techfest-2026.ics';
    a.click();
  });
}

// ===== 8. KONUŞMACI FAVORİ =====
function addSpeakerFav(){
  setTimeout(function(){
    $$('.speaker').forEach(function(sp,i){
      if(sp.querySelector('.fav-star'))return;
      var b=document.createElement('button');
      b.className='fav-star';
      b.type='button';
      b.innerHTML='⭐';
      b.title='Favorilere ekle';
      var favs=LS.get('favSpeakers',[]);
      if(favs.indexOf(i)>=0)b.classList.add('active');
      b.addEventListener('click',function(e){
        e.stopPropagation();
        var f=LS.get('favSpeakers',[]);
        var idx=f.indexOf(i);
        if(idx>=0){f.splice(idx,1);b.classList.remove('active')}
        else{f.push(i);b.classList.add('active');}
        LS.set('favSpeakers',f);
      });
      sp.style.position='relative';
      sp.appendChild(b);
    });
  },800);
}

// ===== 9. KİŞİSEL PROGRAM =====
function addPersonalSchedule(){
  setTimeout(function(){
    $$('.sched-item').forEach(function(item,i){
      if(item.querySelector('.sched-check'))return;
      var b=document.createElement('span');
      b.className='sched-check';
      b.textContent='✓';
      b.title='Programa ekle';
      var key='sched_'+i;
      var my=LS.get('mySchedule',[]);
      if(my.indexOf(key)>=0)b.classList.add('active');
      b.addEventListener('click',function(e){
        e.stopPropagation();
        var m=LS.get('mySchedule',[]);
        var idx=m.indexOf(key);
        if(idx>=0){m.splice(idx,1);b.classList.remove('active')}
        else{m.push(key);b.classList.add('active');alert('✅ Programa eklendi!');}
        LS.set('mySchedule',m);
        updateScheduleBadge();
      });
      var timeCol=item.querySelector('.sched-time');
      if(timeCol)timeCol.parentNode.insertBefore(b,timeCol);
    });
    updateScheduleBadge();
  },900);

  // Badge
  var mb=document.createElement('button');
  mb.className='my-schedule-btn';
  mb.id='myScheduleBtn';
  mb.type='button';
  mb.innerHTML='📋<span class="my-schedule-btn__badge" id="schedBadge">0</span>';
  mb.title='Kişisel programım';
  document.body.appendChild(mb);
  mb.addEventListener('click',function(){
    var m=LS.get('mySchedule',[]);
    alert('📋 Kişisel programınızda '+m.length+' oturum var. '+(m.length===0?'Henüz hiçbir oturum eklemediniz.':''));
  });
}
function updateScheduleBadge(){
  var b=$('#schedBadge');
  if(b)b.textContent=LS.get('mySchedule',[]).length;
}

// ===== 10. LIVE TWEET AKIŞI =====
function addTweetFeed(){
  var live=$('.live-section');
  if(!live)return;
  var s=document.createElement('section');
  s.className='section';
  s.innerHTML='<div class="container"><div class="section__head"><span class="eyebrow">Sosyal</span><h2>Canlı <span class="grad">tweet akışı</span></h2><p class="section__lead">#TechFest2026 etiketiyle neler konuşuluyor?</p></div><div class="tweet-feed" id="tweetFeed"></div></div>';
  live.parentNode.insertBefore(s,live.nextSibling);
  var tweets=[
    {user:'Ahmet',handle:'@ahmetdev',text:'TechFest 2026 açılış konuşması muhteşemdi! #TechFest2026 🚀',likes:42},
    {user:'Selin',handle:'@selinux',text:'AI paneli tam da beklediğim gibi! Zeynep Kaya harika konuştu. #TechFest2026',likes:87},
    {user:'Burak',handle:'@burakk',text:'Blockchain oturumunda yeni bir şeyler öğrendim. Web3 gelecek! #TechFest2026',likes:31},
    {user:'Elif',handle:'@elifd',text:'Networking kokteyli süperdi! Yeni bağlantılar kurdum. #TechFest2026',likes:56}
  ];
  var idx=0;
  function addTweet(){
    if(idx>=tweets.length)idx=0;
    var t=tweets[idx++];
    var feed=$('#tweetFeed');
    if(!feed)return;
    var el=document.createElement('div');
    el.className='tweet';
    el.innerHTML='<div class="tweet__avatar">'+t.user[0]+'</div><div class="tweet__body"><div class="tweet__user">'+t.user+' <span>'+t.handle+'</span></div><div class="tweet__text">'+t.text+'</div><div class="tweet__meta"><span>❤️ '+t.likes+'</span><span>💬 '+(t.likes/4|0)+'</span><span>🔁 '+(t.likes/6|0)+'</span></div></div>';
    feed.insertBefore(el,feed.firstChild);
    if(feed.children.length>4)feed.removeChild(feed.lastChild);
  }
  for(var i=0;i<3;i++)addTweet();
  setInterval(addTweet,4000);
}

// ===== 11. KATILIMCI PROFİLİ =====
function addProfileWidget(){
  var btn=document.createElement('button');
  btn.className='fab';
  btn.style.bottom='230px';
  btn.type='button';
  btn.innerHTML='👤';
  btn.title='Profilim';
  document.body.appendChild(btn);

  var w=document.createElement('div');
  w.className='profile-widget';
  w.id='profileWidget';
  w.innerHTML='<div class="profile-widget__header"><strong class="profile-widget__name">👤 Katılımcı Profili</strong><button type="button" class="sp-modal__close" style="position:static;width:26px;height:26px;font-size:.8rem" id="profClose">✕</button></div>'+
    '<div style="margin-bottom:14px"><input type="text" id="profName" placeholder="Adınız" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:10px 12px;color:var(--text);font-family:inherit;font-size:.85rem;outline:0;margin-bottom:8px">'+
    '<input type="text" id="profCompany" placeholder="Şirket / Rol" style="width:100%;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:10px 12px;color:var(--text);font-family:inherit;font-size:.85rem;outline:0"></div>'+
    '<div class="profile-widget__stats"><div class="profile-widget__stat"><strong id="statFav">0</strong><span>Favori</span></div><div class="profile-widget__stat"><strong id="statSched">0</strong><span>Oturum</span></div></div>'+
    '<button type="button" class="sp-btn sp-btn--primary" style="width:100%" id="profSave">💾 Kaydet</button>';
  document.body.appendChild(w);

  btn.addEventListener('click',function(){
    w.classList.toggle('open');
    var p=LS.get('profile',{});
    if($('#profName'))$('#profName').value=p.name||'';
    if($('#profCompany'))$('#profCompany').value=p.company||'';
    if($('#statFav'))$('#statFav').textContent=LS.get('favSpeakers',[]).length;
    if($('#statSched'))$('#statSched').textContent=LS.get('mySchedule',[]).length;
  });
  if($('#profClose'))$('#profClose').addEventListener('click',function(){w.classList.remove('open')});
  if($('#profSave'))$('#profSave').addEventListener('click',function(){
    LS.set('profile',{name:$('#profName').value,company:$('#profCompany').value});
    alert('✅ Profil kaydedildi!');
    w.classList.remove('open');
  });
}

// ===== 12. AI NETWORKING =====
function addAINetworking(){
  var venue=$('#venue');
  if(!venue||$('.ai-network'))return;
  var s=document.createElement('section');
  s.className='section section--alt ai-network';
  s.innerHTML='<div class="container"><div class="section__head"><span class="eyebrow">🤖 AI Öneri</span><h2>Sizin için <span class="grad">eşleşmeler</span></h2><p class="section__lead">Konferansta tanışmanız gereken kişiler (yapay zeka destekli)</p></div><div id="networkList" style="max-width:520px;margin:0 auto"></div></div>';
  venue.parentNode.insertBefore(s,venue.nextSibling);
  var matches=[
    {name:'Ali Veli',role:'Full Stack Developer · Startup',match:95},
    {name:'Deniz Yıldız',role:'Product Manager · E-ticaret',match:88},
    {name:'Ceren Ak',role:'Data Analyst · Fintech',match:82}
  ];
  var list=$('#networkList');
  if(list){
    list.innerHTML=matches.map(function(m){
      return '<div class="network-card"><div class="network-card__avatar">'+m.name[0]+'</div><div class="network-card__info"><div class="network-card__name">'+m.name+'</div><div class="network-card__role">'+m.role+'</div></div><div class="network-card__match">'+m.match+'%</div></div>';
    }).join('');
  }
}

// ===== 13. FOTOĞRAF YÜKLEME =====
function addPhotoUpload(){
  var gal=$('#gallery .container');
  if(!gal||$('.upload-zone'))return;
  var w=document.createElement('div');
  w.style.marginTop='32px';
  w.innerHTML='<div class="upload-zone" id="uploadZone"><div class="upload-zone__icon">📸</div><div class="upload-zone__text">Etkinlik fotoğraflarınızı buraya sürükleyin ya da tıklayın</div></div><div class="upload-preview" id="uploadPreview"></div>';
  gal.appendChild(w);
  var zone=$('#uploadZone');
  var preview=$('#uploadPreview');
  if(!zone)return;
  zone.addEventListener('click',function(){
    var inp=document.createElement('input');
    inp.type='file';
    inp.accept='image/*';
    inp.multiple=true;
    inp.addEventListener('change',function(e){
      Array.from(e.target.files).forEach(loadImg);
    });
    inp.click();
  });
  zone.addEventListener('dragover',function(e){e.preventDefault();zone.classList.add('dragover')});
  zone.addEventListener('dragleave',function(){zone.classList.remove('dragover')});
  zone.addEventListener('drop',function(e){
    e.preventDefault();zone.classList.remove('dragover');
    Array.from(e.dataTransfer.files).forEach(loadImg);
  });
  function loadImg(file){
    if(!file.type.startsWith('image/'))return;
    var r=new FileReader();
    r.onload=function(ev){
      var img=document.createElement('img');
      img.src=ev.target.result;
      preview.appendChild(img);
    };
    r.readAsDataURL(file);
  }
}

// ===== 14. CANLI ANKET =====
function addPol
