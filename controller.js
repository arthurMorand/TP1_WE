const editingMode = {rect: 0, line: 1};

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = 0;

    // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
    new DnD(canvas, this);

    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
    Pencil.prototype.onInteractionStart = function (position) {
        // Initialisation de la forme en fonction du mode (rectangle ou ligne)
        if (this.currEditingMode === editingMode.rect) {
            this.currentShape = new Rectangle(position.xInit, position.yInit, 0, 0, this.currLineWidth, this.currColour);
        } else if (this.currEditingMode === editingMode.line) {
            this.currentShape = new Line(position.xInit, position.yInit, position.xInit, position.yInit, this.currLineWidth, this.currColour);
        }
    };

    Pencil.prototype.onInteractionUpdate = function (position) {
        // Mise à jour des dimensions de la forme en fonction de la position actuelle de la souris
        if (this.currentShape !== null) {
            if (this.currEditingMode === editingMode.rect) {
                // Mise à jour de la largeur et de la hauteur du rectangle
                this.currentShape.width = position.xFinal - position.xInit;
                this.currentShape.height = position.yFinal - position.yInit;
            } else if (this.currEditingMode === editingMode.line) {
                // Mise à jour des coordonnées de fin de la ligne
                this.currentShape.x2 = position.xFinal;
                this.currentShape.y2 = position.yFinal;
            }
            // On redessine le canvas (sans ajouter la forme finale)
            drawing.paint(ctx);
            this.currentShape.paint(ctx);  // Dessin de la forme temporaire
        }
    };

    // Dans votre fonction de mise à jour de la liste des formes (updateShapeList)
    function updateShapeList(drawing) {
        const shapeList = document.getElementById('shapeList');
        shapeList.innerHTML = ''; // Réinitialiser la liste
        drawing.shapes.forEach((shape, index) => {
            const listItem = document.createElement('li');
            const shapeInfo = shape.toString(); // Récupérer l'élément HTML

            // Ajouter le bouton pour supprimer la forme
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'btn btn-default';
            deleteButton.innerHTML = '<span class="glyphicon glyphicon-remove-sign"></span>';
            deleteButton.onclick = function () {
                drawing.removeShape(index); // Supprimer la forme
                updateShapeList(drawing); // Mettre à jour la liste
                drawing.paint(ctx); // Redessiner le canevas
            };

            listItem.appendChild(deleteButton);
            listItem.appendChild(shapeInfo);
            shapeList.appendChild(listItem);
        });
    }

    Pencil.prototype.onInteractionEnd = function () {
        // Finalisation de la forme et ajout au dessin
        if (this.currentShape !== null) {
            drawing.addShape(this.currentShape);  // Ajout de la forme finale au dessin
            updateShapeList(drawing);  // Mettre à jour la liste des formes
            this.currentShape = null;  // Réinitialisation de la forme courante
            drawing.paint(ctx);  // Redessiner tout le dessin avec la nouvelle forme ajoutée
        }
    };
}


