export const slideSkills = ()=>{
    document.querySelectorAll('.slideSkill').forEach(slide => {
  const canvas = slide.querySelector('.hackerCanvas');
  const ctx = canvas.getContext('2d');

  function updateCanvasSize() {
    canvas.width = slide.offsetWidth;
    canvas.height = slide.offsetHeight;
  }

  updateCanvasSize();
  window.addEventListener('resize', updateCanvasSize);

  const fontSize = 12;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(1);

  const codeLines = [
    "init(){",
    "console.log('Hack');",
    "fetch('/api/data')",
    "while(true){break;}",
    "root@term:~$",
    "cd /var/www",
    "npm install"
  ];

  let mouseX = 0, mouseY = 0;

  slide.addEventListener("mousemove", (e) => {
    const rect = slide.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = codeLines[Math.floor(Math.random() * codeLines.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      const dx = Math.abs(x - mouseX);
      const dy = Math.abs(y - mouseY);
      const dist = Math.sqrt(dx * dx + dy * dy);

      ctx.fillStyle = dist < 60 ? "#0ff" : "#0f0";
      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.95) drops[i] = 0;
      drops[i]++;
    }
  }

  let animationId;
  slide.addEventListener('mouseenter', () => {
    updateCanvasSize();
    animationId = setInterval(draw, 50);
  });

  slide.addEventListener('mouseleave', () => {
    clearInterval(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
});
}