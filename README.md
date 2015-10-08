# StopLight Website

This folder is the source code for [StopLight](http://stoplight.io)'s website.
It is a [Jekyll](http://jekyllrb.com/) website hosted on GitHub pages.

## Requirements

- [npm](https://www.npmjs.com/)
- [Bundler](http://bundler.io/)

## Installation

```bash
gem install bundler
npm install
```

If you will get `ERROR:  Error installing nokogiri: ERROR: Failed to build gem
native extension.` during `npm install`, run this command:

```bash
xcode-select --install
```

## Running locally

```bash
npm start
```

## Deploying

This will deploy to GitHub pages:

```bash
npm run deploy
```
