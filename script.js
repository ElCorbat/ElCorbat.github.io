// Récupération des éléments HTML
const viewer = document.querySelector('#monModel');
const colorInput = document.getElementById('colorInput');
const colorValue = document.getElementById('colorValue');
const bgColorInput = document.getElementById('bgColor');
const viewerContainer = document.getElementById('viewer-container');

/**
 * Convertit une couleur hexadécimale en tableau [R, G, B, A]
 * @param {string} hex 
 * @returns {number[]}
 */
function hexToRGBA(hex) {
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
    1.0
  ];
}

/**
 * Applique une nouvelle couleur au matériau du modèle 3D
 * @param {string} hex 
 */
function appliquerCouleur(hex) {
  const material = viewer.model?.materials?.[0];
  if (material?.pbrMetallicRoughness) {
    material.pbrMetallicRoughness.setBaseColorFactor(hexToRGBA(hex));
    colorValue.textContent = hex;
    colorInput.style.backgroundColor = hex;
  }
}

// Applique la couleur par défaut au chargement
viewer.addEventListener('load', () => {
  appliquerCouleur(colorInput.value);
});

// Mise à jour en temps réel via le color picker
colorInput.addEventListener('input', (e) => {
  appliquerCouleur(e.target.value);
});
