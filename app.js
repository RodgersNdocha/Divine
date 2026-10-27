// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

// Gallery lightbox (Our Work page)
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');

  document.querySelectorAll('#gallery a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      lightboxImg.src = link.href;
      lightboxImg.alt = link.querySelector('img').alt;
      lightbox.hidden = false;
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) lightbox.hidden = true;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.hidden = true;
  });
}

// Quote form -> WhatsApp (Contact page)
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(quoteForm);
    const lines = [
      'Hello Divine Budget Entertainment, I would like a quote.',
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      `Event: ${f.get('event')}`,
      f.get('date') && `Date: ${f.get('date')}`,
      f.get('venue') && `Venue: ${f.get('venue')}`,
      f.get('message') && `Details: ${f.get('message')}`,
    ].filter(Boolean);
    window.open(`https://wa.me/254725027263?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  });
}

// WhatsApp popup widget
const waTrigger = document.getElementById('waTrigger');
const waPopup = document.getElementById('waPopup');
const waClose = document.getElementById('waClose');
const waBadge = document.getElementById('waBadge');

if (waTrigger && waPopup) {
  const togglePopup = (show) => {
    const isOpen = typeof show === 'boolean' ? show : !waPopup.classList.contains('open');
    waPopup.classList.toggle('open', isOpen);
    waPopup.setAttribute('aria-hidden', !isOpen);
    waTrigger.setAttribute('aria-expanded', isOpen);
    if (isOpen && waBadge) {
      waBadge.style.display = 'none';
    }
  };

  waTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup();
  });

  if (waClose) {
    waClose.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePopup(false);
    });
  }

  document.addEventListener('click', (e) => {
    if (waPopup.classList.contains('open') && !waPopup.contains(e.target) && e.target !== waTrigger) {
      togglePopup(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && waPopup.classList.contains('open')) {
      togglePopup(false);
    }
  });

  // Auto-pop after 4 seconds if visitor hasn't dismissed yet
  setTimeout(() => {
    try {
      if (!sessionStorage.getItem('wa_seen')) {
        togglePopup(true);
        sessionStorage.setItem('wa_seen', '1');
      }
    } catch (_) {
      togglePopup(true);
    }
  }, 4000);
}

// Continuous Typewriter Effect in Hero
const typedTextEl = document.getElementById('typedText');
if (typedTextEl) {
  const phrase = 'entertainment solution.';
  let index = phrase.length;
  let isDeleting = true;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const holdTime = 2200;
  const pauseEmpty = 450;

  function typeTick() {
    if (isDeleting) {
      index--;
      typedTextEl.textContent = phrase.slice(0, index);
      if (index === 0) {
        isDeleting = false;
        setTimeout(typeTick, pauseEmpty);
        return;
      }
      setTimeout(typeTick, deleteSpeed);
    } else {
      index++;
      typedTextEl.textContent = phrase.slice(0, index);
      if (index === phrase.length) {
        isDeleting = true;
        setTimeout(typeTick, holdTime);
        return;
      }
      setTimeout(typeTick, typeSpeed);
    }
  }

  // Initial hold before first deletion
  setTimeout(typeTick, 1800);
}
