import $ from "../jquery";

export class Frame {
    get template() { return ""; }

    renderTemplate() {
        const t = $( this.template );
        this.bindTemplate(t);
        return t;
    }

    bindTemplate($t) {
        this.boundImage = $t.find("img");
    }

    reset() {}

    loadImage({file, image, complete, error}) {
        this.boundImage[0].onload = complete;
        this.boundImage[0].onerror = error;

        this.boundImage[0].src = image.src;
    }

    saveProperties(properties) {}
}
