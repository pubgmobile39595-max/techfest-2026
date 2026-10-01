/* ========== TECHFEST 2026 ========== */
(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};

// ========== VERİ ==========
var speakers=[
  {name:'Dr. Ayşe Yılmaz',role:'AI Araştırmacısı · Google',img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'},
  {name:'Mehmet Demir',role:'CTO · Trendyol',img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'},
  {name:'Zeynep Kaya',role:'Founder · AI Startup',img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'},
  {name:'Can Öztürk',role:'Blockchain Uzmanı',img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'},
  {name:'Selin Arslan',role:'UX Direktörü · Meta',img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'},
  {name:'Emre Şahin',role:'Siber Güvenlik · Microsoft',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'},
  {name:'Deniz Ak',role:'Cloud Mimarı · AWS',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'},
  {name:'Merve Yıldız',role:'Veri Bilimci · Netflix',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'}
];

var schedule={
  1:[
    {time:'09:00',title:'Kayıt & Kahvaltı',speaker:'Tüm katılımcılar',tag:'Networking'},
    {time:'10:00',title:'Açılış Konuşması: Geleceğe Bakış',speaker:'Dr. Ayşe Yılmaz',tag:'Keynote'},
    {time:'11:30',title:'AI Çağında Yazılım Geliştirme',speaker:'Zeynep Kaya',tag:'AI'},
    {time:'13:00',title:'Öğle Yemeği',speaker:'—',tag:'Break'},
    {time:'14:00',title:'Blockchain ve Web3',speaker:'Can Öztürk',tag:'Blockchain'},
    {time:'15:30',title:'Siber Güvenlik Panel',speaker:'Emre Şahin',tag:'Security'},
    {time:'17:00',title:'Networking Kokteyl',speaker:'Tüm konuşmacılar',tag:'Networking'}
  ],
  2:[
    {time:'09:30',title:'Kahvaltı & Networking',speaker:'—',tag:'Networking'},
    {time:'10:00',title:'Bulut Bilişimde Yenilikler',speaker:'Deniz Ak',tag:'Cloud'},
    {time:'11:30',title:'Kullanıcı Deneyimi Tasarımı',speaker:'Selin Arslan',tag:'UX'},
    {time:'13:00',title:'Öğle Yemeği',speaker:'—',tag:'Break'},
    {time:'14:00',title:'Veri Bilimi Workshop',speaker:'Merve Yıldız',tag:'Data'},
    {time:'16:00',title:'Girişimcilik Panel',speaker:'Mehmet Demir',tag:'Startup'},
    {time:'18:00',title:'Gala Yemeği',speaker:'VIP katılımcılar',tag:'VIP'}
  ],
  3:[
    {time:'10:00',title:'Kahvaltı & Networking',speaker:'—',tag:'Networking'},
    {time:'10:30',title:'Kariyer Gelişimi',speaker:'Ayşe Yılmaz & Zeynep Kaya',tag:'Career'},
    {time:'12:00',title:'Geleceğin Teknolojileri',speaker:'Tüm konuşmacılar',tag:'Panel'},
    {time:'13:30',title:'Kapanış & Ödül Töreni',speaker:'Organizasyon',tag:'Closing'},
    {time:'15:00',title:'Vedalaşma',speaker:'—',tag:'Farewell'}
  ]
};

var testimonials=[
  {name:'Ali Veli',role:'Yazılım Mühendisi',stars:5,text:'Hayatımda katıldığım en iyi konferans! Networking fırsatları harika.'},
  {name:'Fatma K.',role:'Product Manager',stars:5,text:'Konuşmacılar dünya standartında. Gelecek yıl kesinlikle yine geleceğim.'},
  {name:'Hasan Y.',role:'CTO',stars:4,text:'Organizasyon mükemmeldi. Tek eksik biraz daha fazla workshop olabilirdi.'},
  {name:'Elif D.',role:'Data Scientist',stars:5,text:'Kariyerimde dönüm noktası oldu. Buradan iş teklifi aldım!'},
  {name:'Murat A.',role:'Founder',stars:5,text:'Yatırımcılarla tanışma fırsatı buldum. Startup\'ıma büyük katkı sağladı.'},
  {name:'Seda T.',role:'UX Designer',stars:4,text:'Çok iyi organize edilmiş. Yemekler de lezzetliydi 😄'}
];

// ========== BAŞLAT ==========
window.addEventListener('load',function(){
  // Konuşmacılar
  var sg=$('#speakersGrid');
  if(sg){
    sg.innerHTML=speakers.map(function(s){
      return '<div class="speaker"><div class="speaker__img" style="background-image:url('+s.img+')"></div><div class="speaker__body"><div class="speaker__name">'+s.name+'</div><div class="speaker__role">'+s.role+'</div></div></div>';
    }).join('');
  }
  // Program
  renderSchedule(1);
  // Galeri
  var gg=$('#galleryGrid');
  if(gg){
    gg.innerHTML=[1,2,3,4,5,6,7,8].map(function(i){
      return '<div class="gallery__item" style="background-image:url(https://picsum.photos/400?random='+(i+50)+')"></div>';
    }).join('');
  }
  // Yorumlar
  var tg=$('#testimonialsGrid');
  if(tg){
    tg.innerHTML=testimonials.map(function(t){
      var initials=t.name.split(' ').map(function(w){return w[0]}).join('');
      return '<div class="testimonial"><div class="testimonial__stars">'+'★'.repeat(t.stars)+'</div><div class="testimonial__text">"'+t.text+'"</div><div class="testimonial__author"><div class="testimonial__avatar">'+initials+'</div><div><div class="testimonial__name">'+t.name+'</div><div class="testimonial__role">'+t.role+'</div></div></div></div>';
    }).join('');
  }
  updateCountdown();
  setInterval(updateCountdown,1000);
  startLiveCounter();
  initChat();
  initTheme();
  initRegister();
  initNav();
  console.log('🚀 TechFest 2026 hazır!');
});

// ========== SCHEDULE ==========
function renderSchedule(day){
  var sg=$('#scheduleGrid');
  if(!sg)return;
  var items=schedule[day]||[];
  sg.innerHTML=items.map(function(s){
    return '<div class="sched-item"><div class="sched-time">'+s.time+'</div><div><div class="sched-title">'+s.title+'</div><div class="sched-speaker">'+s.speaker+'</div></div><div class="sched-tag">'+s.tag+'</div></div>';
  }).join('');
}
$$('.tab-btn').forEach(function(b){
  b.addEventListener('click',function(){
    $$('.tab-btn').forEach(function(x){x.classList.remove('active')});
    b.classList.add('active');
    renderSchedule(parseInt(b.dataset.day));
  });
});

// ========== COUNTDOWN ==========
var eventDate=new Date('2026-11-15T10:00:00').getTime();
function updateCountdown(){
  var diff=eventDate-Date.now();
  if(diff<0)diff=0;
  var d=Math.floor(diff/86400000);
  var h=Math.floor((diff%86400000)/3600000);
  var m=Math.floor((diff%3600000)/60000);
  var s=Math.floor((diff%60000)/1000);
  var pad=function(n){return String(n).padStart(2,'0')};
  var e;
  if(e=$('#cdDays'))e.textContent=pad(d);
  if(e=$('#cdHours'))e.textContent=pad(h);
  if(e=$('#cdMinutes'))e.textContent=pad(m);
  if(e=$('#cdSeconds'))e.textContent=pad(s);
}

// ========== LIVE COUNTER ==========
function startLiveCounter(){
  var base=3847;
  var lc=$('#liveCount'),sl=$('#spotsLeft');
  if(!lc)return;
  setInterval(function(){
    if(Math.random()>0.7){
      base+=Math.floor(Math.random()*3)+1;
      if(lc)lc.textContent=base.toLocaleString('tr-TR');
      if(sl)sl.textContent=Math.max(0,5000-base);
    }
  },5000);
}

// ========== TEMA ==========
function initTheme(){
  var btn=$('#themeBtn');
  if(!btn)return;
  var saved=localStorage.getItem('tf_theme')||'dark';
  document.documentElement.setAttribute('data-theme',saved);
  btn.textContent=saved==='dark'?'☀️':'🌙';
  btn.addEventListener('click',function(){
    var next=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    localStorage.setItem('tf_theme',next);
    btn.textContent=next==='dark'?'☀️':'🌙';
  });
}

// ========== KAYIT MODAL ==========
function initRegister(){
  var modal=$('#registerModal');
  var close=$('#registerClose');
  var form=$('#registerForm');
  var status=$('#registerStatus');

  function open(ticket){
    if(!modal)return;
    if(ticket){
      var ti=$('#ticketType');
      if(ti)ti.value=ticket;
      var sub=$('#registerSub');
      if(sub)sub.textContent=ticket+' paketi · TechFest 2026';
    }
    modal.classList.add('active');
  }
  function closeModal(){if(modal)modal.classList.remove('active')}

  var rb=$('#registerBtn'),hr=$('#heroRegister'),cr=$('#ctaRegister');
  if(rb)rb.addEventListener('click',function(){open('')});
  if(hr)hr.addEventListener('click',function(){open('')});
  if(cr)cr.addEventListener('click',function(){open('')});
  if(close)close.addEventListener('click',closeModal);
  if(modal)modal.addEventListener('click',function(e){if(e.target===modal)closeModal()});

  $$('.ticket-btn').forEach(function(b){
    b.addEventListener('click',function(){open(b.dataset.ticket)});
  });

  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=form.querySelector('button[type=submit]');
      var data=new FormData(form);
      status.textContent='⏳ Gönderiliyor...';
      status.style.color='var(--text-dim)';
      btn.disabled=true;
      fetch(form.action,{method:'POST',body:data,headers:{'Accept':'application/json'}})
        .then(function(r){
          if(r.ok){
            status.textContent='✅ Kaydınız alındı! E-posta ile bilet gönderilecek.';
            status.style.color='var(--green)';
            form.reset();
            setTimeout(closeModal,2500);
          }else{
            status.textContent='❌ Hata oluştu, tekrar deneyin.';
            status.style.color='var(--red)';
          }
        }).catch(function(){
          status.textContent='❌ Bağlantı hatası.';
          status.style.color='var(--red)';
        }).finally(function(){btn.disabled=false});
    });
  }
}

// ========== NAV ==========
function initNav(){
  // Newsletter
  var nf=$('#newsletterForm');
  if(nf){
    nf.addEventListener('submit',function(e){
      e.preventDefault();
      toast('✅ Newsletter kaydınız alındı!');
      nf.reset();
    });
  }
  // Takvim
  var ab=$('#addCalendarBtn');
  if(ab){
    ab.addEventListener('click',function(){
      var title=encodeURIComponent('TechFest 2026');
      var details=encodeURIComponent('Türkiye\'nin en büyük teknoloji konferansı');
      var location=encodeURIComponent('İstanbul Kongre Merkezi');
      var dates='20261115T100000/20261117T180000';
      window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text='+title+'&dates='+dates+'&details='+details+'&location='+location,'_blank');
    });
  }
  // Yukarı
  var tb=$('#fabTop');
  if(tb){
    tb.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
    window.addEventListener('scroll',function(){
      tb.classList.toggle('show',window.scrollY>500);
    });
  }
  // Konuşmacı tıklama
  document.addEventListener('click',function(e){
    var sp=e.target.closest('.speaker');
    if(sp){
      var name=sp.querySelector('.speaker__name').textContent;
      toast('👤 '+name+' hakkında detay yakında!');
    }
  });
}

// ========== CHAT ==========
function initChat(){
  var fab=$('#fabChat');
  var box=$('#chatBox');
  var close=$('#chatClose');
  var input=$('#chatInput');
  var send=$('#chatSend');
  var body=$('#chatBody');
  if(!fab||!box)return;

  var replies=[
    'Bilet fiyatları hakkında detaylı bilgi için Biletler bölümüne bakabilirsiniz.',
    'Konferans 15-17 Kasım 2026 tarihlerinde İstanbul Kongre Merkezi\'nde.',
    'Öğrenci indirimi %50, kayıt sırasında belirtmeniz yeterli.',
    'Online katılım için ayrı bilet seçeneği mevcut.',
    'İade politikası: etkinlikten 7 gün öncesine kadar tam iade.',
    'Konaklama için anlaşmalı otellerimiz var, kayıt sonrası bilgilendirme yapılır.',
    'VIP pakette konuşmacılarla meet & greet fırsatı var.'
  ];

  function addMsg(text,isUser){
    var m=document.createElement('div');
    m.className='chat-msg chat-msg--'+(isUser?'user':'bot');
    m.textContent=text;
    body.appendChild(m);
    body.scrollTop=body.scrollHeight;
  }
  function doSend(){
    var v=input.value.trim();
    if(!v)return;
    addMsg(v,true);
    input.value='';
    setTimeout(function(){
      addMsg(replies[Math.floor(Math.random()*replies.length)],false);
    },700);
  }

  fab.addEventListener('click',function(){
    box.classList.toggle('open');
    if(box.classList.contains('open'))input.focus();
  });
  if(close)close.addEventListener('click',function(){box.classList.remove('open')});
  if(send)send.addEventListener('click',doSend);
  if(input)input.addEventListener('keypress',function(e){if(e.key==='Enter')doSend()});
}

// ========== TOAST ==========
function toast(msg){
  var el=$('#toast');
  if(!el)return;
  el.textContent=msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t=setTimeout(function(){el.classList.remove('show')},2500);
}

})();
