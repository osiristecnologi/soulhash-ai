// ===== CANVAS =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ===== PARTICULAS ROXAS (BASE DA PEDRA) =====
let particles = [];

function createParticle() {
  return {
    x: canvas.width / 2 + (Math.random() * 120 - 60),
    y: canvas.height - 120,
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

// ===== LOOP =====
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

// ===== HASH =====
function gerarHash() {
  return Math.random().toString(36).substring(2, 10);
}

// ===== TEXTO DECODIFICANDO =====
function decodeText(element, finalText) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%";
  let iterations = 0;

  const interval = setInterval(() => {
    element.innerText = finalText
      .split("")
      .map((letter, index) => {
        if (index < iterations) return finalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iterations >= finalText.length) {
      clearInterval(interval);
    }

    iterations += 0.5;
  }, 40);
}

// ===== GERAR ALMA =====
function gerarAlma() {
  const nomes = ["Aether", "Nyx", "Vortex", "Orion", "Eclipse"];
  const tipos = ["Arcano", "Caótico", "Luminar", "Sombrio"];

  return {
    nome: nomes[Math.floor(Math.random() * nomes.length)],
    tipo: tipos[Math.floor(Math.random() * tipos.length)],
    nivel: Math.floor(Math.random() * 100),
    energia: Math.floor(Math.random() * 1000),
    hash: gerarHash()
  };
}

// ===== EXECUÇÃO =====
function gerar() {
  const status = document.getElementById("status");
  const card = document.getElementById("card");

  status.innerText = "Canalizando energia...";

  setTimeout(() => {
    const alma = gerarAlma();

    card.innerHTML = `
      <h2 id="nome"></h2>
      <p>Hash: ${alma.hash}</p>
      <p>Tipo: ${alma.tipo}</p>
      <p>Nível: ${alma.nivel}</p>
      <p>Energia: ${alma.energia}</p>
    `;

    decodeText(document.getElementById("nome"), alma.nome);

    status.innerText = "Entidade materializada";
  }, 1200);
               }
