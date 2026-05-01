const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width/2, y: canvas.height/2 };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

/* PARTICULAS QUE SEGUEM O MOUSE */
let particles = [];

for(let i=0;i<120;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    vx: 0,
    vy: 0
  });
}

function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;

    p.vx += dx * 0.0005;
    p.vy += dy * 0.0005;

    p.x += p.vx;
    p.y += p.vy;

    ctx.fillStyle = "#00ffe1";
    ctx.fillRect(p.x, p.y, 2, 2);
  });

  requestAnimationFrame(loop);
}
loop();

/* HASH REAL (SIMPLES) */
function gerarHash() {
  return Math.random().toString(36).substring(2, 10);
}

/* TEXTO DECODIFICANDO */
function decodeText(element, finalText) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%";
  let iterations = 0;

  const interval = setInterval(() => {
    element.innerText = finalText
      .split("")
      .map((letter, index) => {
        if(index < iterations) return finalText[index];
        return chars[Math.floor(Math.random()*chars.length)];
      })
      .join("");

    if(iterations >= finalText.length){
      clearInterval(interval);
    }

    iterations += 0.5;
  }, 40);
}

/* GERAR ALMA EVOLUÍDO */
function gerarAlma() {
  const nomes = ["Aether","Nyx","Vortex","Orion","Eclipse"];
  const tipos = ["Arcano","Caótico","Luminar","Sombrio"];

  const hash = gerarHash();

  return {
    nome: nomes[Math.floor(Math.random()*nomes.length)],
    tipo: tipos[Math.floor(Math.random()*tipos.length)],
    nivel: Math.floor(Math.random()*100),
    energia: Math.floor(Math.random()*1000),
    hash: hash
  };
}

/* EXECUÇÃO */
function gerar(){
  const status = document.getElementById("status");
  const card = document.getElementById("card");

  status.innerText = "Processando núcleo...";

  setTimeout(()=>{
    const alma = gerarAlma();

    card.innerHTML = `
      <h2 id="nome"></h2>
      <p>Hash: ${alma.hash}</p>
      <p>Tipo: ${alma.tipo}</p>
      <p>Nível: ${alma.nivel}</p>
      <p>Energia: ${alma.energia}</p>
    `;

    decodeText(document.getElementById("nome"), alma.nome);

    status.innerText = "Entidade criada";
  },1000);
    }
