import {Frame} from "./frame";

export class DisplayOnlyFrame extends Frame {
    get template() { return "<figure class=\"figure w-100 text-center\">\n" +
        "                            <img class=\"w-75 img-fluid rounded shadow\" src=\"\" alt=\"\">\n" +
        "                        </figure>"; }
}
