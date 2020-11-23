/**
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 * Description:
 *    Rollup configuration file to bundle the library.
 *    Instruct rollup to produce outputs to the `dist` folder.
 */

import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

const input = "src/index.ts";

const banner = `/*!
 * interactive-blocks.js v${pkg.version}
 * ${pkg.homepage}
 * (c) ${new Date().getFullYear()} Jimmy Lan
 * Released under the MIT License
 */`;

export default [
  // Regular version
  {
    input,
    output: {
      name: "Interactive Blocks",
      file: "dist/interactive-blocks.js",
      indent: false,
      format: "umd",
      banner,
    },
    plugins: [typescript({ rollupCommonJSResolveHack: false, cleanup: true })],
  },

  // Minimized version
  {
    input,
    output: {
      name: "Interactive Blocks",
      file: "dist/interactive-blocks.min.js",
      indent: false,
      format: "umd",
    },
    plugins: [
      typescript({ rollupCommonJSResolveHack: false, cleanup: true }),
      terser({
        format: {
          preamble: banner,
        },
      }),
    ],
  },
];
