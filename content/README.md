# Content map — Caffè Vero (audit starého webu caffevero.sk, 2026-07-07)

Zdroj dát pre nový web. Všetko je 1:1 prenesené zo starého webu, nič nie je vymyslené.

## Súbory

| Súbor | Obsah |
|---|---|
| `site.json` | Brand texty, kontakty, navigácia, partneri, poznámky k dieram v obsahu |
| `categories.json` | 6 showcase kariet pre homepage (`<CategoryCard />`) + definície stránok kategórií s filtrami |
| `products.json` | **160 produktov** — názov, kategória, podkategória/značka, legacy URL obrázka, lokálna cesta |
| `about.json` | Stránka „Niečo o káve" — video, sekcie, Arabica/Robusta, časová os histórie kávy |

## Produkty podľa kategórií (160 spolu)

- **Káva (12):** zrnková 8, mletá 4
- **Kapsule (13):** FAP 6, POD 3, Nespresso 4
- **Čaj (19):** Ridgways 6, London 8, Heath & Heather 5
- **Čokoláda (2):** Il Doge
- **Sirupy (90):** Il Doge 38, Il Doge Coffee Line 13, Dreamy 39
- **Kávovary (24):** Fiorenzato 10, Faber 14 (kávovary Fiorenzato odkazujú na kavovaryfiorenzato.sk)

## Assets

- `../legacy-assets/img/` — zrkadlo všetkých 168 obrázkov zo starého webu (produkty, hero slidy, coffetree). Slúžia ako placeholder, kým nebudú nové fotky.
- `../types of products/` — nové referenčné product-shoty pre 6 kategórií (čierne pozadie): `zernovakava.png`, `mleta kava.png`, `capsulekava.png`, `cokolada.png`, `kavovar.png`, `sirup.png` → budú skopírované do `/img/categories/`.
- `../logo.png`, `../salka.jpeg` (referencia šálky pre hero video), `../mainvideoinstruction.png` (Higgsfield brief).

## Známe diery v obsahu (čakajú na klienta)

1. **Testimonials** — na starom webe len lorem ipsum → blok skrytý.
2. **Mlynce Fiorenzato** — filter existoval, ale nemal ani jeden produkt.
3. `historia_kavy.html` a `vero.html` boli 404 → obsah je na `/o-kave`.
4. Stará stránka čokolády mala breadcrumb „Sirupy" (bug) a len 2 produkty.
