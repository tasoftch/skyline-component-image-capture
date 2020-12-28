import {Renderable} from "../renderable";
import {_option} from "../templates/option";
import $ from "../jquery";

export class Option extends Renderable {
    constructor({id, label, checkedByDefault = false}) {
        super();

        this.id = id;
        this.label = label;
        this.checked = checkedByDefault;

        this.renderTemplate = () => {
            const $t = $( typeof _option === 'function' ?  _option(this.id, this.id, label) : _option );
            this.bindTemplate($t);
            return $t;
        };
    }

    get value() {
        if(this.boundI[0].checked)
            return this.boundI[0].value * 1;
        return 0;
    }

    reset() {
        this.boundI[0].checked = this.checked;
    }

    bindTemplate($container) {
        this.bound = $container;
        this.boundI = $container.find("input");
    }

    willAppear(image, file, el) {
        el.checked = this.checked;
    }
}

export class DisabledOption extends Option {
    constructor({id, label, checkedByDefault = false}) {
        super({id, label, checkedByDefault});
    }

    bindTemplate($container) {
        super.bindTemplate($container);
        this.disable();
    }

    enable() {
        this.bound.removeClass("text-muted");
        this.boundI.attr("disabled", false);
    }

    disable() {
        this.bound.addClass("text-muted");
        this.boundI.attr("disabled", 'disabled');
    }
}
