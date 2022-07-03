const BWIDTH = 300;
const BHEIGHT = 300;
const BX = 400;
const BY = 10;
const CELLSX = 10;
const CELLSY = 10;

class Board {
    constructor(px,py,pd,ox,oy,od) {
        this.px = px;
        this.py = py;
        this.pd = pd;
        this.ox = ox;
        this.oy = oy;
        this.od = od;
    }
    draw() {
        stroke(100,100,200);
        fill(150,150,150);
        
        let cellW = BWIDTH / CELLSX;
        let cellH = BHEIGHT / CELLSY; 
        for (let cx=0; cx < CELLSX; cx++)
            for (let cy=0; cy < CELLSX; cy++) {
                rect(BX+cellW*cx,BY+cellH*cy,cellW,cellH);
            }
        ellipseMode(CENTER)
        textAlign(CENTER,CENTER)
        fill(0,0,200);    
        circle(BX+this.px*cellW+cellW/2,BY+this.py*cellH+cellH/2,cellW-2,cellH-2);
        fill(200,0,0);
        circle(BX+this.ox*cellW+cellW/2,BY+this.oy*cellH+cellH/2,cellW-2,cellH-2);
        fill(255,255,255);
        text(this.pd,BX+this.px*cellW+cellW/2,BY+this.py*cellH+cellH/2);
        text(this.od,BX+this.ox*cellW+cellW/2,BY+this.oy*cellH+cellH/2);
    }
}