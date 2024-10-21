// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.xInit = 0;
    this.yInit = 0;
    this.xFinal = 0;
    this.yFinal = 0;
    this.moussePressed = false;

    // Developper les 3 fonctions gérant les événements
    DnD.prototype.mouseDown = function (evt) {
        if (!this.moussePressed) {
            const position = getMousePosition(canvas, evt);
            this.xInit = position.x;
            this.yInit = position.y;
            this.moussePressed = true;

            // Log de la position initiale du clic
            console.log(`Mouse Down at (${this.xInit}, ${this.yInit})`);
            interactor.onInteractionStart(this);
        }
    };

    DnD.prototype.mouseMove = function (evt) {
        if (this.moussePressed) {
            const position = getMousePosition(canvas, evt);
            this.xFinal = position.x;
            this.yFinal = position.y;

            // Log de la position actuelle du mouvement
            console.log(`Mouse Move to (${this.xFinal}, ${this.yFinal})`);
            interactor.onInteractionUpdate(this);
        }
    };

    DnD.prototype.mouseUp = function (evt) {
        if (this.moussePressed) {
            const position = getMousePosition(canvas, evt);
            this.xFinal = position.x;
            this.yFinal = position.y;
            this.moussePressed = false;

            // Log de la position finale du clic après relâchement
            console.log(`Mouse Up at (${this.xFinal}, ${this.yFinal})`);
            interactor.onInteractionEnd(this);
        }
    };

    // Associer les fonctions précédentes aux événements du canvas
    canvas.addEventListener('mousedown', this.mouseDown.bind(this), false);
    canvas.addEventListener('mousemove', this.mouseMove.bind(this), true);
    canvas.addEventListener('mouseup', this.mouseUp.bind(this), true);
}

// Place le point de l'événement evt relativement à la position du canvas
function getMousePosition(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}