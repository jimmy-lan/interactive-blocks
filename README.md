# Introduction

InteractiveBlocks.js is a front-end javascript library allowing developers to easily create interactive components anywhere on their webpage.
Currently, you can mount questions and score panels on your page using the pre-built components.
You may also extend the library and use it as a "lightweight" React.

Please check out this quick start guide on what the library can do: https://interactive-blocks.xyz/#/quick-start/installation.

# Documentation

Landing Page: https://interactive-blocks.xyz

API Docs: https://interactive-blocks.xyz/#/api-docs/base-classes/attribute-registry

Guides: https://interactive-blocks.xyz/#/guides/multiple-choice

# Installation

InteractiveBlocks.js can be installed via npm or through a CDN. You may also save a copy of this library and include it using a script tag.

## Installation Methods

### Local

```html
<script src="interactive-blocks.js"></script>
```

or

```html
<script src="interactive-blocks.min.js"></script>
```

### NPM

```bash
npm install interactive-blocks
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/interactive-blocks@1.0.5/dist/interactive-blocks.min.js"></script>
```

## Source Maps

Source maps are provided with the library. If you install InteractiveBlocks.js via npm or downloaded a local copy, you can find source map files in the folder `dist`.

You may also include a copy of the source map file for `interactive-blocks.min.js` via the following cdn:

```html
<script src="https://cdn.jsdelivr.net/npm/interactive-blocks@1.0.5/dist/interactive-blocks.min.js.map"></script>
```

## Type Definitions

InteractiveBlocks.js is written with Typescript.
You can find a copy of the type definition files in the `dist` folder.
Please start by looking at `index.d.ts`.

## Local Compilation

You can compile the `dist` folder locally on your machine, by running the following commands.

**One-time Build:**

```bash
npm run build
```

**Automatic Builds:**

```bash
npm run dev
```

## Credit

The design of some prebuilt components were inspired by Google's material design.

The arrow-right icon was taken from Google's Material Design Icons. Thanks to Google!

**Note: InteractiveBlocks.js has no production dependencies.**
