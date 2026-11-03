# A Human Future site

[![Netlify Status](https://api.netlify.com/api/v1/badges/51156c5a-e1cf-4e14-ba04-bb21fbffbb81/deploy-status)](https://app.netlify.com/projects/ahf-c0b5c2/deploys)

The studio website at [ahumanfuture.co](https://ahumanfuture.co), built with [Eleventy](https://www.11ty.dev/) and [Sass](https://sass-lang.com/) and hosted on Netlify.

## Getting started

You’ll need Node 22 or newer. With [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to pick up the version in `.nvmrc`.

1. Run `npm install`
2. Run `npm start` to build the CSS, watch for changes and serve the site at http://localhost:8080
3. Run `npm run production` to do a prod build into `dist/`

## How it fits together

- `src/*.njk` are the pages, using the layout and partials in `src/_includes`
- `src/_data` holds site-wide data (site details, navigation, the current year)
- `src/scss` is compiled by Sass to `dist/css/global.css`. Design tokens live in `_config.scss` and are applied through [gorko](https://github.com/Andy-set-studio/gorko) in `_gorko.scss`
- `src/js`, `src/fonts`, `src/images` and `src/audio` are copied to `dist` as they are. Pages can add their own scripts and stylesheets with `pageScripts` and `pageStylesheets` in front matter
- CSS and JS links go through the `assetUrl` filter in `eleventy.config.js`, which adds a hash of the file's contents for cache-busting
- `src/_headers` sets Netlify response headers (security policy and caching)

## Deploying

Pushing to `main` deploys to production, and pull requests get a deploy preview. To use the [Netlify CLI](https://docs.netlify.com/cli/get-started/) from this folder, run `netlify login` and then `netlify link`.
