const BLOCKED_COLORS = ["black", "red"];

document.querySelector("#find").onclick = function (e) {
  if (start && end) {
    clearColor(["cyan", "orange", "black"]);
    let OPEN = [];
    let CLOSED = [];
    const NEIGHBOURS = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    let curNode = { x: start[0], y: start[1] };
    while (curNode.x != end[0] || curNode.y != end[1]) {
      let smaller;
      OPEN.filter((val) => val.x != curNode.x && val.y != curNode.y);
      CLOSED.push(curNode);
      cArr[curNode.x][curNode.y].style.backgroundColor = "red";

      for (let neigh of NEIGHBOURS) {
        const [xNeigh, yNeigh] = [curNode.x + neigh[0], curNode.y + neigh[1]];
        if (xNeigh < 0 || yNeigh < 0) continue;
        // if (end[0] == xNeigh && end[1] == yNeigh) {
        //   smaller = { x: xNeigh, y: yNeigh };
        //   break;
        // }

        let currentNeigh = [xNeigh, yNeigh];
        let node = cArr[currentNeigh[0]][currentNeigh[1]];
        if (node && IsWalkable(node)) {
          //DISTANCE CALC
          const G = CalcG(currentNeigh);
          const H = neigh[0] === 0 || neigh[1] === 0 ? 10 : 14; //If neigh has a 0 it's not diagonal
          const F = G + H;

          const neigObj = { x: currentNeigh[0], y: currentNeigh[1], G, H, F };

          //STYLING
          node.style.backgroundColor = "lightblue";
          // node.innerHTML = `${G} , ${H} <br> ${F} - (${xNeigh}, ${yNeigh})`;

          if (!smaller || smaller.F > F) smaller = neigObj; //Search for the smallest F cost

          OPEN.push({ x: currentNeigh[0], y: currentNeigh[1], G, H, F });
        }
      }
      if (!smaller) {
        alert("Could not find path");
        break;
      }
      curNode = smaller;
    }
    cArr[curNode.x][curNode.y].style.backgroundColor = "yellow";
    return;
  }

  alert("No cyan or orange");
};

function CalcG(node) {
  let diff = Math.abs(end[0] - node[0]) + Math.abs(end[1] - node[1]);
  diff *= 10;
  return diff;
}

function IsWalkable(node) {
  let sqColor = node.style.backgroundColor;
  return !BLOCKED_COLORS.includes(sqColor);
}

function clearColor(ignoreList) {
  ignoreList = ignoreList || [];
  cArr.forEach((column) => {
    column.forEach((val) => {
      const col = val.style.backgroundColor;
      if (!ignoreList.includes(col)) {
        if (col === "cyan") start = undefined;
        if (col === "orange") end = undefined;
        val.style.backgroundColor = "white";
        val.innerHTML = "";
      }
    });
  });
}
