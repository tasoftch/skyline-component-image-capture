import {Renderable} from "../renderable";
import $ from "../jquery";

export class Source extends Renderable {
    constructor() {
        super();
        this.handlers = [];
        this.selectByDefault = true;
    }

    get template() { return ""; }
    get name() { return ""; }

    renderTemplate() {
        const t = $( this.template );
        this.bindTemplate(t);
        return t;
    }

    select() {}
    deselect() {}

    bindTemplate($t) {}

    reset() {}

    handler(fn) {
        if(typeof fn === 'function')
            this.handlers.push(fn);
    }

    handle(d) {
        this.handlers.forEach(h=>h(d));
    }
}
