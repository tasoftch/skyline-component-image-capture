import {MaskDefault} from "./mask-default";

export class MaskCircle extends MaskDefault {
    constructor({size=200, grid=10}) {
        super({size});
        this.grid = grid
    }

    get maskSVG() {
        const [ sd, s12, r, r2 ] = [this.size, this.size/2, this.size/2-this.grid, (this.size/2-this.grid)*2];

        return "M 0,0 l"+sd+",0 l 0, "+s12+" l -"+this.grid+", 0 a "+r+","+r+" 0 1, 0 -"+r2+", 0 a "+r+","+r+" 0 1, 0 "+r2+", 0 l"+this.grid+",0 l 0,"+s12+" l-"+sd+",0z";
    }
}
