const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Liaison des boutons radio pour le mode (rectangle ou ligne)
document.getElementById('butRect').onclick = function () {
    if (pencil.currEditingMode !== editingMode.rect)
        console.log("Nouvelle forme : Rectangle");

    pencil.currEditingMode = editingMode.rect;
};

document.getElementById('butLine').onclick = function () {
    if (pencil.currEditingMode !== editingMode.line)
        console.log("Nouvelle forme : Ligne");

    pencil.currEditingMode = editingMode.line;
};

// Liaison du spinner pour l'épaisseur de ligne (spinnerWidth)
document.getElementById('spinnerWidth').onchange = function () {
    const lineWidth = this.value;
    pencil.currLineWidth = lineWidth;  // Mise à jour de l'épaisseur du crayon
    console.log("Nouvelle épaisseur : " + lineWidth);
};

// Liaison du sélecteur de couleur
document.getElementById('colour').onchange = function () {
    pencil.currColour = this.value;
    console.log("Nouvelle couleur : " + this.value);
};

canvas.width = 600;
canvas.height = 600;

// Appel initial de la mise à jour de la liste
const drawing = new Drawing();
const pencil = new Pencil(ctx, drawing, canvas);
drawing.paint(ctx); // Dessiner le canvas initial
console.log(pencil);