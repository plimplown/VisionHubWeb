// 3D Neon Animated Canvas Background
const canvas = document.getElementById('bg-canvas');
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  let width, height;
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const blobs = Array.from({length: 4}, (_,i)=>({
    x: Math.random()*window.innerWidth,
    y: Math.random()*window.innerHeight,
    r: 180 + Math.random()*80,
    dx: 0.8 + Math.random()*1.5,
    dy: 0.8 + Math.random()*1.5,
    t: Math.random()*360,
    color: ["#3494fa66","#2ab0e966","#3494fa44","#2ab0e944"][i%4]
  }));
  function drawBlobs() {
    ctx.clearRect(0,0,width,height);
    blobs.forEach(blob=>{
      ctx.save();
      ctx.globalAlpha = 0.50;
      ctx.beginPath();
      ctx.arc(blob.x,blob.y,blob.r,0,2*Math.PI);
      let g = ctx.createRadialGradient(blob.x,blob.y,blob.r*0.1,blob.x,blob.y,blob.r);
      g.addColorStop(0, blob.color);
      g.addColorStop(1, "#0d132100");
      ctx.fillStyle = g;
      ctx.shadowColor = "#3494fa";
      ctx.shadowBlur = 60;
      ctx.fill();
      ctx.restore();
      // Animate
      blob.x += Math.sin(blob.t/60)*blob.dx;
      blob.y += Math.cos(blob.t/60)*blob.dy;
      blob.t += 0.8;
      if(blob.x-blob.r>width) blob.x=-blob.r;
      if(blob.x+blob.r<0) blob.x=width+blob.r;
      if(blob.y-blob.r>height) blob.y=-blob.r;
      if(blob.y+blob.r<0) blob.y=height+blob.r;
    });
    requestAnimationFrame(drawBlobs);
  }
  drawBlobs();
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.onclick = ()=>{
    navLinks.classList.toggle('open');
  };
}