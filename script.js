function gerarAlma() {
  const nomes = ["Aether", "Nyx", "Vortex", "Orion", "Eclipse"];
  const tipos = ["Arcano", "Caótico", "Luminar", "Sombrio"];

  return {
    nome: nomes[Math.floor(Math.random() * nomes.length)],
    tipo: tipos[Math.floor(Math.random() * tipos.length)],
    nivel: Math.floor(Math.random() * 100),
    energia: Math.floor(Math.random() * 1000)
  };
}
