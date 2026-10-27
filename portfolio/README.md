# Soulaima Sellemi — Portfolio

Personal portfolio website. Plain HTML, CSS and JavaScript: no build step, no framework, 100% free to host.

## Files

```
portfolio/
├── index.html                      ← home page (edit text here)
├── project-*.html                  ← one page per project
├── assets/projects/*.svg           ← project images (replace with screenshots)
├── style.css                       ← colors, fonts, layout
├── script.js                       ← dark/light mode, menu, contact form
└── assets/Soulaima_Sellemi_CV.pdf  ← the CV behind "Download CV"
```

## Deploy for free on GitHub Pages

1. Sign in to GitHub as **soulaimasellemi**.
2. Create a new **public** repository named exactly `soulaimasellemi.github.io`.
3. Click **"uploading an existing file"**, drag in the *contents* of this folder (index.html, style.css, script.js, README.md and the assets folder), then **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
5. Wait 1–2 minutes and open **https://soulaimasellemi.github.io**.

Every time you change a file on GitHub, the site updates automatically within a minute or two.

## Or deploy on Vercel (also free)

1. Put the files in a GitHub repository (steps 1–3 above; any repo name works, e.g. `portfolio`).
2. Go to https://vercel.com and choose **Sign up → Continue with GitHub** (Hobby plan, free).
3. Click **Add New… → Project**, pick your `portfolio` repo, click **Import**.
4. Framework preset: **Other**. Leave build command and output directory empty. Click **Deploy**.
5. Your site is live at `https://portfolio-xxxx.vercel.app`. To get a nicer name, open **Settings → Domains** and edit it to e.g. `soulaima-sellemi.vercel.app`.

Every `git push` (or edit on GitHub) redeploys automatically.

## Turn on the contact form (free, 2 minutes)

Without a key, the form opens the visitor's email app, so it already works. To receive messages directly in your inbox:

1. Go to https://web3forms.com, enter `soulaima.sellemi@ensi-uma.tn` and create an access key (free).
2. Open `script.js` and paste it: `const WEB3FORMS_ACCESS_KEY = "your-key-here";`
3. Commit the change.

## Things to update

- **Project images:** replace the files in `assets/projects/` with screenshots (keep the same names, or change the `src` in the HTML). A 16:9 size like 1200×675 looks best.

- **Project links:** in `index.html`, search for `TODO` and replace the GitHub links with the real repo URLs, and the "Live demo (soon)" links with your Hugging Face Space or Streamlit Cloud URLs (remove `class="disabled"`).
- **New CV:** replace `assets/Soulaima_Sellemi_CV.pdf` with a file of the same name.
- **Accent color:** change `--accent` in `style.css` (two places: dark and light theme).

## Optional: free analytics

Cloudflare Web Analytics (free): add your site, copy the small `<script>` tag it gives you, and paste it just before `</body>` in `index.html`.
