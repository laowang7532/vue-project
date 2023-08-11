import CanvasNest  from "canvas-nest.js";

const config = {
  color: "255,255,255",
  count: 100,
  opacity: 0.5,
  zIndex: 1,
};

new CanvasNest(document.querySelector("body"), config);

