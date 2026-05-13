const produits = {
  batteries: [
    {
      id: "batt16",
      name: "Batterie 16 kWh",
      image: "Batterie-16kwh.png",
      desc: "Model: HFL-314\nRated Volatge: 51.2V\nCapacity: 314Ah/16.07Kwh 6000 cycles\ngarantie: 5 ans\nprix: 1300.000 Franc CFA"
    },
    {
      id: "batt17",
      name: "Batterie 17.5 kWh",
      image: "batterie-17.5kwh.png",
      desc: "Model: CAN&RS485 Communication\nRated Volatge: 51.2V\nCapacity: 350Ah/17.5Kwh 6000 cycles\ngarantie: 5 ans\nprix: 1500.000 Franc CFA"
    },
  ],

  panneaux: [
    {
      id: "pan585",
      name: "Panneau 585w Sunrise",
      image: "585W.png",
      desc: "Marque: Sunrise\nClasse: A\nType: N TopCon Monocristallin\ngarantie: 30 ans\nprix: 60.000 Franc CFA"
    },
    {
      id: "pan615",
      name: "Panneau 615w LonGi",
      image: "615W.png",
      desc: "Marque: LonGi\nClasse: A\nType: N TopCon Monocristallin\ngarantie: 12 ans\nprix: 65.000 Franc CFA"
    },
    {
      id: "pan650",
      name: "Panneau 650w LonGi",
      image: "650W.png",
      desc: "Marque: LonGi\nClasse: A\nType: N TopCon Monocristallin\ngarantie: 12 ans\nprix: 68.000 Franc CFA"
    }
  ],

  onduleurs: [
    {
      id: "ond1",
      name: "Onduleur Deye 8kVA",
      image: "Deye-8kva.png",
      desc: "Hybride Inverter\nCaractéristiques: SG05LP1-EU-SM2 8KW Monophasé\ngarantie: 5 ans\nprix: 980.000 Franc CFA"
    },
    {
      id: "ond2",
      name: "Onduleur 12kVA",
      image: "Deye-triphasé-12kva.png",
      desc: "Hybride Inverter\nCaractéristiques: SG05LP3-EU-SM2 12KW Triphasé\ngarantie: 5 ans\nprix: 1450.000 Franc CFA"
    },
    {
      id: "ond3",
      name: "Onduleur 20kVA",
      image: "Deye-triphasé-20kva.png",
      desc: "Hybride Inverter\nCaractéristiques: SG05LP3-EU-SM2 20KW Triphasé\ngarantie: 5 ans\nprix: 2400.000 Franc CFA"
    },
    {
      id: "ond4",
      name: "Onduleur SRNE 3kVA",
      image: "SRNE-3Kva.png",
      desc: "Hybride Inverter\nCaractéristiques: SRNE 3KW Monophasé\ngarantie: 5 ans\nprix: 250.000 Franc CFA"
    },
    {
      id: "ond5",
      name: "Onduleur SRNE 5kVA",
      image: "SRNE-5Kva.png",
      desc: "Hybride Inverter\nCaractéristiques: SRNE 5KW Monophasé\ngarantie: 5 ans\nprix: 380.000 Franc CFA"
    },
  ]
};

// =========================
// ELEMENTS
// =========================

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("zoomedImg");
const closeModal = document.querySelector(".close");

const infoModal = document.getElementById("infoModal");
const closeInfo = document.querySelector(".close-info");

const orderModal = document.getElementById("orderModal");
const closeOrder = document.querySelector(".close-order");

const produitsForm = document.getElementById("produits-form");

// =========================
// AFFICHAGE PRODUITS
// =========================

function afficherListe(liste, containerId) {

  const container = document.getElementById(containerId);

  if (!container) return;

  liste.forEach(p => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" onclick="zoomImage('${p.image}')">

      <div class="card-content">

        <div class="title-row">
          <h3>${p.name}</h3>

          <button class="info-btn" onclick="voirInfos('${p.id}')">
            + infos
          </button>
        </div>

        <button onclick="ouvrirCommande()">
          Commander
        </button>

      </div>
    `;

    container.appendChild(card);
  });
}

// =========================
// AFFICHAGE
// =========================

afficherListe(produits.batteries, "batteries-list");
afficherListe(produits.panneaux, "panneaux-list");
afficherListe(produits.onduleurs, "onduleurs-list");

// =========================
// ZOOM IMAGE
// =========================

function zoomImage(src) {

  if (!modal || !modalImg) return;

  modal.style.display = "flex";
  modalImg.src = src;
}

if (closeModal) {
  closeModal.onclick = () => {
    modal.style.display = "none";
  };
}

// =========================
// VOIR INFOS
// =========================

function voirInfos(id) {

  const all = Object.values(produits).flat();

  const produit = all.find(p => p.id === id);

  if (!produit) return;

  document.getElementById("info-title").innerText = produit.name;

  document.getElementById("info-desc").innerHTML =
    produit.desc.replace(/\n/g, "<br>");

  infoModal.style.display = "flex";
}

if (closeInfo) {
  closeInfo.onclick = () => {
    infoModal.style.display = "none";
  };
}

// =========================
// OUVRIR COMMANDE
// =========================

function ouvrirCommande() {

  if (!orderModal || !produitsForm) return;

  orderModal.style.display = "flex";

  produitsForm.innerHTML = "";

  Object.values(produits).flat().forEach(p => {

    produitsForm.innerHTML += `
      <div class="produit-item">

        <label>${p.name}</label>

        <input
          type="number"
          min="0"
          value="0"
          id="${p.id}"
        >

      </div>
    `;
  });
}

if (closeOrder) {
  closeOrder.onclick = () => {
    orderModal.style.display = "none";
  };
}

// =========================
// ENVOYER COMMANDE
// =========================

function envoyerCommande() {

  const nom = document.getElementById("nom").value.trim();

  const numero = document.getElementById("numero").value.trim();

  if (nom === "" || numero === "") {
    alert("Veuillez remplir votre nom et numéro.");
    return;
  }

  let message = `Commande :
Nom : ${nom}
Numéro : ${numero}

Produits :
`;

  let produitChoisi = false;

  Object.values(produits).flat().forEach(p => {

    const input = document.getElementById(p.id);

    if (!input) return;

    const qte = parseInt(input.value);

    if (qte > 0) {

      produitChoisi = true;

      message += `- ${p.name} : ${qte}\n`;
    }
  });

  if (!produitChoisi) {
    alert("Veuillez sélectionner au moins un produit.");
    return;
  }

  const url =
    `https://wa.me/2250151803055?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
      }
