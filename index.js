const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Create random circles
const circles = Array.from({ length: 7 }, () => {

  const color = Math.random() * 360;
 return {
  x: Math.random() * w,
  y: Math.random() * h,
  r: 100 + Math.random() * 150, // radius
  dx: (Math.random() - 0.5) * 0.2, // velocity X
  dy: (Math.random() - 0.5) * 0.2, // velocity Y
  color: color,
}});

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (let c of circles) {
    // Move
    c.x += c.dx;
    c.y += c.dy;

    // Wrap around edges
    if (c.x - c.r > w) c.x = -c.r;
    if (c.x + c.r < 0) c.x = w + c.r;
    if (c.y - c.r > h) c.y = -c.r;
    if (c.y + c.r < 0) c.y = h + c.r;

    c.color = (c.color+(Math.random()*0.2))%360;

    // recolor
    c.light = `hsla(${c.color},100%,55%,1)`;
    c.dark = `hsla(${c.color},100%,40%,1)`;

    // Draw gradient circle
    const grad = ctx.createRadialGradient(c.x, c.y, c.r, c.x, c.y, 0);
    grad.addColorStop(1, c.dark);
    grad.addColorStop(0, c.light);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();
