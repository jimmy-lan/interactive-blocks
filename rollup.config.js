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
import image from "@rollup/plugin-image";
import styles from "rollup-plugin-styles";

import pkg from "./package.json";

const input = "src/index.ts";

const banner = `/*! *****************************************************************************
 * interactive-blocks.js v${pkg.version}
 * ${pkg.homepage}
 * Copyright (c) ${new Date().getFullYear()} Jimmy Lan
 * Released under the MIT License
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
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
      styles({
        mode: [
          "inject",
          {
            container: "head",
            singleTag: true,
            prepend: true,
            minimize: true,
            // attributes: { id: "ib-styles" },
          },
        ],
        minimize: true,
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
      styles({
        mode: [
          "inject",
          {
            container: "head",
            singleTag: true,
            prepend: true,
            // attributes: { id: "ib-styles" },
          },
        ],
        minimize: true,
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
