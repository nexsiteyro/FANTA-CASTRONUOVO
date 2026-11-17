/* Fanta Castronuovo 2026/2027 - script principale */
document.addEventListener("DOMContentLoaded", () => {

  /* 1. Intro (una volta per sessione, si chiude anche con un clic) */
  let showIntro = true;
  try { showIntro = sessionStorage.getItem("fc-intro-shown") !== "true"; } catch (e) {}
  if (showIntro && document.body.dataset.intro === "true") {
    const intro = document.createElement("div");
    intro.className = "fc-intro";
    intro.innerHTML =
      '<img src="assets/img/logo.png" alt="Logo Fanta Castronuovo">' +
      '<span class="fc-intro-line"></span>' +
      '<p>Fanta Castronuovo</p>' +
      '<small>STAGIONE 2026/2027</small>';
    document.body.appendChild(intro);
    try { sessionStorage.setItem("fc-intro-shown", "true"); } catch (e) {}
    const close = () => { intro.classList.add("hide"); setTimeout(() => intro.remove(), 1200); };
    const timer = setTimeout(close, 2300);
    intro.addEventListener("click", () => { clearTimeout(timer); close(); });
  }

  /* 2. Menu mobile */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    const setOpen = open => {
      nav.classList.toggle("active", open);
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("active")));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("click", e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
  }

  /* 3. Anno nel footer */
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  /* 4. Header con ombra allo scorrimento */
  const header = document.querySelector(".site-header");
  if (header) {
    const upd = () => header.classList.toggle("scrolled", window.scrollY > 30);
    upd();
    window.addEventListener("scroll", upd, { passive: true });
  }

  /* 5. Conto alla rovescia scadenza quote */
  const countEl = document.querySelector("[data-deadline-count]");
  const noticeEl = document.querySelector(".notice");
  if (countEl) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const deadline = new Date(2026, 10, 21);   // 21 novembre 2026
    const final = new Date(2026, 11, 31);      // 31 dicembre 2026
    const days = Math.round((deadline - today) / 86400000);
    const textEl = document.querySelector("[data-deadline-text]");
    if (days > 1) countEl.textContent = "Mancano " + days + " giorni";
    else if (days === 1) countEl.textContent = "Scade domani";
    else if (days === 0) countEl.textContent = "Scade oggi";
    else if (today <= final) {
      countEl.textContent = "Termine ultimo: 31 dicembre 2026";
      if (textEl) textEl.textContent = "Scadenza del 21 novembre superata: sono previste penalizzazioni in classifica.";
    } else if (noticeEl) noticeEl.hidden = true;
  }

  /* 6. Lightbox */
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Visualizzazione giornale");
  lb.innerHTML = '<button class="lightbox-close" aria-label="Chiudi immagine">&times;</button><img src="" alt="">';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img"), lbClose = lb.querySelector("button");
  let lastFocus = null;
  const openLb = src => {
    lastFocus = document.activeElement;
    lbImg.src = src.src; lbImg.alt = src.alt;
    lb.classList.add("active"); document.body.classList.add("lightbox-open"); lbClose.focus();
  };
  const closeLb = () => {
    lb.classList.remove("active"); document.body.classList.remove("lightbox-open");
    if (lastFocus) lastFocus.focus();
  };
  document.querySelectorAll("[data-lightbox]").forEach(btn =>
    btn.addEventListener("click", () => openLb(btn.querySelector("img"))));
  lbClose.addEventListener("click", closeLb);
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && lb.classList.contains("active")) closeLb(); });

  /* 7. Indice con evidenziazione (regolamento e comunicati) */
  const targets = document.querySelectorAll("[data-spy]");
  const links = document.querySelectorAll(".doc-index a");
  if (targets.length && links.length && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
          const act = document.querySelector(".doc-index a.active");
          if (act && window.innerWidth <= 1060) {
            const box = act.parentElement;
            box.scrollTo({ left: act.offsetLeft - 24, behavior: "smooth" });
          }
        }
      });
    }, { rootMargin: "-20% 0px -65% 0px" });
    targets.forEach(t => obs.observe(t));
  }

  /* 8. Ricerca nel regolamento */
  const input = document.querySelector("[data-search]");
  if (input) {
    const items = [...document.querySelectorAll(".regulation-article")];
    const empty = document.querySelector(".no-results");
    const count = document.querySelector(".search-count");
    const originals = new Map(items.map(a => [a, a.innerHTML]));
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    input.addEventListener("input", () => {
      const q = input.value.trim();
      let found = 0;
      items.forEach(a => {
        a.innerHTML = originals.get(a);
        if (!q) { a.hidden = false; return; }
        const match = a.textContent.toLowerCase().includes(q.toLowerCase());
        a.hidden = !match;
        if (match) {
          found++;
          const re = new RegExp("(" + esc(q) + ")", "gi");
          const walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT);
          const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
          nodes.forEach(n => {
            if (re.test(n.nodeValue)) {
              re.lastIndex = 0;
              const span = document.createElement("span");
              span.innerHTML = n.nodeValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(re, "<mark>$1</mark>");
              n.replaceWith(span);
            }
            re.lastIndex = 0;
          });
        }
      });
      if (count) count.textContent = q ? (found === 1 ? "1 articolo trovato" : found + " articoli trovati") : "";
      if (empty) empty.classList.toggle("show", !!q && found === 0);
    });
  }

  /* 9. Stampa */
  document.querySelectorAll("[data-print]").forEach(b => b.addEventListener("click", () => window.print()));
});
