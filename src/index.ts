/*
 * Created by Jimmy Lan
 * Creation Date: 2020-11-23
 */

// scripts
import * as models from "./models";
import * as views from "./views";

// stylesheets
import "./styles/question.css";

const Blocks = { ...models, ...views };

declare global {
  interface Window {
    Blocks: typeof Blocks;
  }
}

window.Blocks = Blocks;

export default Blocks;
