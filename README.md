# Caffè Vero — caffevero.sk

Premium black redesign webu Caffè Vero (Tatras Trade s.r.o., Košice).
Next.js 16 · App Router · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP ScrollTrigger.

## Vývoj

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # produkčný build
npm start       # produkčný server
```

## Obsah = JSON (bez CMS)

Všetok obsah žije v `content/` — texty, kategórie aj 160 produktov:

| Súbor | Čo upraviť |
|---|---|
| `content/site.json` | kontakty, navigácia, texty značky, **testimonials** (pridaj `{quote, author, company}` a sekcia referencií sa naplní sama — bez zásahu do kódu) |
| `content/categories.json` | 6 kariet na homepage (`<CategoryCard />`: title/image/href/accentLabel) + filtre kategórií |
| `content/products.json` | produkty: `name`, `category`, `subcategory`, `localImage`, voliteľne `externalUrl` |
| `content/about.json` | stránka Niečo o káve (video, sekcie, časová os) |

Štruktúra je pripravená na neskoršie napojenie Sanity/Contentful (typy v `lib/content.ts`).

## Hero video

`public/video/` — bezšvový loop generovaný cez Higgsfield (Seedance 2.0) z brífu
`mainvideoinstruction.png` + referencie šálky `salka.jpeg`; surový master v `assets-src/`.
Desktop 16:9 (`hero.webm/mp4`), mobil 9:16 (`hero-mobile.*`), poster `hero-poster.jpg`.
Video sa načíta až po `load` evente a len na rýchlych pripojeniach (šetrí LCP aj dáta).

## Kontaktný formulár

Server Action + Resend + honeypot. Nastav v `.env.local` (viď `.env.example`):
`RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`. Bez kľúča formulár zobrazí
zdvorilú výzvu napísať priamo na e-mail.

## Deploy (Vercel)

Repo → Vercel, build command default. Env premenné vyplniť v projekte.
Presmerovania starých URL (`kava.html` → `/kava`, `historia_kavy.html` → `/o-kave`, …)
sú v `next.config.ts`.

## Lighthouse (produkčný build)

Desktop **98 / 100 / 100 / 100** · Mobil (simulované slow-4G) **81 / 100 / 100 / 100**,
CLS 0, TBT 50 ms; reálny render LCP < 0,3 s. Mobilné skóre drží simulácia
fontov + videa — pri ďalšom ladení možno zvážiť odľahčenie Inter Tight.

## Čaká na klienta

- reálne texty referencií (`site.json → testimonials`)
- produkty a fotky pre „Mlynce Fiorenzato" (filter je pripravený, zobrazí sa akonáhle
  pribudnú produkty so `subcategory: "mlynce"`)
- nová produktová fotografia (staré fotky majú jednotný filter + svetlý plate ako placeholder)
- vektorové logo (súčasné PNG je nízke rozlíšenie, na tmavom pozadí sa invertuje cez CSS)
