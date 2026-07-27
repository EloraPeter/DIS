# Data Insight Solutions — Website

Marketing site for **Data Insight Solutions Ltd**, a data analytics and consulting firm.

🔗 **Live site:** [www.datainsightsolution.com](https://www.datainsightsolution.com/)

## About

A fully static, dependency-free site — no frameworks, no build tooling. Recently modernized (2026 redesign pass) for a cleaner, more premium look while keeping the original brand palette, typography, and content.

## Tech stack

- Plain HTML5, CSS3, vanilla JavaScript
- [Font Awesome](https://fontawesome.com/) (CDN) — icons
- Google Fonts — Poppins (display) + Inter (body)
- [Formspree](https://formspree.io/) + Google reCAPTCHA v2 — contact form
- Google Analytics (gtag.js) + Google Tag Manager

## Structure

```
DIS/
├── index.html                        Home
├── about.html                        About — CEO bio, mission/vision/values, team, projects
├── services.html                     Services
├── contact.html                      Contact form (Formspree + reCAPTCHA)
├── privacy-policy.html
├── terms-of-service.html
├── cookie-policy.html
├── frequently-asked-questions.html   FAQ (accessible accordion)
├── style.css                         Shared stylesheet — every page loads this
├── scripts.js                        Shared JS — nav, cookie banner, forms, FAQ, scroll reveals
├── images/                           Site imagery, logos, favicons
├── sitemap.xml / robots.txt          SEO
├── CNAME                             GitHub Pages custom domain config
└── send_email.php                    Legacy PHP mail handler — not currently used;
                                       the live form posts to Formspree instead
```

`style.css` and `scripts.js` are shared across all 8 pages — a change to either affects the whole site.

## Running locally

No build step required:

- Simplest: open `index.html` directly in a browser.
- Recommended: serve the folder with a local static server (e.g. VS Code's *Live Server* extension) so relative paths and the reCAPTCHA widget behave exactly as they do live.

## Deployment

Hosted via GitHub Pages on the custom domain declared in `CNAME`.

## Notes for future maintenance

- `send_email.php` has a reCAPTCHA secret key hardcoded in it. Since this repo is public, that key is exposed — worth rotating or moving to an environment variable if this handler is ever brought back into use.
- The FAQ accordion, cookie banner, and mobile nav are all driven by `scripts.js`; check there first if any of those stop responding after a CSS/HTML edit.

## Credits

Designed & built by **Elora**
[GitHub](https://github.com/EloraPeter) · [LinkedIn](https://linkedin.com/in/florence-ofuokwu-908129316)
