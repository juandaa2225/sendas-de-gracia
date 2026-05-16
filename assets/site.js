const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const headerCta = document.querySelector(".header-cta");
const dropdowns = document.querySelectorAll(".nav-dropdown");
const assetBase = new URL(".", document.currentScript?.src || window.location.href);
let menuReturnFocus = null;
const mobileMenuQuery = window.matchMedia("(max-width: 1080px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let revealObserver = null;

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

  toggle.addEventListener("click", (event) => {
    const isMenuLink = toggle.matches("a[href]");
    const isMobileMenuLink = isMenuLink && mobileMenuQuery.matches && header?.classList.contains("menu-open");
    const isDesktopMenuLink = isMenuLink && !isMobileMenuLink;
    const isOpen = dropdown.classList.contains("open");

    if ((isDesktopMenuLink || isMobileMenuLink) && isOpen) return;
    if (isMenuLink) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    dropdowns.forEach((item) => {
      if (item !== dropdown) closeDropdown(item);
    });
    const shouldOpen = !isOpen;
    dropdown.classList.toggle("open", shouldOpen);
    toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
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

const revealSelectors = [
  ".intro-band",
  ".page-hero",
  ".section-heading",
  ".media-panel",
  ".media-copy",
  ".doctrine-summary",
  ".info-card",
  ".icon-card",
  ".ministry-card",
  ".resource-list article",
  ".doctrine-card",
  ".visit-panel",
  ".visit-details article",
  ".sermon-feature-copy",
  ".sermon-card",
  ".visit-cta > *",
];

const initReveals = (root = document) => {
  if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    document.documentElement.classList.remove("motion-ready");
    return;
  }
  document.documentElement.classList.add("motion-ready");
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
  }

  root.querySelectorAll(revealSelectors.join(",")).forEach((element, index) => {
    if (element.classList.contains("reveal")) return;
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
    revealObserver.observe(element);
  });
};

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
  initReveals(container);
};

const initDoctrineCarousel = (carousel) => {
  const track = carousel.querySelector("[data-doctrine-track]");
  const cards = Array.from(carousel.querySelectorAll(".doctrine-card"));
  const controls = carousel.querySelector(".doctrine-controls");
  const prevButton = carousel.querySelector("[data-doctrine-prev]");
  const nextButton = carousel.querySelector("[data-doctrine-next]");
  const currentLabel = carousel.querySelector("[data-doctrine-current]");
  const totalLabel = carousel.querySelector("[data-doctrine-total]");

  if (!track || !cards.length || !controls || !prevButton || !nextButton || !currentLabel || !totalLabel) return;

  let activeIndex = 0;
  let scrollFrame = 0;
  totalLabel.textContent = String(cards.length).padStart(2, "0");
  controls.hidden = false;
  carousel.classList.add("is-carousel-ready");

  const setActive = (nextIndex) => {
    activeIndex = (nextIndex + cards.length) % cards.length;
    cards.forEach((card, index) => {
      const isActive = index === activeIndex;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-current", isActive ? "true" : "false");
    });
    currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
  };

  const getNearestCardIndex = () => {
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    return cards.reduce(
      (nearest, card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - trackCenter);
        return distance < nearest.distance ? { index, distance } : nearest;
      },
      { index: activeIndex, distance: Number.POSITIVE_INFINITY }
    ).index;
  };

  const goTo = (nextIndex) => {
    const normalizedIndex = (nextIndex + cards.length) % cards.length;
    const card = cards[normalizedIndex];
    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({
      left,
      behavior: reducedMotionQuery.matches ? "auto" : "smooth",
    });
    setActive(normalizedIndex);
  };

  prevButton.addEventListener("click", () => goTo(activeIndex - 1));
  nextButton.addEventListener("click", () => goTo(activeIndex + 1));
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (index !== activeIndex) goTo(index);
    });
  });
  track.addEventListener("scroll", () => {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(() => setActive(getNearestCardIndex()));
  });
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
  });

  setActive(0);
};

document.querySelectorAll("[data-doctrine-carousel]").forEach(initDoctrineCarousel);

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

initReveals();
