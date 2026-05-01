const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* PARTICULAS ROXAS BASE */
let particles = [];

function createParticle() {
  return {
    x: canvas.width / 2 + (Math.random() * 120 - 60),
    y: canvas.height - 220,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -Math.random() * 2 - 1,
    size: Math.random() * 2 + 1,
    alpha: 1
  };
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push(createParticle());
  }
}
initParticles();

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.008;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(180, 0, 255, ${p.alpha})`;
    ctx.shadowColor = "#b400ff";
    ctx.shadowBlur = 20;

    ctx.fill();

    if (p.alpha <= 0) {
      particles[i] = createParticle();
    }
  });

  requestAnimationFrame(loop);
}
loop();

/* IA */
function gerarHash() {
  return Math.random().toString(36).substring(2, 10);
}

function gerarAlma() {
  const nomes = ["Aether","Nyx","Vortex","Orion","Eclipse"];
  const tipos = ["Arcano","Caótico","Luminar","Sombrio"];

  return {
    nome: nomes[Math.floor(Math.random()*nomes.length)],
    tipo: tipos[Math.floor(Math.random()*tipos.length)],
    nivel: Math.floor(Math.random()*100),
    energia: Math.floor(Math.random()*1000),
    hash: gerarHash()
  };
}

function gerar(){
  const status = document.getElementById("status");
  const card = document.getElementById("card");

  status.innerText = "Gerando alma...";

  setTimeout(()=>{
    const alma = gerarAlma();

    let raridade = "comum";
    if(alma.nivel > 70) raridade = "raro";
    if(alma.nivel > 90) raridade = "lendario";

    card.className = "card " + raridade;

    card.innerHTML = `
      <h2>${alma.nome}</h2>
      <p>Hash: ${alma.hash}</p>
      <p>${alma.tipo}</p>
      <p>Nível: ${alma.nivel}</p>
      <p>Energia: ${alma.energia}</p>
      <p>${raridade.toUpperCase()}</p>
    `;

    card.classList.add("show");
    status.innerText = "Entidade materializada";
  },1200);
      }
