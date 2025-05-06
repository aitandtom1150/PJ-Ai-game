const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 50;
const ROWS = 15;
const COLS = 15;

const img_player = new Image();
img_player.src = "pic_ob/DBgirl.png";

const img_killer = new Image();
img_killer.src = "pic_ob/DBknife.png";

const img_exit = new Image();
img_exit.src = "pic_ob/DBhole.png"


const SCALE = 1.5; // ขยายรูป x เท่า

const drawPlayer = () => {
  const drawWidth = 60;
  const drawHeight = TILE_SIZE * SCALE;

  // คำนวณให้ภาพขยายออกด้านบน/ซ้าย/ขวา แต่ไม่ล้นล่าง
  const offsetX = player.x * TILE_SIZE - (drawWidth - TILE_SIZE) / 2;
  const offsetY = player.y * TILE_SIZE - (drawHeight - TILE_SIZE);

  ctx.drawImage(img_player, offsetX, offsetY, drawWidth, drawHeight);
};

const drawKiller = () => {
  const drawWidth = 60;
  const drawHeight = TILE_SIZE * SCALE;

  // คำนวณให้ภาพขยายออกด้านบน/ซ้าย/ขวา แต่ไม่ล้นล่าง
  const offsetX = killer.x * TILE_SIZE - (drawWidth - TILE_SIZE) / 2;
  const offsetY = killer.y * TILE_SIZE - (drawHeight - TILE_SIZE);

  ctx.drawImage(img_killer, offsetX, offsetY, drawWidth, drawHeight);
};

const drawExit = () => {
  const drawWidth = 60;
  const drawHeight = TILE_SIZE * SCALE;

  const offsetX = exit.x * TILE_SIZE - (drawWidth - TILE_SIZE) / 2;
  const offsetY = exit.y * TILE_SIZE - (drawHeight - TILE_SIZE);

  ctx.drawImage(img_exit, offsetX, offsetY, drawWidth, drawHeight);
}


// 0 = empty, 1 = wall, 2 = trap
const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 15 rowssss

];

let player = { x: 0, y: 14 };
let killer = { x: 9, y: 2 };
let exit = { x: 14, y: 0 }; // ทางออก

img_player.onload = function () {
  requestAnimationFrame(drawMap); // เริ่ม loop เมื่อโหลดรูปเสร็จ
};
img_killer.onload = function () {
  requestAnimationFrame(drawMap); // เริ่ม loop เมื่อโหลดรูปเสร็จ
};
function drawMap() {
  // clear display 
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //วาด กระดาน
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      // wall
      if (map[y][x] === 1) {
        ctx.fillStyle = "#555";
      } else if (map[y][x] === 2) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = "#558073";
      }
      ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.3;
      ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }

  drawPlayer();

  drawKiller();

  drawExit();

  requestAnimationFrame(drawMap); // loop ตลอดเวลา
}

function isWalkable(x, y) {
  // COLS = 15 , ROWS = 15
  return x >= 0 && x < COLS && y >= 0 && y < ROWS && map[y][x] === 0;
}

document.addEventListener("keydown", (e) => {
  let dx = 0, dy = 0;

  if (e.key === "ArrowUp") dy = -1;
  if (e.key === "ArrowDown") dy = 1;
  if (e.key === "ArrowLeft") dx = -1;
  if (e.key === "ArrowRight") dx = 1;

  const newX = player.x + dx;
  const newY = player.y + dy;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    if (isWalkable(newX, newY)) {
      player.x = newX;
      player.y = newY;

      if (player.x === exit.x && player.y === exit.y) {
        drawMap();
        setTimeout(() => alert("💁🏻‍♂️You Win!"), 10);
      } else if (player.x === killer.x && player.y === killer.y) {
        setTimeout(() => alert('🧟‍♂️Killed'));
      }

      // เรียก moveKiller() เมื่อ Player ขยับได้เท่านั้น
      moveKiller();
    }
  }

  drawMap();
});

// A star
function aStar(start, goal) {
  const openSet = [start];
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  function key(pos) {
    return `${pos.x},${pos.y}`;
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      gScore[key({ x, y })] = Infinity;
      fScore[key({ x, y })] = Infinity;
    }
  }

  gScore[key(start)] = 0;
  fScore[key(start)] = heuristic(start, goal);

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[key(a)] - fScore[key(b)]);
    const current = openSet.shift();

    if (current.x === goal.x && current.y === goal.y) {
      return reconstructPath(cameFrom, current);
    }

    for (const neighbor of getNeighbors(current)) {
      const tentativeG = gScore[key(current)] + 1;
      if (tentativeG < gScore[key(neighbor)]) {
        cameFrom[key(neighbor)] = current;
        gScore[key(neighbor)] = tentativeG;
        fScore[key(neighbor)] = tentativeG + heuristic(neighbor, goal);

        if (!openSet.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return []; // no path
}


function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan distance
}

function getNeighbors(pos) {
  const dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  return dirs
    .map(d => ({ x: pos.x + d.x, y: pos.y + d.y }))
    .filter(n => isWalkable(n.x, n.y));
}

function reconstructPath(cameFrom, current) {
  const path = [current];
  while (cameFrom[`${current.x},${current.y}`]) {
    current = cameFrom[`${current.x},${current.y}`];
    path.unshift(current);
  }
  return path;
}

// Killer เดิน
let stack = 0;
function moveKiller() {
  const path = aStar(killer, player);
  if (path.length > 1) {
    stack++;
    if (stack % 2 == 0) {
      killer = path[0]; // เดินทีละช่อง
    } else if (stack % 3 == 0) {
      killer = path[Math.min(3, path.length - 1,)]; //เดินทีละ ช่อง แต่ 2 ครั้ง}
    } else {
      killer = path[Math.min(2, path.length - 1,)]; //เดินทีละ ช่อง แต่ 2 ครั้ง}
      console.log(stack);

    }

    if (killer.x === player.x && killer.y === player.y) {
      setTimeout(() => alert("Game Over!"), 10);
    }
  }
}

drawMap();
