/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

// scripts
import * as models from "./models";
import * as views from "./views";

// stylesheets
import "./styles/main.css";

const Blocks = { ...models, ...views };
// @ts-ignore
window.Blocks = Blocks;

export default Blocks;
