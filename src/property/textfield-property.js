import {Property} from "./property";

export class TextFieldProperty extends Property {
    get template() {
        return ({id, placeholder}) => { return "<input type=\"text\" class=\"form-control\" placeholder=\""+placeholder+"\" id=\""+id+"\" value=\"\">"; }
    }
}
