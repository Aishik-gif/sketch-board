let color = "black";
let gridSize = document.querySelector(".slider").value;

let colorGrid = function (e) {
  if (e.type === "mouseover" && !mouseDown) return;
  switch (color) {
    case "black":
      this.style.backgroundColor = color;
      break;
    case "white":
      this.style.backgroundColor = color;
      break;
  }
};

document.querySelector(".slider-value").innerText = `${gridSize} x ${gridSize}`;
const slider = document.querySelector(".slider");
slider.addEventListener("input", (e) => {
  gridSize = e.target.value;
  pixelSize = 400 / gridSize;
  reset();
  document.querySelector(
    ".slider-value"
  ).innerText = `${gridSize} x ${gridSize}`;
});

let pixelSize = 400 / gridSize;
const grid = document.querySelector("#grid-table");

function createGrid() {
  for (let i = 0; i < gridSize; i++) {
    const rc = document.createElement("div");
    grid.appendChild(rc);
    rc.style.display = "flex";
    rc.className = "row";
    rc.style.width = `400px`;
    rc.style.height = `${pixelSize}px`;
    for (let j = 0; j < gridSize; j++) {
      const r = document.createElement("div");
      rc.appendChild(r);
      r.className = "column";
      r.style.width = `${pixelSize}px`;
      r.style.height = `${pixelSize}px`;
      r.style.backgroundColor = "white";
    }
  }
  draw();
}

function reset() {
  if (color === "white") color = "black";
  grid.innerHTML = "";
  createGrid();
  draw();
}

let mouseDown = false;
document.addEventListener("mousedown", () => {
  mouseDown = true;
});
document.addEventListener("mouseup", () => {
  mouseDown = false;
});

function draw() {
  const gridPixels = document.querySelectorAll("div.column");
  gridPixels.forEach((pixel) => pixel.addEventListener("mouseover", colorGrid));
  gridPixels.forEach((pixel) => pixel.addEventListener("mousedown", colorGrid));
}

const resetButton = document.querySelector("button.reset");
resetButton.addEventListener("click", reset);

const drawDefault = document.querySelector("button.default");
drawDefault.addEventListener("click", () => (color = "black"));

const eraser = document.querySelector("button.eraser");
eraser.addEventListener("click", () => (color = "white"));

window.onload = createGrid();
