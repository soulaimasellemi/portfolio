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
  themeBtn.setAttribute("aria-label", isLight ? t("toDark") : t("toLight"));
}
updateThemeLabel();
document.addEventListener("langchange", updateThemeLabel);
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


/* ---------- Highlight current section (top nav + side rail) ---------- */
const sections = [...document.querySelectorAll("main section[id]")];
const rail = document.getElementById("rail");
const links = [...navLinks.querySelectorAll("a"), ...(rail ? rail.querySelectorAll("a") : [])];
function spy() {
  let current = "top";
  sections.forEach(s => { if (s.id !== "home" && window.scrollY >= s.offsetTop - window.innerHeight * 0.35) current = s.id; });
  links.forEach(l => {
    const on = l.getAttribute("href") === "#" + current;
    l.classList.toggle("active", on);
    if (on) l.setAttribute("aria-current", "location"); else l.removeAttribute("aria-current");
  });
}
if (sections.length) { window.addEventListener("scroll", spy, { passive: true }); spy(); }

/* ---------- Project filter ---------- */
const grid = document.getElementById("projGrid");
const countEl = document.getElementById("projCount");
let activeFilter = "all";
function applyFilter() {
  if (!grid) return;
  let n = 0;
  grid.querySelectorAll("li").forEach(li => {
    const show = activeFilter === "all" || li.dataset.cat.split(" ").includes(activeFilter);
    li.hidden = !show; if (show) n++;
  });
  document.querySelectorAll(".filters .chip").forEach(c => c.setAttribute("aria-pressed", String(c.dataset.filter === activeFilter)));
  if (countEl) countEl.textContent = t("projects")(n);
}
document.querySelectorAll(".filters .chip").forEach(c => c.addEventListener("click", () => { activeFilter = c.dataset.filter; applyFilter(); }));
document.addEventListener("langchange", applyFilter);
applyFilter();

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
    statusEl.textContent = t("mailApp") + MY_EMAIL + ".";
    return;
  }

  data.append("access_key", WEB3FORMS_ACCESS_KEY);
  data.append("subject", "New message from your portfolio");
  statusEl.textContent = t("sending");
  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
    const json = await res.json();
    if (json.success) {
      statusEl.textContent = t("sent");
      form.reset();
    } else {
      statusEl.textContent = t("failed");
    }
  } catch (err) {
    statusEl.textContent = t("network") + MY_EMAIL;
  }
});

/* ---------- Hanging ID badge (lanyard physics) ----------
   The strap is a chain of points (Verlet integration). The card hangs from
   the last point and swings like a pendulum. Drag it to swing it, release
   to throw it, click it or press "Flip badge" to see the back. */
(function () {
  const stage = document.getElementById("badgeStage");
  if (!stage) return;
  const canvas = document.getElementById("lanyard");
  const ctx = canvas.getContext("2d");
  const card = document.getElementById("idCard");
  const flipBtn = document.getElementById("flipBtn");
  const flipLabel = document.getElementById("flipLabel");
  const faces = card.querySelectorAll(".id-face");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Flip */
  function setFlipped(on) {
    card.classList.toggle("flipped", on);
    flipBtn.setAttribute("aria-pressed", String(on));
    flipLabel.textContent = on ? t("flipBack") : t("flip");
    faces[0].setAttribute("aria-hidden", String(on));
    faces[1].setAttribute("aria-hidden", String(!on));
  }
  setFlipped(false);
  document.addEventListener("langchange", () => setFlipped(card.classList.contains("flipped")));
  flipBtn.addEventListener("click", () => setFlipped(!card.classList.contains("flipped")));

  /* Theme colors for the strap, re-read when the theme changes */
  let colors = {};
  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    colors = {
      strap: cs.getPropertyValue("--accent").trim(),
      strapDark: cs.getPropertyValue("--accent-strong").trim(),
      metal: cs.getPropertyValue("--muted").trim(),
      shine: "rgba(255,255,255,0.45)",
    };
  }
  readColors();
  new MutationObserver(() => { readColors(); draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => { readColors(); draw(); });

  /* Physics state */
  const SEGMENTS = 14;
  const GRAVITY = 0.55;
  const DAMPING = 0.988;
  let W = 0, H = 0, cardW = 252, cardH = 360, segLen = 12;
  let anchor = { x: 0, y: 0 };
  let pts = [];          // strap points; last one is the card clip
  let bottom = null;     // card bottom-centre point
  let drag = null;       // { offX, offY, startX, startY, t0, moved }
  let pointer = { x: 0, y: 0 };

  function P(x, y) { return { x, y, px: x, py: y }; }

  function layout() {
    const r = stage.getBoundingClientRect();
    W = r.width; H = r.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cardW = card.offsetWidth; cardH = card.offsetHeight;
    anchor = { x: W / 2, y: 0 };
    const ropeLen = Math.max(80, H - cardH - 30);
    segLen = ropeLen / SEGMENTS;
    pts = [];
    for (let i = 0; i <= SEGMENTS; i++) pts.push(P(anchor.x, anchor.y + i * segLen));
    const clip = pts[SEGMENTS];
    bottom = P(clip.x, clip.y + cardH);
    if (!reduceMotion) {
      // start a little to the side so the badge swings in on load
      bottom.px = bottom.x - 18;
      for (let i = 1; i <= SEGMENTS; i++) pts[i].px = pts[i].x - 12 * (i / SEGMENTS);
    }
    card.classList.add("live");
  }

  function constrain(a, b, len, wa, wb) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const d = Math.hypot(dx, dy) || 0.0001;
    const diff = (d - len) / d;
    const sum = wa + wb;
    if (!sum) return;
    a.x += dx * diff * (wa / sum); a.y += dy * diff * (wa / sum);
    b.x -= dx * diff * (wb / sum); b.y -= dy * diff * (wb / sum);
  }

  let time = 0;
  function step() {
    time += 1 / 60;
    const clip = pts[SEGMENTS];
    const breeze = drag ? 0 : Math.sin(time * 0.9) * 0.035; // gentle idle sway
    const all = pts.concat([bottom]);
    for (let i = 1; i < all.length; i++) {
      const p = all[i];
      const vx = (p.x - p.px) * DAMPING, vy = (p.y - p.py) * DAMPING;
      p.px = p.x; p.py = p.y;
      p.x += vx + (p === bottom ? breeze : 0);
      p.y += vy + GRAVITY;
    }
    if (drag) {
      // the clip follows the pointer, but the strap can't stretch much
      let tx = pointer.x - drag.offX, ty = pointer.y - drag.offY;
      const maxL = segLen * SEGMENTS * 1.04;
      const dx = tx - anchor.x, dy = ty - anchor.y, d = Math.hypot(dx, dy);
      if (d > maxL) { tx = anchor.x + dx / d * maxL; ty = anchor.y + dy / d * maxL; }
      clip.x = tx; clip.y = ty;
    }
    for (let k = 0; k < 24; k++) {
      pts[0].x = anchor.x; pts[0].y = anchor.y;
      for (let i = 0; i < SEGMENTS; i++) {
        const last = i === SEGMENTS - 1;
        constrain(pts[i], pts[i + 1], segLen, i === 0 ? 0 : 1, last ? (drag ? 0 : 0.35) : 1);
      }
      constrain(clip, bottom, cardH, drag ? 0 : 0.35, 0.35);
    }
  }

  function angle() {
    const clip = pts[SEGMENTS];
    return Math.atan2(-(bottom.x - clip.x), bottom.y - clip.y);
  }

  function draw() {
    if (!pts.length) return;
    const clip = pts[SEGMENTS];
    const a = angle();
    card.style.transform = `translate(${clip.x - cardW / 2}px, ${clip.y}px) rotate(${a}rad)`;

    ctx.clearRect(0, 0, W, H);
    // strap: smooth curve through the chain, ending a bit above the clip
    const end = { x: clip.x + Math.sin(-a) * -14, y: clip.y - Math.cos(a) * 14 };
    const path = () => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < SEGMENTS - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(end.x, end.y);
    };
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    path(); ctx.strokeStyle = colors.strapDark; ctx.lineWidth = 22; ctx.stroke();
    path(); ctx.strokeStyle = colors.strap; ctx.lineWidth = 17; ctx.stroke();
    path(); ctx.setLineDash([7, 6]); ctx.strokeStyle = colors.shine; ctx.lineWidth = 1.3; ctx.stroke(); ctx.setLineDash([]);

    // metal clip joining strap and card
    ctx.save();
    ctx.translate(clip.x, clip.y); ctx.rotate(a);
    ctx.fillStyle = colors.metal;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-9, -24, 18, 24, 4) : ctx.rect(-9, -24, 18, 24); ctx.fill();
    ctx.fillStyle = colors.shine; ctx.fillRect(-5, -20, 3, 16);
    ctx.strokeStyle = colors.metal; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0, 4, 7, Math.PI, 0); ctx.stroke();
    ctx.restore();
  }

  /* Animation loop: fixed 60 Hz steps, paused when the badge is off-screen */
  let running = false, visible = true, last = 0, acc = 0;
  function frame(t) {
    if (!running) return;
    const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
    acc += dt;
    while (acc >= 1 / 60) { step(); acc -= 1 / 60; }
    draw();
    requestAnimationFrame(frame);
  }
  function start() { if (running || reduceMotion || !visible) return; running = true; last = 0; acc = 0; requestAnimationFrame(frame); }
  function stop() { running = false; }

  /* Dragging and clicking */
  function local(e) { const r = stage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  card.addEventListener("pointerdown", e => {
    if (e.button !== undefined && e.button !== 0) return;
    const p = local(e); pointer = p;
    const clip = pts[SEGMENTS];
    drag = { offX: p.x - clip.x, offY: p.y - clip.y, startX: p.x, startY: p.y, t0: performance.now(), moved: false };
    if (reduceMotion) drag.noPhysics = true;
    card.classList.add("dragging");
    card.setPointerCapture(e.pointerId);
    start();
  });
  card.addEventListener("pointermove", e => {
    if (!drag) return;
    pointer = local(e);
    if (Math.hypot(pointer.x - drag.startX, pointer.y - drag.startY) > 6) drag.moved = true;
  });
  function endDrag() {
    if (!drag) return;
    const wasClick = !drag.moved && performance.now() - drag.t0 < 450;
    drag = null;
    card.classList.remove("dragging");
    if (wasClick) setFlipped(!card.classList.contains("flipped"));
  }
  card.addEventListener("pointerup", endDrag);
  card.addEventListener("pointercancel", endDrag);
  /* Setup */
  layout(); draw();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); }).observe(stage);
  }
  start();
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { layout(); draw(); }, 150); });
})();
