import {TextFieldProperty} from "./textfield-property";
import $ from "../jquery";
import {i18n} from "../i18n";

export class SlugTextFieldProperty extends TextFieldProperty {
    bindTemplate($container, $input) {
        super.bindTemplate($container, $input);
        const $pp = $("<div class=\"input-group-append\"><span class=\"input-group-text\"></span></div>");
        this.boundE = $pp.find("span");
        $container.find(".input-group").append($pp);
    }

    validate(image, file) {
        if(/^[a-zA-Z0-9_.\-]+$/.test(this.value))
            return true;

        throw new Error( i18n.property_slug_error );
    }

    get value() {
        let slug = super.value;
        if(slug.split(".").pop() === this.boundE.text())
            return slug;
        return slug +this.boundE.text();
    }

    willAppear(image, file) {
        let slug = file.name.replace(/[^a-zA-Z0-9_.]/g, '-');

        slug = slug.split(".")
        this.extension = slug.pop().toLowerCase();

        this.boundE.text( "." + this.extension );
        this.boundI.val( slug.join(".") );
    }
}
