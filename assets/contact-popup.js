(function () {
  const translations = {
    he: {
      title: 'צור קשר',
      subtitle: 'אשמח לעמוד לשירותך',
      name: 'שם מלא',
      email: 'דוא״ל',
      phone: 'טלפון',
      urgency: 'רמת דחיפות',
      urgencyOptions: [
        { value: 'normal', label: 'רגיל' },
        { value: 'urgent', label: 'דחוף' },
        { value: 'very-urgent', label: 'דחוף מאוד' },
      ],
      message: 'הודעה',
      send: 'שלח',
      sending: 'שולח...',
      successMsg: 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.',
      errorMsg: 'שגיאה בשליחה. נסה שוב או צור קשר ישירות.',
      moreContact: 'דרכי התקשרות נוספות',
      mobile: 'נייד',
      office: 'משרד',
      whatsapp: 'שלח הודעה בוואטסאפ',
      whatsappSub: 'WhatsApp',
      location: 'מיקום',
      locationText: 'נתניה / הרצליה',
      hours: 'שעות פתיחה: א׳-ה׳ 9:00-18:00',
      dir: 'rtl',
    },
    en: {
      title: 'Contact Us',
      subtitle: "We'd be happy to assist you",
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      urgency: 'Urgency Level',
      urgencyOptions: [
        { value: 'normal', label: 'Normal' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'very-urgent', label: 'Very Urgent' },
      ],
      message: 'Message',
      send: 'Send',
      sending: 'Sending...',
      successMsg: 'Message sent successfully! We will get back to you shortly.',
      errorMsg: 'Error sending. Please try again or contact us directly.',
      moreContact: 'Additional Contact Methods',
      mobile: 'Mobile',
      office: 'Office',
      whatsapp: 'Send a WhatsApp Message',
      whatsappSub: 'WhatsApp',
      location: 'Location',
      locationText: 'Netanya / Herzliya',
      hours: 'Hours: Sun–Thu 9:00–18:00',
      dir: 'ltr',
    },
    fr: {
      title: 'Contactez-nous',
      subtitle: 'Nous serons heureux de vous aider',
      name: 'Nom complet',
      email: 'E-mail',
      phone: 'Téléphone',
      urgency: "Niveau d'urgence",
      urgencyOptions: [
        { value: 'normal', label: 'Normal' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'very-urgent', label: 'Très urgent' },
      ],
      message: 'Message',
      send: 'Envoyer',
      sending: 'Envoi...',
      successMsg: 'Message envoyé avec succès ! Nous vous répondrons bientôt.',
      errorMsg: "Erreur d'envoi. Veuillez réessayer ou nous contacter directement.",
      moreContact: 'Autres moyens de contact',
      mobile: 'Mobile',
      office: 'Bureau',
      whatsapp: 'Envoyer un message WhatsApp',
      whatsappSub: 'WhatsApp',
      location: 'Localisation',
      locationText: 'Netanya / Herzliya',
      hours: 'Horaires : Dim–Jeu 9h00–18h00',
      dir: 'ltr',
    },
  };

  function getLang() {
    var lang = document.documentElement.lang || 'he';
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('en')) return 'en';
    return 'he';
  }

  function injectStyles() {
    if (document.getElementById('contact-popup-styles')) return;
    var style = document.createElement('style');
    style.id = 'contact-popup-styles';
    style.textContent = [
      '#contact-popup-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9998;display:none;align-items:center;justify-content:center;padding:1rem}',
      '#contact-popup-overlay.open{display:flex}',
      '#contact-popup-box{background:#fff;border-radius:.75rem;box-shadow:0 20px 60px rgba(0,0,0,.25);width:100%;max-width:52rem;max-height:90vh;overflow-y:auto;position:relative}',
      '#contact-popup-close{position:absolute;top:.75rem;inset-inline-end:.75rem;background:transparent;border:none;cursor:pointer;padding:.375rem;border-radius:.375rem;color:#6b7280;line-height:1;font-size:1.25rem}',
      '#contact-popup-close:hover{background:#f3f4f6;color:#111}',
      '#contact-popup-inner{padding:2rem}',
      '.cp-header{margin-bottom:1.5rem}',
      '.cp-divider{width:3.5rem;height:.2rem;background:hsl(var(--accent,38 92% 50%));border-radius:2px;margin-bottom:1rem}',
      '.cp-title{font-size:1.75rem;font-weight:700;color:hsl(var(--primary,215 75% 16%));margin:0 0 .25rem}',
      '.cp-subtitle{color:#6b7280;margin:0}',
      '.cp-grid{display:grid;gap:1.5rem}',
      '@media(min-width:640px){.cp-grid{grid-template-columns:1fr 1fr}}',
      '.cp-form .cp-field{margin-bottom:1rem}',
      '.cp-form label{display:block;font-size:.875rem;font-weight:500;margin-bottom:.375rem;color:#374151}',
      '.cp-form input,.cp-form select,.cp-form textarea{width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.375rem;font-size:.9375rem;font-family:inherit;box-sizing:border-box;transition:border-color .15s}',
      '.cp-form input:focus,.cp-form select:focus,.cp-form textarea:focus{outline:none;border-color:hsl(var(--accent,38 92% 50%))}',
      '.cp-form textarea{resize:vertical}',
      '.cp-btn{width:100%;padding:.75rem 1rem;background:hsl(var(--accent,38 92% 50%));color:#fff;border:none;border-radius:.375rem;font-size:1rem;font-weight:500;cursor:pointer;font-family:inherit;transition:opacity .15s}',
      '.cp-btn:hover{opacity:.88}',
      '.cp-btn:disabled{opacity:.6;cursor:not-allowed}',
      '.cp-msg{margin-top:.75rem;padding:.625rem .875rem;border-radius:.375rem;font-size:.875rem}',
      '.cp-msg.success{background:#f0fdf4;color:#166534;border:1px solid #bbf7d0}',
      '.cp-msg.error{background:#fef2f2;color:#991b1b;border:1px solid #fecaca}',
      '.cp-info-card{background:#f9fafb;border:1px solid #e5e7eb;border-radius:.5rem;padding:1.25rem}',
      '.cp-info-card h3{font-size:1rem;font-weight:600;color:hsl(var(--primary,215 75% 16%));margin:0 0 1rem}',
      '.cp-contact-item{display:flex;align-items:center;gap:.75rem;padding:.75rem;background:#fff;border-radius:.375rem;border:1px solid #e5e7eb;margin-bottom:.625rem;text-decoration:none;color:inherit;transition:background .15s}',
      '.cp-contact-item:hover{background:#f3f4f6}',
      '.cp-contact-item.whatsapp{background:#25D366;color:#fff;border-color:#25D366}',
      '.cp-contact-item.whatsapp:hover{background:#20BA5A}',
      '.cp-contact-icon{width:2.25rem;height:2.25rem;border-radius:.375rem;display:flex;align-items:center;justify-content:center;background:#f3f4f6;flex-shrink:0}',
      '.cp-contact-item.whatsapp .cp-contact-icon{background:rgba(255,255,255,.2)}',
      '.cp-contact-label{font-weight:500;font-size:.9375rem}',
      '.cp-contact-sub{font-size:.75rem;opacity:.7}',
      '.cp-location{margin-top:.625rem;padding:.875rem;background:#f9fafb;border-radius:.375rem;border:1px solid #e5e7eb}',
      '.cp-location h3{font-size:.9375rem;font-weight:600;color:hsl(var(--primary,215 75% 16%));margin:0 0 .375rem}',
      '.cp-location p{font-size:.875rem;color:#6b7280;margin:.25rem 0 0}',
    ].join('');
    document.head.appendChild(style);
  }

  function buildPopup(t) {
    var isRtl = t.dir === 'rtl';
    var textAlign = isRtl ? 'right' : 'left';

    var urgencyOpts = t.urgencyOptions.map(function (o) {
      return '<option value="' + o.value + '">' + o.label + '</option>';
    }).join('');

    var html = [
      '<div id="contact-popup-overlay" role="dialog" aria-modal="true" aria-label="' + t.title + '">',
      '  <div id="contact-popup-box" dir="' + t.dir + '" style="text-align:' + textAlign + '">',
      '    <button id="contact-popup-close" aria-label="Close">&#x2715;</button>',
      '    <div id="contact-popup-inner">',
      '      <div class="cp-header">',
      '        <div class="cp-divider"></div>',
      '        <h2 class="cp-title">' + t.title + '</h2>',
      '        <p class="cp-subtitle">' + t.subtitle + '</p>',
      '      </div>',
      '      <div class="cp-grid">',
      '        <form class="cp-form" id="cp-form" novalidate>',
      '          <div class="cp-field"><label for="cp-name">' + t.name + '</label><input id="cp-name" name="name" required dir="' + t.dir + '" /></div>',
      '          <div class="cp-field"><label for="cp-email">' + t.email + '</label><input id="cp-email" name="email" type="email" required dir="ltr" /></div>',
      '          <div class="cp-field"><label for="cp-phone">' + t.phone + '</label><input id="cp-phone" name="phone" type="tel" dir="ltr" /></div>',
      '          <div class="cp-field"><label for="cp-urgency">' + t.urgency + '</label><select id="cp-urgency" name="urgency">' + urgencyOpts + '</select></div>',
      '          <div class="cp-field"><label for="cp-message">' + t.message + '</label><textarea id="cp-message" name="message" rows="5" required dir="' + t.dir + '"></textarea></div>',
      '          <button type="submit" class="cp-btn" id="cp-submit">' + t.send + '</button>',
      '          <div id="cp-result"></div>',
      '        </form>',
      '        <div>',
      '          <div class="cp-info-card">',
      '            <h3>' + t.moreContact + '</h3>',
      '            <a href="tel:+972546333231" class="cp-contact-item" dir="ltr">',
      '              <div class="cp-contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>',
      '              <div><div class="cp-contact-label">054-633-3231</div><div class="cp-contact-sub">' + t.mobile + '</div></div>',
      '            </a>',
      '            <a href="tel:+972737321114" class="cp-contact-item" dir="ltr">',
      '              <div class="cp-contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>',
      '              <div><div class="cp-contact-label">073-732-1114</div><div class="cp-contact-sub">' + t.office + '</div></div>',
      '            </a>',
      '            <a href="https://wa.me/972546333231" target="_blank" rel="noopener noreferrer" class="cp-contact-item whatsapp">',
      '              <div class="cp-contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>',
      '              <div><div class="cp-contact-label">' + t.whatsapp + '</div><div class="cp-contact-sub">' + t.whatsappSub + '</div></div>',
      '            </a>',
      '          </div>',
      '          <div class="cp-location">',
      '            <h3>' + t.location + '</h3>',
      '            <p>' + t.locationText + '</p>',
      '            <p>' + t.hours + '</p>',
      '          </div>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('');

    var container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container.firstChild);

    var overlay = document.getElementById('contact-popup-overlay');
    var closeBtn = document.getElementById('contact-popup-close');
    var form = document.getElementById('cp-form');
    var submitBtn = document.getElementById('cp-submit');
    var result = document.getElementById('cp-result');

    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopup();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cp-name').value.trim();
      var email = document.getElementById('cp-email').value.trim();
      var message = document.getElementById('cp-message').value.trim();
      if (!name || !email || !message) return;

      submitBtn.disabled = true;
      submitBtn.textContent = t.sending;
      result.innerHTML = '';

      var formData = new FormData(form);
      fetch('https://formspree.io/f/xpwzokpv', { method: 'POST', body: formData, headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (res.ok) {
            result.innerHTML = '<div class="cp-msg success">' + t.successMsg + '</div>';
            form.reset();
          } else {
            result.innerHTML = '<div class="cp-msg error">' + t.errorMsg + '</div>';
          }
        })
        .catch(function () {
          result.innerHTML = '<div class="cp-msg error">' + t.errorMsg + '</div>';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = t.send;
        });
    });
  }

  function closePopup() {
    var overlay = document.getElementById('contact-popup-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  window.openContactPopup = function () {
    var overlay = document.getElementById('contact-popup-overlay');
    if (!overlay) {
      injectStyles();
      buildPopup(translations[getLang()]);
      overlay = document.getElementById('contact-popup-overlay');
    }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
})();
