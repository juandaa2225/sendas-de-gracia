const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const dropdowns = document.querySelectorAll(".nav-dropdown");
const assetBase = new URL(".", document.currentScript?.src || window.location.href);

const closeDropdown = (dropdown) => {
  dropdown.classList.remove("open");
  dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
};

if (header && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (!isOpen) dropdowns.forEach(closeDropdown);
  });
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
  dropdowns.forEach((dropdown) => {
    if (dropdown.contains(event.target)) return;
    closeDropdown(dropdown);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  dropdowns.forEach(closeDropdown);
});

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
