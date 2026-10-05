# INMUN 2026 — GitHub Pages Deployment (free private-ish hosting)

Your site files are all inside this folder. GitHub Pages hosts static HTML/CSS/JS perfectly.

## One-time setup (about 5 minutes)

1. **Create a GitHub account** at https://github.com/signup (if you don't have one).
2. On GitHub, click **New repository** → name it e.g. `inmun26` → set it to **Private** (recommended) or Public → Create.
3. Upload your files: open the new repo → **Add file** → **Upload files** → drag in the contents of the `inmun26` folder (`index.html`, `css/`, `js/`) → **Commit changes**.

## Enable Pages

4. In the repo, go to **Settings** → **Pages**.
5. Under **Source**, choose **Deploy from a branch**, branch `main`, folder `/ (root)` → **Save**.
6. Wait ~1 minute, then refresh. Your site will be live at:

   `https://<your-github-username>.github.io/inmun26/`

## Custom domain (later)

- Buy a domain (Namecheap, GoDaddy, Porkbun, Google Domains).
- In repo **Settings → Pages → Custom domain**, enter it and add the DNS records GitHub shows you.
- Enable **Enforce HTTPS** once the certificate is issued.

Notes:
- GitHub Pages on a private repo is only visible to repo collaborators unless you have a Pro account; for a free public address, make the repo Public (your data is just HTML/JS, no secrets).
- Asset images load from your existing Netlify URLs; to make the site fully independent, download those assets into the repo.
