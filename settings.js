<script>
  // مفاتيح التخزين
  const KEY = 'siteSettings:v1';

  // قيم افتراضية
  const DEFAULTS = {
    primary: '#ff6f00',
    font: 'system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif',
    mode: 'dark',                     // 'dark' أو 'light'
    videoEnabled: false,
    videoUrl: ''                      // مثال: banner.mp4
  };

  // جلب الإعدادات
  function getSettings(){
    try{
      const raw = localStorage.getItem(KEY);
      return raw ? {...DEFAULTS, ...JSON.parse(raw)} : {...DEFAULTS};
    }catch(e){ return {...DEFAULTS}; }
  }

  // حفظ الإعدادات
  function saveSettings(s){ localStorage.setItem(KEY, JSON.stringify(s)); }

  // تطبيق الإعدادات على الصفحة
  function applySettings(){
    const s = getSettings();

    // متغيرات CSS
    document.documentElement.style.setProperty('--primary', s.primary);
    document.documentElement.style.setProperty('--font', s.font);

    // الوضع
    if(s.mode === 'light'){
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }else{
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    // فيديو الخلفية
    const bgWrap = document.querySelector('[data-bg-video]');
    if(bgWrap){
      bgWrap.innerHTML = '';
      if(s.videoEnabled && s.videoUrl){
        const v = document.createElement('video');
        v.setAttribute('autoplay','');
        v.setAttribute('muted','');
        v.setAttribute('loop','');
        v.setAttribute('playsinline','');
        v.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
        const src = document.createElement('source');
        src.src = s.videoUrl;
        src.type = 'video/mp4';
        v.appendChild(src);
        bgWrap.appendChild(v);
      }
    }
  }

  // export بسيط للاستخدام في admin
  window.SiteSettings = { getSettings, saveSettings, applySettings, DEFAULTS };
</script>
