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

const initAmbientField = (hero) => {
  const canvas = hero.querySelector(".hero-ambient");
  if (!canvas || reducedMotionQuery.matches) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let animationFrame = 0;
  let isVisible = true;
  let pointerActive = false;
  const pointer = { x: 0, y: 0 };

  const createParticles = () => {
    const count = width < 760 ? 24 : Math.min(58, Math.max(36, Math.round(width / 25)));
    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.13,
      vy: (Math.random() - 0.5) * 0.1,
      radius: index % 7 === 0 ? 1.65 : Math.random() * 0.8 + 0.45,
      alpha: Math.random() * 0.42 + 0.2,
    }));
  };

  const resize = () => {
    const bounds = hero.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    createParticles();
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    particles.forEach((particle, index) => {
      if (pointerActive) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150 && distance > 0) {
          const influence = (1 - distance / 150) * 0.012;
          particle.vx += dx * influence * 0.018;
          particle.vy += dy * influence * 0.018;
        }
      }

      particle.vx *= 0.994;
      particle.vy *= 0.994;
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -8) particle.x = width + 8;
      if (particle.x > width + 8) particle.x = -8;
      if (particle.y < -8) particle.y = height + 8;
      if (particle.y > height + 8) particle.y = -8;

      context.beginPath();
      context.fillStyle = `rgba(226, 201, 131, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();

      for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
        const next = particles[nextIndex];
        const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
        if (distance > 105) continue;
        context.beginPath();
        context.strokeStyle = `rgba(226, 201, 131, ${(1 - distance / 105) * 0.11})`;
        context.lineWidth = 0.7;
        context.moveTo(particle.x, particle.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      }
    });

    if (isVisible && !document.hidden) animationFrame = window.requestAnimationFrame(draw);
  };

  const start = () => {
    window.cancelAnimationFrame(animationFrame);
    if (isVisible && !document.hidden) animationFrame = window.requestAnimationFrame(draw);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else window.cancelAnimationFrame(animationFrame);
    },
    { threshold: 0.05 }
  );

  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    const bounds = hero.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width;
    const normalizedY = (event.clientY - bounds.top) / bounds.height;
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    pointerActive = true;
    hero.style.setProperty("--hero-x", `${normalizedX * 100}%`);
    hero.style.setProperty("--hero-y", `${normalizedY * 100}%`);
    hero.style.setProperty("--hero-copy-x", `${(normalizedX - 0.5) * -8}px`);
    hero.style.setProperty("--hero-copy-y", `${(normalizedY - 0.5) * -6}px`);
    hero.style.setProperty("--hero-card-x", `${(normalizedX - 0.5) * 11}px`);
    hero.style.setProperty("--hero-card-y", `${(normalizedY - 0.5) * 8}px`);
  });

  hero.addEventListener("pointerleave", () => {
    pointerActive = false;
    ["--hero-copy-x", "--hero-copy-y", "--hero-card-x", "--hero-card-y"].forEach((property) => hero.style.removeProperty(property));
  });
  document.addEventListener("visibilitychange", start);
  window.addEventListener("resize", resize);
  resize();
  observer.observe(hero);
};

document.querySelectorAll("[data-ambient-field]").forEach(initAmbientField);

const initScrollCinema = (section) => {
  if (reducedMotionQuery.matches) {
    section.style.setProperty("--cinema-progress", "1");
    section.style.setProperty("--cinema-line-width", "102px");
    return;
  }

  let isVisible = false;
  let scrollFrame = 0;

  const update = () => {
    scrollFrame = 0;
    if (!isVisible) return;
    const bounds = section.getBoundingClientRect();
    const travel = window.innerHeight + bounds.height;
    const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / travel));
    const centeredProgress = progress - 0.5;
    section.style.setProperty("--cinema-progress", progress.toFixed(3));
    section.style.setProperty("--cinema-shift", `${centeredProgress * 54}px`);
    section.style.setProperty("--cinema-copy-shift", `${centeredProgress * -22}px`);
    section.style.setProperty("--cinema-line-width", `${38 + progress * 64}px`);
  };

  const requestUpdate = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) requestUpdate();
    },
    { rootMargin: "12% 0px 12% 0px" }
  );

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  observer.observe(section);
};

document.querySelectorAll("[data-scroll-cinema]").forEach(initScrollCinema);

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
  let pointerFrame = 0;
  const experience = document.createElement("div");
  const dockLabel = document.createElement("p");
  const dock = document.createElement("div");
  const reader = document.createElement("article");
  const nodes = cards.map((card, index) => {
    const button = document.createElement("button");
    const number = card.querySelector(".card-number")?.textContent || String(index + 1).padStart(2, "0");
    const title = card.querySelector("h2")?.textContent || "";
    button.className = "doctrine-node";
    button.type = "button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-label", `${number}. ${title}`);
    button.dataset.index = String(index);
    button.innerHTML = `<span aria-hidden="true">${number}</span>`;
    dock.append(button);
    return button;
  });

  experience.className = "doctrine-experience";
  dockLabel.className = "doctrine-dock-label";
  dockLabel.textContent = "Explora las convicciones";
  dock.className = "doctrine-dock";
  dock.setAttribute("role", "tablist");
  dock.setAttribute("aria-label", "Puntos de la declaración doctrinal");
  reader.className = "doctrine-reader";
  reader.setAttribute("role", "tabpanel");
  reader.setAttribute("aria-live", "polite");
  experience.append(dockLabel, dock, reader, controls);
  carousel.insertBefore(experience, track);
  track.hidden = true;

  totalLabel.textContent = String(cards.length).padStart(2, "0");
  controls.hidden = false;

  const setActive = (nextIndex) => {
    activeIndex = (nextIndex + cards.length) % cards.length;
    nodes.forEach((node, index) => {
      const isActive = index === activeIndex;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-selected", isActive ? "true" : "false");
      node.tabIndex = isActive ? 0 : -1;
    });

    const source = cards[activeIndex];
    const number = source.querySelector(".card-number")?.textContent || "";
    const title = source.querySelector("h2")?.textContent || "";
    const body = source.querySelector("p")?.textContent || "";
    reader.classList.remove("is-changing");
    reader.innerHTML = `<span class="card-number">${number}</span><h2>${title}</h2><p>${body}</p>`;
    void reader.offsetWidth;
    reader.classList.add("is-changing");
    currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
  };

  const goTo = (nextIndex) => {
    const normalizedIndex = (nextIndex + cards.length) % cards.length;
    setActive(normalizedIndex);
    nodes[normalizedIndex].scrollIntoView({
      behavior: reducedMotionQuery.matches ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  prevButton.addEventListener("click", () => goTo(activeIndex - 1));
  nextButton.addEventListener("click", () => goTo(activeIndex + 1));
  nodes.forEach((node, index) => {
    node.addEventListener("click", () => goTo(index));
    node.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") goTo(activeIndex - 1);
      if (event.key === "ArrowRight") goTo(activeIndex + 1);
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(cards.length - 1);
    });
  });

  dock.addEventListener("pointermove", (event) => {
    if (reducedMotionQuery.matches || event.pointerType === "touch") return;
    window.cancelAnimationFrame(pointerFrame);
    pointerFrame = window.requestAnimationFrame(() => {
      experience.style.setProperty("--pointer-x", `${((event.clientX - experience.getBoundingClientRect().left) / experience.clientWidth) * 100}%`);
      nodes.forEach((node) => {
        const bounds = node.getBoundingClientRect();
        const distance = Math.abs(event.clientX - (bounds.left + bounds.width / 2));
        const proximity = Math.max(0, 1 - distance / 150);
        node.style.setProperty("--proximity", proximity.toFixed(3));
      });
    });
  });

  dock.addEventListener("pointerleave", () => {
    nodes.forEach((node) => node.style.removeProperty("--proximity"));
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
