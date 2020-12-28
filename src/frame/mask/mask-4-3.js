import {Mask16_9} from "./Mask16_9";

export class Mask4_3 extends Mask16_9 {
    constructor({width = 1024}) {
        super({width});
        this.q = 3/4;
    }
}
