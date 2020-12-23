import {FileChecker} from "./file-checker";
import {i18n} from "../i18n";

export class RatioChecker extends FileChecker {
    constructor(ratio) {
        super();
        this.ratio = ratio;
    }

    get template() {
        return "<li class=\"list-group-item d-flex justify-content-between p-1 list-group-item-danger\">\n" +
        "                                <strong>"+i18n.ratio_title+"</strong>\n" +
        "                                <span>"+i18n.ratio_bad+"</span>\n" +
        "                            </li>\n";
    }

    bindTemplate($t) {
        this.bound = $t;
    }

    reset() {
        this.bound.addClass("d-none").removeClass("d-flex");
    }

    checkImage(image, file) {
        var q = image.width / image.height;
        
        if(q < this.ratio && q > (1/this.ratio)) {
            this.bound.addClass("d-none").removeClass("d-flex");
        } else {
            this.bound.removeClass("d-none").addClass("d-flex");
            return false;
        }

        return true;
    }
}
