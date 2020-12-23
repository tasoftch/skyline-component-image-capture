import $ from "../jquery";
import {_property} from "../templates/property";
import {Renderable} from "../renderable";

import Skyline from "../skyline"

export class Property extends Renderable {
    get template() { return ({id, placeholder}) => { return ""; }; }

    constructor({name, label = null, icon = null, placeholder = null}) {
        super();
        this.id = Skyline.guid();
        this.name = name;

        this.renderTemplate = () => {
            const $t = $( typeof _property === 'function' ?  _property({id:this.id, label, icon}) : _property );
            const $i = $(typeof this.template === 'function' ? this.template({id:this.id, placeholder}) : this.template);
            this.bindTemplate($t, $i);
            return $t;
        };
    }

    renderTemplate() {
    }

    bindTemplate($container, $input) {
        $container.find(".input-group").append($input);
        this.bound = $container;
        this.boundI = $input;
    }

    get value() { return this.boundI.val(); }

    validate(image, file) {
        return true;
    }

    willAppear(image, file) {}
}
