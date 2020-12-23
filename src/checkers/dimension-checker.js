import {FileChecker} from "./file-checker";
import {i18n} from "../i18n";

export class DimensionChecker extends FileChecker {
    get template() {
        return "<li class=\"list-group-item d-flex justify-content-between p-1\">\n" +
        "                                <strong>"+i18n.dimension_title+"</strong>\n" +
        "                                <span></span>\n" +
        "                            </li>\n";
    }

    bindTemplate($t) {
        this.bound = $t.find("span");
    }

    reset() {
        this.bound.html("");
    }

    checkImage(image, file) {
        this.bound.html(""+image.width+"x"+image.height+"");
        return true;
    }
}
