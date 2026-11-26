# stats-site-01

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Jipitan55/stats-site-01/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Jipitan55/stats-site-01/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Nippon Numbers** — Japan, in numbers. A complete national statistics site for
Japan: population, economy, labour, prices, government finance and all 47
prefectures, with real figures from the Statistics Bureau of Japan, the
Cabinet Office, the Ministry of Health, Labour and Welfare, the Bank of Japan
and the IMF — every figure carrying its source and year. Hand-drawn SVG charts
(a population pyramid you can scrub from 1950 to the 2050 projection, GDP and
wage toggles between nominal and real, headline vs core CPI against the Bank of
Japan's 2% target, and a tile map of all 47 prefectures), per-section tables
downloadable as CSV, and a Sources & methods page. Plain static files, no
build step, no network requests, works on desktop and phone.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Then serve `out/app` (or `app/`) with any static server, e.g.
`python3 -m http.server` from inside `app/`, and open `index.html`.
