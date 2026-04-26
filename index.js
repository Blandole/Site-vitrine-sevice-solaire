const batteries = [
  {
    name: "Batterie 5 kWh",
    image: "battery1.jpg",
    desc: "48V - 6000 cycles"
  }
];

const panneaux = [
  {
    name: "Panneau 450W",
    image: "panel1.jpg",
    desc: "Monocristallin"
  }
];

const onduleurs = [
  {
    name: "Onduleur 5 kVA",
    image: "inverter1.jpg",
    desc: "Hybride"
  }];
  function afficherProduits(liste, containerId) {
  const container = document.getElementById(containerId);

  liste.forEach(produit => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${produit.image}">
      <div class="card-content">
        <h3>${produit.name}</h3>
        <p>${produit.desc}</p>
        <a class="whatsapp-btn" href="https://wa.me/2250767567591">Commander</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// affichage
afficherProduits(batteries, "batteries-list");
afficherProduits(panneaux, "panneaux-list");
afficherProduits(onduleurs, "onduleurs-list");
