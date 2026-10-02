// Portfolio JavaScript

const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const toTop = document.getElementById("to-top");
const links = document.querySelectorAll(".nav-links a");

/* ---------- Dark / light theme ---------- */

function currentTheme() {
    const saved = root.getAttribute("data-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeLabel() {
    const isDark = currentTheme() === "dark";
    themeBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

themeBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    updateThemeLabel();
});

updateThemeLabel();

/* ---------- Mobile menu ---------- */

function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => {
    setMenu(!navLinks.classList.contains("open"));
});

// Close the menu after choosing a link, pressing Escape, or resizing to desktop
links.forEach(link => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", e => {
    if (e.key === "Escape") setMenu(false);
});

window.matchMedia("(min-width: 769px)").addEventListener("change", () => setMenu(false));

/* ---------- Highlight the current section in the nav ---------- */

const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(link => {
                const active = link.getAttribute("href") === "#" + entry.target.id;
                link.classList.toggle("active", active);
                if (active) link.setAttribute("aria-current", "true");
                else link.removeAttribute("aria-current");
            });
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(section => observer.observe(section));

/* ---------- Back to top button ---------- */

window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 600);
}, { passive: true });

toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
});

/* ---------- Footer year ---------- */

document.getElementById("year").textContent = new Date().getFullYear();