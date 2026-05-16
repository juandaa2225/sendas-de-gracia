const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const headerCta = document.querySelector(".header-cta");
const dropdowns = document.querySelectorAll(".nav-dropdown");
const assetBase = new URL(".", document.currentScript?.src || window.location.href);
let menuReturnFocus = null;
const mobileMenuQuery = window.matchMedia("(max-width: 1080px)");

const syncMenuVisibility = () => {
  const shouldHide = mobileMenuQuery.matches && !header?.classList.contains("menu-open");
  siteNav?.setAttribute("aria-hidden", shouldHide ? "true" : "false");
  headerCta?.setAttribute("aria-hidden", shouldHide ? "true" : "false");
};

const closeDropdown = (dropdown) => {
  dropdown.classList.remove("open");
  dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
};

const closeAllDropdowns = () => dropdowns.forEach(closeDropdown);

const openMenu = () => {
  if (!header || !navToggle) return;
  menuReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  header.classList.add("menu-open");
  document.body.classList.add("menu-lock");
  syncMenuVisibility();
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Cerrar menú");
  navToggle.textContent = "×";
  siteNav?.querySelector("a, button")?.focus();
};

const closeMenu = ({ restoreFocus = false } = {}) => {
  if (!header || !navToggle) return;
  header.classList.remove("menu-open");
  document.body.classList.remove("menu-lock");
  syncMenuVisibility();
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menú");
  navToggle.textContent = "☰";
  closeAllDropdowns();
  if (restoreFocus) menuReturnFocus?.focus();
  menuReturnFocus = null;
};

const toggleMenu = () => {
  if (!header) return;
  if (header.classList.contains("menu-open")) {
    closeMenu();
  } else {
    openMenu();
  }
};

if (header && navToggle) {
  syncMenuVisibility();
  navToggle.addEventListener("click", toggleMenu);
}

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".nav-dropdown-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    dropdowns.forEach((item) => {
      if (item !== dropdown) closeDropdown(item);
    });
    const isOpen = dropdown.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

document.addEventListener("click", (event) => {
  if (header?.classList.contains("menu-open")) {
    const clickedInsideMenu = siteNav?.contains(event.target) || headerCta?.contains(event.target) || navToggle?.contains(event.target);
    if (!clickedInsideMenu) closeMenu();
  }

  dropdowns.forEach((dropdown) => {
    if (dropdown.contains(event.target)) return;
    closeDropdown(dropdown);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMenu({ restoreFocus: true });
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

headerCta?.addEventListener("click", closeMenu);

window.addEventListener("resize", () => {
  if (!mobileMenuQuery.matches) closeMenu();
  syncMenuVisibility();
});

let touchStartX = 0;
let touchStartY = 0;
let touchStartedAtRightEdge = false;
let touchStartedInMenu = false;

document.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartedAtRightEdge = window.innerWidth - touchStartX <= 24;
    touchStartedInMenu = Boolean(siteNav?.contains(event.target));
  },
  { passive: true }
);

document.addEventListener(
  "touchend",
  (event) => {
    if (!touchStartX || event.changedTouches.length !== 1) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const isHorizontalSwipe = Math.abs(deltaX) > 56 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4;

    if (isHorizontalSwipe && deltaX < 0 && touchStartedAtRightEdge) openMenu();
    if (isHorizontalSwipe && deltaX > 0 && header?.classList.contains("menu-open") && touchStartedInMenu) closeMenu();

    touchStartX = 0;
    touchStartY = 0;
    touchStartedAtRightEdge = false;
    touchStartedInMenu = false;
  },
  { passive: true }
);

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Predicación reciente";
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const trimText = (value, limit = 190) => {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trim()}...`;
};

const escapeHtml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderSermons = (container, sermons) => {
  const limit = Number.parseInt(container.dataset.limit || "4", 10);
  const selected = sermons.slice(0, limit);

  if (!selected.length) {
    container.innerHTML = `<p class="sermon-empty">${container.dataset.empty || "No hay predicaciones disponibles."} <a href="https://www.youtube.com/@comunidaddegraciaenvigado4810" target="_blank" rel="noreferrer">Abrir canal.</a></p>`;
    return;
  }

  container.innerHTML = selected
    .map((sermon) => {
      const title = escapeHtml(sermon.title || "Predicación reciente");
      const url = escapeHtml(sermon.url || `https://www.youtube.com/watch?v=${sermon.videoId}`);
      const thumbnail = escapeHtml(sermon.thumbnail || `https://i.ytimg.com/vi/${sermon.videoId}/hqdefault.jpg`);
      const description = escapeHtml(trimText(sermon.description || "Mensaje reciente del canal actual de la iglesia."));
      return `
        <article class="sermon-card">
          <a class="sermon-thumb" href="${url}" target="_blank" rel="noreferrer">
            <img src="${thumbnail}" alt="" loading="lazy" />
          </a>
          <div>
            <p class="sermon-date">${formatDate(sermon.published)}</p>
            <h3><a href="${url}" target="_blank" rel="noreferrer">${title}</a></h3>
            <p>${description}</p>
          </div>
        </article>
      `;
    })
    .join("");
};

document.querySelectorAll("[data-sermons-list]").forEach(async (container) => {
  try {
    const response = await fetch(new URL("data/sermons.json", assetBase), { cache: "no-store" });
    if (!response.ok) throw new Error(`Sermons request failed: ${response.status}`);
    const data = await response.json();
    renderSermons(container, Array.isArray(data.videos) ? data.videos : []);
  } catch (error) {
    console.warn(error);
    renderSermons(container, []);
  }
});
