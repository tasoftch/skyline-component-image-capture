import {Mask} from "./mask";

export class MaskDefault extends Mask {
    constructor({size = 300}) {
        super();
        this.size = size;
    }

    get frameDimensions() {
        return [this.size,this.size];
    }

    get imageDimensions() {
        return this.frameDimensions;
    }
}
