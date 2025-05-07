const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//const TILE_SIZE = 43.34;
const TILE_SIZE = 31;
const ROWS = 21;
const COLS = 21;

const img_player = new Image();
img_player.src = "pic_ob/DBgirl.png";

const img_killer = new Image();
img_killer.src = "pic_ob/DBknife.png";

const img_exit = new Image();
img_exit.src = "pic_ob/DBhole.png"

const img_wall = new Image();
img_wall.src = "pic_ob/DBwall.png"

const img_trap = new Image();
img_trap.src = "pic_ob/DBtrap.png";

const bgImage = new Image();
bgImage.src = "pic_ob/dirt.png"

const SCALE = 2; // ขยายรูป x เท่า

const drawPlayer = () => {
  const drawWidth = 40;
  const drawHeight = TILE_SIZE * SCALE;

  // คำนวณให้ภาพขยายออกด้านบน/ซ้าย/ขวา แต่ไม่ล้นล่าง
  const offsetX = player.x * TILE_SIZE - (drawWidth - TILE_SIZE) / 2;
  const offsetY = player.y * TILE_SIZE - (drawHeight - TILE_SIZE);

  ctx.drawImage(img_player, offsetX, offsetY, drawWidth, drawHeight);
};

const drawKiller = () => {
  const drawWidth = 40;
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
};

// 0 = empty, 1 = wall, 2 = trap
const map = [
  [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 1],
  [0, 0, 1, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 2, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0], // 21 rowssss

];

function getRandomEmptyTile(exclude = [], minDistance = 0) {
  let tries = 0;
  while (tries < 1000) {
    const x = Math.floor(Math.random() * COLS);
    const y = Math.floor(Math.random() * ROWS);

    if (map[y][x] !== 0) continue;

    const tooClose = exclude.some(pos => 
      Math.abs(pos.x - x) + Math.abs(pos.y - y) < minDistance
    );

    if (!tooClose) {
      return { x, y };
    }

    tries++;
   
  }
  
  throw new Error("No valid spawn position found!");
}


// ใช้สุ่มตำแหน่งโดยไม่ให้ซ้ำกัน
player = getRandomEmptyTile();
killer = getRandomEmptyTile([player]);
exit = getRandomEmptyTile([player, killer]);
// let player = { x: 1, y: 19 };
// let killer = { x: 14, y: 2 };
// let exit = { x: 17, y: 7 }; // ทางออก
let wall = { x: 1, y: 1 }

img_player.onload = function () {
  requestAnimationFrame(drawMap); // เริ่ม loop เมื่อโหลดรูปเสร็จ
};


function drawMap() {
  // clear display 
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //ctx.drawImage(bgImage,0,0,canvas.width,canvas.height);
  //วาด กระดาน

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {

      // Wall
      if (map[y][x] === 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

        // Trap
      } else if (map[y][x] === 2) {

        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        ctx.drawImage(img_trap, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

        // Checker pattern
      } else {
        if ((x + y) % 2 == 0) {
          ctx.fillStyle = "#008b9d";
        } else {
          ctx.fillStyle = "#00a8be";
        }
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }

    }
  }
  for (const pos of killerTrail) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // สีแดงโปร่ง
    ctx.fillRect(pos.x * TILE_SIZE, pos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  drawExit();

  drawPlayer();

  drawKiller();



  requestAnimationFrame(drawMap); // loop ตลอดเวลา
}

function isPlayerWalkable(x, y) {
  return x >= 0 && x < COLS && y >= 0 && y < ROWS && map[y][x] !== 1;
}

function isKillerWalkable(x, y) {
  return x >= 0 && x < COLS && y >= 0 && y < ROWS && map[y][x] !== 1;
}


document.addEventListener("keydown", (e) => {
  let dx = 0, dy = 0;

  if (e.key === "w") dy = -1;
  if (e.key === "s") dy = 1;
  if (e.key === "a") dx = -1;
  if (e.key === "d") dx = 1;

  const newX = player.x + dx;
  const newY = player.y + dy;
  if (["w", "s", "a", "d"].includes(e.key)) {
    if (isPlayerWalkable(newX, newY)) {
      player.x = newX;
      player.y = newY;

      if (player.x === exit.x && player.y === exit.y) {
        drawMap();
        setTimeout(() => alert("💁🏻‍♂️You Win!"), 10);
      } else if (player.x === killer.x && player.y === killer.y) {
        setTimeout(() => alert('🧟‍♂️Killed'));
      }

      if (isTrap(player.x, player.y)) {
        // Player เหยียบ trap: ให้ killer เดินทันทีอีกครั้ง (นับเป็นเสียเทิร์น)
        moveKiller();
      }

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

function getNeighbors(pos, isForKiller = false) {
  const dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  return dirs
    .map(d => ({ x: pos.x + d.x, y: pos.y + d.y }))
    .filter(n => isForKiller ? isKillerWalkable(n.x, n.y) : isPlayerWalkable(n.x, n.y));
}


function reconstructPath(cameFrom, current) {
  const path = [current];
  while (cameFrom[`${current.x},${current.y}`]) {
    current = cameFrom[`${current.x},${current.y}`];
    path.unshift(current);
  }
  return path;
}

// Trap
function isTrap(x, y) {
  return map[y][x] === 2;
}

// Killer เดิน
let stack = 0;
// Trap 
let killerPaused = false;
// รอยเท้า
let killerTrail = [];

function moveKiller() {
  if (killerPaused) {
    killerPaused = false;
    return;
  }

  const path = aStar(killer, player);
  if (path.length <= 1) return;

  stack++;

  let steps = 1;
  if (stack % 2 === 0) {
    steps = 20;
  }

  // เดินตาม path ทีละก้าว โดยไม่ข้ามกำแพง
  for (let i = 1; i <= steps && i < path.length; i++) {
    killer = path[i];

    // บันทึกรอยเท้า
    killerTrail.push({ x: killer.x, y: killer.y });
    if (killerTrail.length > 20) killerTrail.shift(); // จำกัดจำนวนรอยเท้า

    if (isTrap(killer.x, killer.y)) {
      killerPaused = true;
      break; // หยุดเดินทันทีเมื่อเหยียบกับดัก
    }

    if (killer.x === player.x && killer.y === player.y) {
      setTimeout(() => alert("Game Over!"), 10);
      break;
    }
  }
}


drawMap();

function resetGame() {
  player = getRandomEmptyTile();
  killer = getRandomEmptyTile([player]);
  exit = getRandomEmptyTile([player, killer]);
  killerTrail = [];
  stack = 0;
  killerPaused = false;
}
