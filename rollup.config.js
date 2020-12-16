/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description:
 *    Rollup configuration file to bundle the library.
 *    Instruct rollup to produce outputs to the `dist` folder.
 */

import typescript from "rollup-plugin-typescript2";
import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";

import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import image from "@rollup/plugin-image";
import cssvariables from "postcss-css-variables";

import pkg from "./package.json";
import { variables } from "./src/config/cssvariables";

const input = "src/index.ts";

const banner = `/*! *****************************************************************************
 * interactive-blocks.js v${pkg.version}
 * ${pkg.homepage}
 * (c) ${new Date().getFullYear()} Jimmy Lan
 * Released under the MIT License
 ***************************************************************************** */`;

export default [
  // Regular version
  {
    input,
    output: {
      name: "InteractiveBlocks",
      file: "dist/interactive-blocks.js",
      indent: false,
      format: "iife",
      sourcemap: true,
      banner,
    },
    plugins: [
      typescript({ rollupCommonJSResolveHack: false, cleanup: true }),
      postcss({
        extensions: [".css"],
        plugins: [
          cssnano(),
          cssvariables({
            variables,
          }),
        ],
      }),
      cleanup({ sourcemap: true }),
      image(),
    ],
  },

  // Minimized version
  {
    input,
    output: {
      name: "InteractiveBlocks",
      file: "dist/interactive-blocks.min.js",
      indent: false,
      format: "iife",
      sourcemap: true,
    },
    plugins: [
      typescript({ rollupCommonJSResolveHack: false, cleanup: true }),
      postcss({
        extensions: [".css"],
        plugins: [
          cssnano(),
          cssvariables({
            variables,
          }),
        ],
        inject: { insertAt: "top" },
      }),
      image(),
      terser({
        format: {
          comments: false,
          preamble: banner,
        },
      }),
    ],
  },
];
