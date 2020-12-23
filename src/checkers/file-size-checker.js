import {FileChecker} from "./file-checker";
import {i18n} from "../i18n";
import {_limits} from "../image-capture";

import Skyline from "../skyline"

export class FileSizeChecker extends FileChecker {
    get template() {
        return "<li class=\"list-group-item d-flex justify-content-between p-1\">\n" +
            "                                <strong>"+i18n.size_title+"</strong>\n" +
            "                                <span></span>\n" +
            "                            </li>\n";
    }

    bindTemplate($t) {
        this.bound = $t;
        this.boundQ = $t.find("span");
    }

    reset() {
        this.bound.removeClass("list-group-item-danger");
        this.boundQ.html("-.-");
    }

    checkImage(image, file) {
        this.boundQ.html(Skyline.Byte.format(file.size));

        if(file.size > _limits.FILE_SIZE || file.size >  _limits.POST_SIZE) {
            this.bound.addClass("list-group-item-danger");
            return false;
        }
        return true;
    }
}
