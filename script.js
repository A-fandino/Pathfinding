const grid = document.querySelector(".grid");

let [x, y] = [50, 50];
let color = "black";
let cArr = [];

let start, end;

grid.style.gridTemplateColumns = `repeat(${x}, auto)`;

for (let i = 0; i < x; i++) {
  cArr.push([]);
  for (let j = 0; j < y; j++) {
    const child = document.createElement("div");
    child.className = `${i}-${j} grid-child`;
    child.dataset.column = i;
    child.dataset.row = j;
    // child.innerHTML = `${i},${j}`;
    cArr[i].push(child);
    grid.appendChild(child);
  }
}

grid.oncontextmenu = function (e) {
  e.preventDefault();
};

["mousedown", "mouseover"].forEach((ev) =>
  grid.addEventListener(ev, changeColor)
);

const op = document.querySelector(".options");
op.addEventListener("click", function (e) {
  for (let f of op.children) {
    if (f.checked) {
      color = f.value;
      break;
    }
  }
});

function changeColor(e) {
  if (e.target.classList.contains("grid-child")) {
    if (e.buttons === 1 || e.type !== "mouseover") {
      if (e.target.style.backgroundColor === "cyan") start = undefined;
      if (e.target.style.backgroundColor === "orange") end = undefined;

      if (color == "cyan") {
        if (start) cArr[start[0]][start[1]].style.backgroundColor = "white";

        start = [e.target.dataset.column * 1, e.target.dataset.row * 1];
      }
      if (color == "orange") {
        if (end) cArr[end[0]][end[1]].style.backgroundColor = "white";
        end = [e.target.dataset.column * 1, e.target.dataset.row * 1];
      }
      e.target.style.backgroundColor = color;
    }
  }
}

//COLUMN
// cArr.forEach((row) => {
//   console.log(row);
//   row[e.target.dataset.column].style.backgroundColor = color;
// });

//ROW
// cArr[e.target.dataset.row].forEach((column) => {
//   column.style.backgroundColor = color;
// });
