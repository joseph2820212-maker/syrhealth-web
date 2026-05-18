// Bilingual copy + interactivity for the SyrHealth marketing site.

const I = {
  // SVG icons used across cards. Lucide-style stroke icons.
  icon(name, opts = {}) {
    const s = opts.size ?? 22;
    const sw = opts.stroke ?? 1.8;
    const map = {
      search:       `<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>`,
      calendar:     `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`,
      video:        `<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4Z"/>`,
      file:         `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/>`,
      folder:       `<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>`,
      pill:         `<path d="M10.5 20.5a7.07 7.07 0 0 1-10-10l10-10a7.07 7.07 0 0 1 10 10Z"/><path d="m8.5 8.5 7 7"/>`,
      alarm:        `<circle cx="12" cy="13" r="8"/><path d="M5 3 2 6M19 3l3 3M12 9v4l3 2"/>`,
      book:         `<path d="M4 4h6a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H4Z"/><path d="M20 4h-6a4 4 0 0 0-4 4v12a4 4 0 0 1 4-4h6Z"/>`,
      shield:       `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>`,
      lock:         `<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`,
      eye:          `<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>`,
      check_badge:  `<path d="m9 12 2 2 4-4"/><path d="M12 3 4 7v6c0 5 3.5 7 8 8 4.5-1 8-3 8-8V7Z"/>`,
      activity:     `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`,
      stethoscope:  `<path d="M6 3v8a5 5 0 0 0 10 0V3"/><path d="M6 3H4M16 3h2"/><path d="M11 16v3a4 4 0 0 0 8 0v-2"/><circle cx="19" cy="14" r="2"/>`,
      heart:        `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/>`,
      siren:        `<path d="M7 12a5 5 0 1 1 10 0v7H7Z"/><path d="M3 19h18M12 4v3M5 7l2 2M19 7l-2 2"/>`,
      download:     `<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>`,
      user_plus:    `<circle cx="9" cy="8" r="4"/><path d="M3 21a6 6 0 0 1 12 0"/><path d="M19 8v6M16 11h6"/>`,
      chevron:      `<path d="m9 18 6-6-6-6"/>`,
      sparkle:      `<path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/>`,
      list:         `<path d="M4 6h16M4 12h16M4 18h16"/>`,
      clock:        `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`,
      arrow_right:  `<path d="M5 12h14M13 5l7 7-7 7"/>`,
    };
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"
      style="display:inline-block;vertical-align:middle">${map[name] ?? ""}</svg>`;
  },
};
window.I = I;

// Language toggle
function applyLang(lang) {
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("syr_lang", lang);
  const t = document.getElementById("lang-toggle-label");
  if (t) t.textContent = lang === "ar" ? "EN" : "العربية";
}
window.applyLang = applyLang;

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("syr_lang") || "ar";
  applyLang(saved);

  const btn = document.getElementById("lang-toggle");
  btn?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("dir") === "rtl" ? "ar" : "en";
    applyLang(cur === "ar" ? "en" : "ar");
  });

  // Render icon placeholders: any element with [data-icon="name"]
  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = I.icon(el.getAttribute("data-icon"), {
      size: parseInt(el.getAttribute("data-size") ?? "22", 10),
      stroke: parseFloat(el.getAttribute("data-stroke") ?? "1.8"),
    });
  });
});
