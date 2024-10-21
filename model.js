// Classe Drawing qui contient une collection de formes
function Drawing() {
    this.shapes = [];  // Tableau des formes

    Drawing.prototype.addShape = function (shape) {
        this.shapes.push(shape);
    }

    Drawing.prototype.removeShape = function (index) {
        if (index > -1 && index < this.shapes.length) {
            this.shapes.splice(index, 1);
        }
    }

    Drawing.prototype.paint = function (ctx) {
        ctx.fillStyle = '#F0F0F0'; // set canvas' background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.shapes.forEach(function (shape) {
            shape.paint(ctx); // Dessiner chaque forme
        });
    };
}

function Shape(thickness, color) {
    this.thickness = thickness; // Épaisseur du trait
    this.color = color;         // Couleur de la forme
}

function Rectangle(x, y, width, height, thickness, color) {
    Shape.call(this, thickness, color);
    this.x = x;                 // Coordonnées du coin supérieur gauche
    this.y = y;
    this.width = width;         // Largeur du rectangle
    this.height = height;       // Hauteur du rectangle

    Rectangle.prototype.paint = function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    };

    // Méthode toString pour afficher les caractéristiques du rectangle avec couleur
    Rectangle.prototype.toString = function () {
        const span = document.createElement('span');
        span.style.color = this.color; // Appliquer la couleur
        span.textContent = `Rectangle - Position: (${this.x}, ${this.y}), Width: ${this.width}, Height: ${this.height}`;
        return span;
    };
}

function Line(x1, y1, x2, y2, thickness, color) {
    Shape.call(this, thickness, color);
    this.x1 = x1;             // Coordonnées du premier point
    this.y1 = y1;
    this.x2 = x2;             // Coordonnées du second point
    this.y2 = y2;

    Line.prototype.paint = function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    };

    // Méthode toString pour afficher les caractéristiques de la ligne avec couleur
    Line.prototype.toString = function () {
        const span = document.createElement('span');
        span.style.color = this.color; // Appliquer la couleur
        span.textContent = `Line - Start: (${this.x1}, ${this.y1}), End: (${this.x2}, ${this.y2})`;
        return span;
    };
}