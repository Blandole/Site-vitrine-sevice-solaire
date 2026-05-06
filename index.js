const produits = {
  batteries: [
    { id:"batt16", name:"Batterie 16 kWh", image:"Batterie-16kwh.png", desc:"Model: HFL-314\n Rated Volatge: 51.2V\n Capacity: 314Ah/16.07Kwh 6000 cycles\n garantie: 5 ans \n prix:1300.000 Franc CFA" },
    { id:"batt17", name:"Batterie 17.5 kWh", image:"batterie-17.5kwh.png", desc:"Model: CAN&RS485 Communication\n Rated Volatge: 51.2V\n Capacity: 350Ah/17.5Kwh 6000 cycles\n garantie: 5 ans \n prix:1500.000 Franc CFA" },
  ],
  panneaux: [
    { id:"pan585", name:"Panneau 585w Sunrise", image:"585W.png", desc:"Marque: Sunrise \n Classe: A \n Type: N TopCon Monocristallin \n garantie: 30 ans \n prix: 60.000 Franc CFA" },
    { id:"pan615", name:"Panneau 615w LonGi", image:"615W.png", desc:"Marque: LonGi \n Classe: A \n Type: N TopCon Monocristallin \n garantie: 12 ans \n prix: 65.000 Franc CFA" },
    { id:"pan650", name:"Panneau 650w LonGi", image:"650W.png", desc:"Marque: LonGi \n Classe: A \n Type: N TopCon Monocristallin \n garantie: 12 ans \n prix: 68.000 Franc CFA" }
  ],
  onduleurs: [
    { id:"ond1", name:"Onduleur Deye 8kVA", image:"Deye-8kva.png", desc:"Hybride Inverter \n Caractéristiques: SG05LP1-EU-SM2 8KW Monophasé\n garantie: 5 ans\n prix: 980.000 Franc CFA" },
    { id:"ond2", name:"Onduleur 12kVA", image:"Deye-triphasé-12kva.png", desc:"Hybride Inverter \n Caractéristiques: SG05LP3-EU-SM2 12KW Triphasé\n garantie: 5 ans\n prix: 1450.000 Franc CFA" },
    { id:"ond3", name:"Onduleur 20kVA", image:"Deye-triphasé-20kva.png", desc:"Hybride Inverter \n Caractéristiques: SG05LP3-EU-SM2 12KW Triphasé\n garantie: 5 ans\n prix: 2400.000 Franc CFA" },
    { id:"ond4", name:"Onduleur SRNE 3kVA", image:"SRNE-3Kva.png", desc:"Hybride Inverter \n Caractéristiques: SRNE 3KW Monophasé\n garantie: 5 ans\n prix: 250.000 Franc CFA" },
    { id:"ond5", name:"Onduleur SRNE 5kVA", image:"SRNE-5Kva.png", desc:"Hybride Inverter \n Caractéristiques: SRNE 3KW Monophasé\n garantie: 5 ans\n prix: 380.000 Franc CFA" },
  ]
};

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("zoomedImg");
const closeModal = document.querySelector(".close");

const infoModal = document.getElementById("infoModal");
const closeInfo = document.querySelector(".close-info");

const orderModal = document.getElementById("orderModal");
const closeOrder = document.querySelector(".close-order");
const produitsForm = document.getElementById("produits-form");

function afficherListe(liste, containerId){
  const container = document.getElementById(containerId);

  liste.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" onclick="zoomImage('${p.image}')">
      <div class="card-content">
        <div class="title-row">
          <h3>${p.name}</h3>
          <button class="info-btn" onclick="voirInfos('${p.id}')">+ infos</button>
        </div>
        <button onclick="ouvrirCommande()" onclick="fbq('track', 'Contact')">Commander</button>
      </div>
    `;
     container.appendChild(card);
  });
}

// affichage
afficherListe(produits.batteries, "batteries-list");
afficherListe(produits.panneaux, "panneaux-list");
afficherListe(produits.onduleurs, "onduleurs-list");

// zoom image
function zoomImage(src){
  modal.style.display = "flex";
  modalImg.src = src;
}
closeModal.onclick = () => modal.style.display = "none";

// voir infos
function voirInfos(id){
  const all = Object.values(produits).flat();
  const produit = all.find(p => p.id === id);

  document.getElementById("info-title").innerText = produit.name;
  document.getElementById("info-desc").innerHTML = produit.desc.replace(/\n/g, "<br>");

  infoModal.style.display = "flex";
}
closeInfo.onclick = () => infoModal.style.display = "none";

// ouvrir commande
function ouvrirCommande(){
  orderModal.style.display = "flex";
  produitsForm.innerHTML = "";

  Object.values(produits).flat().forEach(p => {
    produitsForm.innerHTML += `
      <label>${p.name}</label>
      <input type="number" min="0" value="0" id="${p.id}">
    `;
  });
}
closeOrder.onclick = () => orderModal.style.display = "none";

// envoyer WhatsApp
function envoyerCommande(){
  let nom = document.getElementById("nom").value;
  let numero = document.getElementById("numero").value;

  let message = `Commande:%0A Nom: ${nom}%0A Numéro: ${numero}%0A`;

  Object.values(produits).flat().forEach(p => {
    let qte = document.getElementById(p.id).value;
    if(qte > 0){
      message += `${p.name}: ${qte}%0A`;
    }
  });

  window.open(`https://wa.me/2250151803055?text=${message}`);
}
