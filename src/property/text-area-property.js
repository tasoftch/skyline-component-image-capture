import {Property} from "./property";

export class TextAreaProperty extends Property {
    get template() {
        return ({id, placeholder}) => { return "<textarea class=\"form-control\" rows=\"3\" placeholder=\""+placeholder+"\" id=\""+id+"\"></textarea>"; }
    }
}
