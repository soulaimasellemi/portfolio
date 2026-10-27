/* ===================================================
   CONFIG — paste your free Web3Forms access key here
   (get it at https://web3forms.com, see README step 4)
   Leave it empty and the form will open the visitor's
   email app instead, so it still works.
   =================================================== */
const WEB3FORMS_ACCESS_KEY = "";
const MY_EMAIL = "soulaima.sellemi@ensi-uma.tn";

/* ---------- Theme (dark / light) ---------- */
const root = document.documentElement;
function getSavedTheme() {
  try { return localStorage.getItem("theme"); } catch (e) { return null; }
}
function saveTheme(t) {
  try { localStorage.setItem("theme", t); } catch (e) {}
}
// The theme is first set by a small script in <head> (no flash of the wrong colors).
const themeBtn = document.getElementById("themeToggle");
function currentTheme() {
  const t = root.getAttribute("data-theme");
  if (t) return t;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function updateThemeLabel() {
  const isLight = currentTheme() === "light";
  themeBtn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
}
updateThemeLabel();
themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  saveTheme(next);
  updateThemeLabel();
});

/* ---------- Mobile menu ---------- */
const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
});


/* ---------- Highlight current section in nav ---------- */
const sections = [...document.querySelectorAll("main section[id]")];
const links = [...navLinks.querySelectorAll("a")];
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach(l => {
    const on = l.getAttribute("href") === "#" + current;
    l.classList.toggle("active", on);
    if (on) l.setAttribute("aria-current", "location"); else l.removeAttribute("aria-current");
  });
}, { passive: true });

/* ---------- Footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Contact form ---------- */
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

if (form) form.addEventListener("submit", async e => {
  e.preventDefault();
  const data = new FormData(form);

  // No key yet → fall back to the visitor's email app
  if (!WEB3FORMS_ACCESS_KEY) {
    const subject = encodeURIComponent("Portfolio contact from " + data.get("name"));
    const body = encodeURIComponent(data.get("message") + "\n\n— " + data.get("name") + " (" + data.get("email") + ")");
    window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
    statusEl.textContent = "Your email app should open with this message. If it doesn't, write to " + MY_EMAIL + ".";
    return;
  }

  data.append("access_key", WEB3FORMS_ACCESS_KEY);
  data.append("subject", "New message from your portfolio");
  statusEl.textContent = "Sending…";
  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
    const json = await res.json();
    if (json.success) {
      statusEl.textContent = "Thanks! Your message was sent — I'll get back to you soon.";
      form.reset();
    } else {
      statusEl.textContent = "Something went wrong. Please email me directly.";
    }
  } catch (err) {
    statusEl.textContent = "Network error. Please email me directly at " + MY_EMAIL;
  }
});
