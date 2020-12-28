
export class Mask {
    get frameDimensions() { return [0,0]; }
    get imageDimensions() { return [0,0]; }

    get maskSVG() {
        return "";
    }

    saveProperties(properties) {
        properties.mask = {size:this.imageDimensions};
    }
}
