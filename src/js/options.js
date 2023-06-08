// @flow

import { render } from "preact";
import { Options } from "./ui/options";

document.addEventListener("DOMContentLoaded", () => {
  render(<Options />, document.body);
});
