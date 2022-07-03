const CWIDTH = 80;
const CHEIGHT = 120;

class Action {
    constructor(id,name, x, y, callback) {
        this.id=id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.callback = callback;
    }
    draw() {
        fill(100, 200, 100);
        strokeWeight(3);
        stroke(0, 0, 0);
        rect(this.x, this.y, CWIDTH, CHEIGHT, 2, 2, 2, 2);
        fill(0, 0, 0);
        stroke(0, 0, 0);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        text(this.name, this.x + CWIDTH / 2, this.y + CHEIGHT/2);
    }

    getId() { return this.id;}
    
   clicked(x, y) {
        if (this.x <= x && (this.x + CWIDTH) >= x &&
            this.y <= y && (this.y + CHEIGHT) >= y) {
            this.callback(this.id);
        }
    }

}