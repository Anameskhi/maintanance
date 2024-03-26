fetch('./maintanance.json')
    .then(response => response.json())
    .then(data => {
        const svgs = data.svgs;

        const computerFrameUrl = svgs.computerFrame;
        const crocoLogoUrl = svgs.crocoLogo;
        const titleUrl = svgs.title;
        const chatUrl = svgs.chat;
        const phoneUrl = svgs.phone;
        const titleEnUrl = svgs.titleEn
        const titleKaUrl = svgs.titleKa
        const geoLogoUrl = svgs.geoLogo
        const enLogoUrl = svgs.enLogo
        const lineUrl = svgs.line

        const computerFrameImg = document.getElementById('computer-frame');
        const crocoLogoImg = document.getElementById('croco-logo');
        const titleEn = document.getElementById('title-en');
        const titleKa = document.getElementById('title-ka')
        const chatImg = document.getElementById('chat')
        const phoneImg = document.getElementById('phone')
        const geoLogo = document.getElementById('geo-logo')
        const enLogo = document.getElementById('en-logo')
        const lineEn = document.getElementById('line-en')
        const lineGeo = document.getElementById('line-geo')

        crocoLogoImg.src = crocoLogoUrl
        computerFrameImg.src = computerFrameUrl;
        chatImg.src = chatUrl
        phoneImg.src = phoneUrl
        geoLogo.src = geoLogoUrl
        enLogo.src = enLogoUrl
        lineEn.src = lineUrl
        lineGeo.src = lineUrl

        titleEn.innerHTML = titleEnUrl
        const titleEnText = titleEn.innerHTML;
        const greenTitleEnText = titleEnText.replace(/12:00/, '<span style="color: #15AF44;">12:00</span>');
        titleEn.innerHTML = greenTitleEnText;

        titleKa.innerHTML = titleKaUrl
        const titleGeoText = titleKa.innerHTML;
        const greenTitleGeoText = titleGeoText.replace(/12:00 საათზე/, '<span style="color: #15AF44;">12:00 საათზე</span>');
        titleKa.innerHTML = greenTitleGeoText
    })
    .catch(error => console.error('Error fetching JSON:', error));
function handlePhoneClick() {
    window.open('tel: 0322597777', '_blank')
}



function initLiveCaller(lang) {
    const liveCallerDiv = document.querySelectorAll('div[data-livecaller]');
    if (liveCallerDiv.length > 0) {
      liveCallerDiv.forEach((item) => {
        item.remove();
      });
    }
  
    (function (w, t, c, p, s, e, l, k) {
      p = new Promise(function (r) {
        w[c] = {
          client: function () {
            return p;
          }
        };
        l = document.createElement('div');
        l.setAttribute('id', 'live-caller-widget');
        s = document.createElement(t);
        s.async = 1;
        s.setAttribute('data-livecaller', 'script');
        k = document.body || document.documentElement;
        k?.insertBefore(l, k?.firstChild);
        l.setAttribute('data-livecaller', 'mount-el');
        s.src = 'https://cdn.livecaller.io/js/app.js';
        e = document.getElementsByTagName(t)[0];
        e
          ? e?.parentNode?.insertBefore(s, e)
          : k?.insertBefore(s, l?.nextSibling);
        s.onload = function () {
          r(w[c]);
        };
      });
      return p;
    })(window, 'script', 'LiveCaller').then(function () {
      const liveCaller = window['LiveCaller'];
      try {
        liveCaller.config.merge({
          widget: { id: 'e6b7026a-2d6e-47cd-a56f-b37f348f859f' },
          app: { locale: lang }
        });
        let globalVm = '';
        liveCaller.$on('session.ready', (vm) => {
          globalVm = vm;
        });
  
        liveCaller.$on('analytics.click', (analytics) => {
          if (analytics.target === 'chat-button') {
            const department = globalVm['widget'].departments.find(
              (department) => {
                return department.display_name.toLowerCase() === 'support';
              }
            );
            setTimeout(() => {
              globalVm['$router']
                .push({ name: 'chat', params: { department: department.id } })
                .catch((e) => {
                  console.log(e);
                });
            });
          }
        });
        liveCaller.liftOff();
      } catch (e) {
        console.log(e);
      }
    });
  }
  initLiveCaller('en');
  //en ka ru
  function toggleChat() {
    window['LiveCaller']?.$emit?.('ui.widget.toggle');
  }
