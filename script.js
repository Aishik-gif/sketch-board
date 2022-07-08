let color = "black";
let gridSize = document.querySelector(".slider").value;

const isRgba = /^rgba\([\d]{1,3}, [\d]{1,3}, [\d]{1,3}, [\d].[\d]\)$/;
const isRgb = /^rgb\([\d]{1,3}, [\d]{1,3}, [\d]{1,3}\)$/;

let colorGrid = function (e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (color === "rainbow") {
    this.style.backgroundColor = `rgba(${randColor()},${randColor()},${randColor()},0.9)`;
  } else if (color === "gray-scale") {
    let a = parseInt(
      this.style.backgroundColor[this.style.backgroundColor.length - 2]
    );
    if (this.style.backgroundColor === "white") {
      this.style.backgroundColor = `rgba(0,0,0,0.1)`;
    } else {
      if (a < "9" && !isRgb.test(this.style.backgroundColor)) {
        a += 1;
        this.style.backgroundColor = `rgba(0,0,0,0.${a})`;
      } else if (isRgba.test(this.style.backgroundColor) || this.style.backgroundColor === "black" || isRgb.test(this.style.backgroundColor)){
        this.style.backgroundColor = `rgba(0,0,0,0.1)`;
      }
    }
  } else {
    this.style.backgroundColor = color;
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
  if (color === "white") {
    color = picker.value;
    eraser.classList.remove("select");
    drawDefault.classList.add("select");
  }
  grid.innerHTML = "";
  createGrid();
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
drawDefault.classList.add("select");
drawDefault.addEventListener("click", () => {
  color = picker.value;
  drawDefault.classList.add("select");
  eraser.classList.remove("select");
  rainbow.classList.remove("select");
  gray.classList.remove("select");
});

const eraser = document.querySelector("button.eraser");
eraser.addEventListener("click", () => {
  color = "white";
  drawDefault.classList.remove("select");
  eraser.classList.add("select");
  rainbow.classList.remove("select");
  gray.classList.remove("select");
});

const rainbow = document.querySelector("button.rainbow");
rainbow.addEventListener("click", () => {
  color = "rainbow";
  drawDefault.classList.remove("select");
  eraser.classList.remove("select");
  rainbow.classList.add("select");
  gray.classList.remove("select");
});

const picker = document.querySelector("input.picker");
picker.addEventListener("input", (e) => {
  color = e.target.value;
  drawDefault.classList.add("select");
  eraser.classList.remove("select");
  rainbow.classList.remove("select");
  gray.classList.remove("select");
});

const gray = document.querySelector("button.grayscale");
gray.addEventListener("click", () => {
  color = "gray-scale";
  gray.classList.add("select");
  drawDefault.classList.remove("select");
  eraser.classList.remove("select");
  rainbow.classList.remove("select");
});

function randColor() {
  return Math.floor(Math.random() * (255 - 0 + 1));
}

window.onload = createGrid();

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);