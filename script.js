// ===== CANVAS =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});


// ===== PARTICULAS DA PEDRA =====
let particles = [];

function createParticle() {

  // centro da base da pedra (mobile)
  const baseX = canvas.width * 0.50;
  const baseY = canvas.height * 0.58;

  return {
    x: baseX + (Math.random() * 80 - 40),
    y: baseY + (Math.random() * 20 - 10),

    vx: (Math.random() - 0.5) * 0.25,
    vy: -Math.random() * 1.8 - 0.5,

    size: Math.random() * 2 + 1,

    alpha: 1
  };
}

function initParticles() {

  particles = [];

  for (let i = 0; i < 160; i++) {
    particles.push(createParticle());
  }

}

initParticles();


// ===== LOOP =====
function animate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {

    p.x += p.vx;
    p.y += p.vy;

    p.alpha -= 0.008;

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(180,0,255,${p.alpha})`;

    ctx.shadowColor = "#b400ff";
    ctx.shadowBlur = 18;

    ctx.fill();

    if (p.alpha <= 0) {
      particles[index] = createParticle();
    }

  });

  requestAnimationFrame(animate);
}

animate();


// ===== HASH =====
function gerarHash() {
  return Math.random()
    .toString(36)
    .substring(2, 10);
}


// ===== ALMA =====
function gerarAlma() {

  const nomes = [
    "Aether",
    "Nyx",
    "Vortex",
    "Orion",
    "Eclipse"
  ];

  const tipos = [
    "Arcano",
    "Caótico",
    "Luminar",
    "Sombrio"
  ];

  return {

    nome:
      nomes[
        Math.floor(
          Math.random() * nomes.length
        )
      ],

    tipo:
      tipos[
        Math.floor(
          Math.random() * tipos.length
        )
      ],

    nivel:
      Math.floor(
        Math.random() * 100
      ),

    energia:
      Math.floor(
        Math.random() * 1000
      ),

    hash: gerarHash()
  };

}


// ===== BOTAO =====
function gerar() {

  const status =
    document.getElementById("status");

  const card =
    document.getElementById("card");

  status.innerText =
    "Canalizando energia...";

  card.className = "card";
  card.innerHTML = "";

  setTimeout(() => {

    const alma =
      gerarAlma();

    let raridade = "comum";

    if (alma.nivel > 70)
      raridade = "raro";

    if (alma.nivel > 90)
      raridade = "lendario";

    card.classList.add(
      raridade
    );

    card.innerHTML = `
      <h2>${alma.nome}</h2>

      <p>
        Hash:
        ${alma.hash}
      </p>

      <p>
        ${alma.tipo}
      </p>

      <p>
        Nível:
        ${alma.nivel}
      </p>

      <p>
        Energia:
        ${alma.energia}
      </p>

      <p>
        ${raridade.toUpperCase()}
      </p>
    `;

    card.classList.add(
      "show"
    );

    status.innerText =
      "Entidade materializada";

  }, 1200);

}
