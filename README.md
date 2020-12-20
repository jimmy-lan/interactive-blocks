# Introduction

InteractiveBlocks.js is a front-end javascript library allowing developers to easily create interactive components anywhere on their webpage.

# Documentation

Landing Page: https://interactive-blocks.xyz

API Docs: https://interactive-blocks.xyz/#/api-docs/base-classes/attribute-registry

Guides: https://interactive-blocks.xyz/#/guides/multiple-choice

# To Grader (only on CSC309 GitHub Repo)

It's a busy time for everyone, so I totally understand that you may be lacking time to read my project in full. However, if there is one thing that I want you to take away from this project, it will be its flexibility and extendability.

**This is not a simple "create some questions" javascript library.** It is probably very different from some other project (I will say _most_ other projects) that you would encounter in CSC309. This project is more about "interactive components made easy" for developers.
InteractiveBlocks.js allows a very high degree of customization, but is designed in a smart way so that it is not difficult to get started. **Please** don't assume this is a regular CSC309 library and let that work go to waste. I'm very appreciated!

InteractiveBlocks.js can also be suitable for those who want a lightweight solution (i.e. not to setup the entire React framework), or for some projects that just want to upgrade some html elements to become reusable and not wanting to have trouble dealing with a partial React usage.

My goal is to create a library that is flexible and extendable enough so that I will be willing to use it in my projects.
Please have a good read in the `Guides` section to learn more.

The documentation engine that I am using generates html on the fly, and has a very bad performance when deployed to heroku. I could not satisfy that requirement due to support.

Thank you for grading the project.

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
<script src="https://cdn.jsdelivr.net/npm/interactive-blocks@1.0.2/dist/interactive-blocks.min.js"></script>
```

## Source Maps

Source maps are provided with the library. If you install InteractiveBlocks.js via npm or downloaded a local copy, you can find source map files in the folder `dist`.

You may also include a copy of the source map file for `interactive-blocks.min.js` via the following cdn:

```html
<script src="https://cdn.jsdelivr.net/npm/interactive-blocks@1.0.2/dist/interactive-blocks.min.js.map"></script>
```

## Type Definitions

InteractiveBlocks.js is written with Typescript.
You can find a copy of the type definition files in the `dist` folder.
Please start by looking at `index.d.ts`.
