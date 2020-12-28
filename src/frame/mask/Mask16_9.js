import {MaskDefault} from "./mask-default";

export class Mask16_9 extends MaskDefault {
    constructor({width = 1024}) {
        super({size:width});
        this.q = 9/16;
    }

    get imageDimensions() {
        return [this.size, this.size*this.q];
    }

    get maskSVG() {
        const [s, c] = [this.size, Math.abs(this.size - (this.size*this.q)) / 2];

        return "M0,0 l"+s+",0 l0,"+c+" l-"+s+",0 M 0,"+s+" l"+s+",0 0,-"+c+" -"+s+",0z";
    }
}
